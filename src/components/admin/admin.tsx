import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react";
import { Booking } from "../../models/Booking/Booking";
import { IBooking } from "../../models/Booking/IBooking";
import {INewCostumer } from "../../models/Costumer/INewCostumer";
import {NewBookning } from "../../models/Booking/NewBooking";

export default function Admin() {
  const [bookingFromAPI,SetBookingFromAPI]= useState<IBooking[]>([]);
  const [toogle, SetToogle] = useState(true);
  
  
  useEffect(() => {
    console.log("Trying to get data");
     
    if (bookingFromAPI.length > 0) return;
    getFromAPI()
      
  });

const getFromAPI = ()=>{
  axios.get<IBooking[]>('https://school-restaurant-api.azurewebsites.net/booking/restaurant/624ffb0755e34cb62ef983ec')
  .then((response) => {
    console.log('Hämtar')

      let bookingListFromAPI= response.data.map((bookings:IBooking)=>{
        return new Booking(bookings._id,bookings.customerId,bookings.restaurantId,bookings.time,bookings.numberOfGuests,bookings.date)
      });

      SetBookingFromAPI(bookingListFromAPI);  
    }
  );
}


  let bookingHtml = bookingFromAPI.map((bookings: IBooking,id:number) => {
    return (
      <div key={id}>
          <p>
            Gästens unika id: {bookings._id} <br />
            Gästens datum {bookings.customerId} <br />
            Gästens tid {bookings.time} <br />
            Antal gäster {bookings.numberOfGuests} <br />
          <button onClick={()=>{deletedBooking(bookings._id,id)}}>Radera</button>
          <button>Flytta</button>          
          </p>
      </div>
    );
  });



  useEffect(() => {
    console.log("Movies changed");
  }, [bookingFromAPI]);


      const deletedBooking=(deletedBookingID:string,index:number)=>{
       let booking = bookingFromAPI
       SetBookingFromAPI(booking.splice(index,0)) 
       axios.delete('https://school-restaurant-api.azurewebsites.net/booking/delete/'+deletedBookingID)
       .then(response=>( console.log(response)))
       .then(getFromAPI)
       .catch(error=>{
         console.log("Det blev något fel!" + " Statuskod" + error)
        })
        console.log(bookingFromAPI)
      }


  // Skapar en customer för att sen kunna lägga till i bokning
  const [newCustomer, setNewCustomer] = useState<INewCostumer>({
    name: '',
    lastname: '',
    email: '',
    phone: ''
  });
  // Försökte enbart ha denna state från början, men fick inte till det med forms. Denna är vad som skickas till API:t för att boka bordet.
  // Försökte ha name som customer.name i forms för att hantera det men funkade ej.
  const [newBooking, setNewBooking] = useState<NewBookning>({
    restaurantId: '',
    date: '',
    time: '',
    numberOfGuests: 0,
    customer: {
      name: '',
      lastname: '',
      email: '',
      phone: ''
    }
  });

  const handleBookingChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name: string = e.target.name;
    setNewBooking({...newBooking, [name]: e.target.value});
    console.log(newBooking);
  };

  const handleCustomerChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name: string = e.target.name;

    setNewCustomer({...newCustomer, [name]: e.target.value});
    console.log(newCustomer);
  };


  function createBooking() {
    axios.post('https://school-restaurant-api.azurewebsites.net/booking/create', {
      restaurantId: '624ff079138a40561e115f16',
      date: newBooking.date,
      time: newBooking.time,
      numberOfGuests: newBooking.numberOfGuests,
      customer: {
        name: newCustomer.name,
        lastname: newCustomer.lastname,
        email: newCustomer.email,
        phone: newCustomer.phone
      }
    }).then(response => {console.log(response.data+"hämtar")})
    .catch(error => {console.log(error)})
  }

  

  

  return (<div className="App-header">
    <h1>Admin</h1>
    <div className="">
      {bookingHtml}
    </div>
    <button onClick={()=>SetToogle(!toogle)}>Skapa bokning!</button>
    <div className="toogleContainer" hidden={toogle}>
    <div className="formContainer">
    <form>
        <label>Förnamn: </label>
        <input type="text" name="name" size={29}  value={newCustomer.name} onChange={handleCustomerChange}/> <br />
        <label>Efternamn: </label>
        <input type="text" name="lastname" size={28} value={newCustomer.lastname} onChange={handleCustomerChange}/><br />
        <label>Email: </label>
        <input type="text" name="email" size={34} value={newCustomer.email} onChange={handleCustomerChange}/><br />
        <label>Telefonnummer: </label>
        <input type="text" name="phone" size={20} value={newCustomer.phone} onChange={handleCustomerChange}/><br />
        <label>Datum: </label>
        <input type="date" name="date" value={newBooking.date} onChange={handleBookingChange}/><br />
        <label>Antal gäster: </label>
        <input type="number" name="numberOfGuests" min={0} onChange={handleBookingChange}/><br />
      </form>
        <label>Tid: </label>
      <select name="time-select" id="timeSelect">
        <option value="18:00">18:00</option>
        <option value="21:00">21:00</option>
      </select>
      <div className="btnContainer">
      <button onClick={()=>(createBooking)}>Skicka bokning</button>
      </div>
    </div>
    </div>
    </div>
  )
}
