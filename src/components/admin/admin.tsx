import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react";
import { Booking } from "../../models/Booking/Booking";
import { IBooking } from "../../models/Booking/IBooking";
import {INewCostumer } from "../../models/Costumer/INewCostumer";
import {NewBookning } from "../../models/Booking/NewBooking";

export default function Admin() {
  const [bookingFromAPI,SetBookingFromAPI]= useState<IBooking[]>([]);
  const [toogle, SetToogle] = useState(true);

  
  const getBookningsFromAPI = () =>{
    axios.get<IBooking[]>('https://school-restaurant-api.azurewebsites.net/booking/restaurant/6250058ce031ed74470f57d2')
    .then((response)=> {
      let bookingListFromAPI= response.data.map((bookings:IBooking)=>{
        return new Booking(bookings._id,bookings.customerId,bookings.restaurantId,bookings.time,bookings.numberOfGuests,bookings.date)
      },[])
      console.log(bookingListFromAPI)
      SetBookingFromAPI(bookingListFromAPI)
      saveLocalStorage(bookingListFromAPI)
    })
  }
  
  useEffect(()=>{getFromLocalStorage()
  },[]
  );
  
  
  
  const getFromLocalStorage = ()=>{
    let bookingsFromLS = localStorage.getItem('restaurant_booking')
    if(!bookingsFromLS){
      getBookningsFromAPI()
    }else{
      
        const bookingData = JSON.parse(bookingsFromLS)

        SetBookingFromAPI(bookingData)
      }
      };

      const saveLocalStorage=((dataFromAPI:IBooking[])=>{
        if(dataFromAPI.length>0){

          localStorage.setItem("restaurant_booking", JSON.stringify(dataFromAPI))
        }
      })

      const deletedBooking=(deletedBookingID:string)=>{
        axios.delete('https://school-restaurant-api.azurewebsites.net/booking/delete/'+deletedBookingID)
      }

  
      let bookingURL = "https://school-restaurant-api.azurewebsites.net/booking/create";
  const [newCustomer, setNewCustomer] = useState<INewCostumer>({
    name: '',
    lastname: '',
    email: '',
    phone: ''
  });


  
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

  const createBooking = ()=>{
    axios.post(bookingURL, {
      restaurantId: '6250058ce031ed74470f57d2',
      date: newBooking.date,
      time: newBooking.time,
      numberOfGuests: newBooking.numberOfGuests,
      customer: {
        name: newCustomer.name,
        lastname: newCustomer.lastname,
        email: newCustomer.email,
        phone: newCustomer.phone
      }
    }).then(response => {console.log(response.data)})
    .catch(error => {console.log(error)})

  }
  

  

  return (<div className="App-header">
    <h1>Admin</h1>
    <div className="">
      {bookingFromAPI.map((bookingAPI,i)=>{
        return(<div key={i}>
          <p>
            Gästens unika id: {bookingAPI._id} <br />
            Gästens datum {bookingAPI.customerId} <br />
            Gästens tid {bookingAPI.time} <br />
            Antal gäster {bookingAPI.numberOfGuests} <br />
          <button onClick={()=>{deletedBooking(bookingAPI._id)}}>Radera</button>
          <button>Flytta</button>
          <div >
          
          </div>
          </p>
        </div>)
      })}
    </div>
    <button onClick={()=>SetToogle(!toogle)}>Skapa bokning!</button>
    <div className="toogleContainer" hidden={toogle}>
    <div className="formContainer" >
    <form>
        <label>Förnamn: </label>
        <input type="text" name="name" size={30}/> <br />
        <label>Efternamn: </label>
        <input type="text" name="lastname" size={28}/><br />
        <label>Email: </label>
        <input type="text" name="email" size={34} /><br />
        <label>Telefonnummer: </label>
        <input type="text" name="phone" size={20}/><br />
        <label>Datum: </label>
        <input type="date" name="date"/><br />
        <label>Tid: </label>
        <input type="time" name="time" min="18:00" max={20}/><br />
        <label>Antal gäster: </label>
        <input type="number" name="numberOfGuests"/><br /><br />
      </form>
      <div className="btnContainer">
      <button onClick={()=>(createBooking)}>Skicka bokning</button>
      </div>
    </div>
    </div>
    </div>
  )
}
