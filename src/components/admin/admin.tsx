import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react";
import { Booking } from "../../models/Booking/Bookning";
import { IBooking } from "../../models/Booking/IBookning";
import {INewCostumer } from "../../models/Costumer/INewCostumer";
import {NewBookning } from "../../models/Booking/NewBookning";

export default function Admin() {
  const [bookingFromAPI,SetBookingFromAPI]= useState<IBooking[]>([]);
  const [availableBookings,SetAvailableBookings] = useState<IBooking[]>([]);
  const [toogle, SetToogle] = useState(true); 
  const [choosenDate,SetChoosenDate] = useState('');
  const [choosenTime,SetChoosenTime] = useState('');
  const [choosenGuests,SetChoosenGuest]=useState(1)
  const [showFreeTime,SetShowFreeTime]=useState(<div></div>)
  const [newBookingContainer,SetNewbookingContainer]=useState(<div></div>)
  const [toogleNewContainer,SetToogleNewContainer] = useState(true)
  const [toogleOverlay,SetToogleOverlay] = useState(true)
  const [updateBookingContainer,SetUpdateBookingContainer] = useState(true)
  const [newCustomer, setNewCustomer] = useState<INewCostumer>({
    name: '',
    lastname: '',
    email: '',
    phone: ''
  });

    const [newBooking, setNewBooking] = useState<NewBookning>({
      restaurantId: '624ffb0755e34cb62ef983ec',
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

    const handleBookingInfoFName=(e:ChangeEvent<HTMLInputElement>)=>{
      console.log('hej from fname',e)
      let name = e.target.value
      setNewCustomer({...newCustomer,name:name})
    }

    const handleBookingInfoLName=(e:ChangeEvent<HTMLInputElement>)=>{
      console.log('hej from lname',e)
      let lastname = e.target.value
      setNewCustomer({...newCustomer,lastname:lastname})
    }   

    const handleBookingInfoEmail=(e:ChangeEvent<HTMLInputElement>)=>{
      console.log('hej from email',e)
      let email = e.target.value
      setNewCustomer({...newCustomer,email:email})
    }

    const handleBookingInfoPhone=(e:ChangeEvent<HTMLInputElement>)=>{
      let phone = e.target.value;
      console.log('hej from phone',e)
      setNewCustomer({...newCustomer,phone:phone})
    }

    const handleBookingInfoGuest=(e:number)=>{
      let guests = e;
      SetChoosenGuest(guests)
      setNewBooking({...newBooking,numberOfGuests:guests})
    }
  
    
    const handleBookingDate = (e: string) => {
      let name: string = e;
      SetChoosenDate(name)
      setNewBooking({...newBooking,date:name})
    };
    
    const handleBookingTime = (e: string) => {
      let time: string = e;
      SetChoosenTime(time)
      setNewBooking({...newBooking,time:time})
    };




  useEffect(() => {
    console.log("Trying to get data");
    if (bookingFromAPI.length > 0) return;
    getFromAPI()
      
  });




  const newBookingHTML = ()=>{
    SetShowFreeTime(<></>)
   SetToogleNewContainer(!toogleNewContainer)
  }

  const updateAvailableBookingsPerDateTime =(date:string,time:string)=>{
   SetAvailableBookings(bookingFromAPI.filter((booking)=>{
      if(booking.time===time && booking.date===date){
       return true
      }else{
       return false
      }
    }))
  }

const getFromAPI = ()=>{
  axios.get<IBooking[]>('https://school-restaurant-api.azurewebsites.net/booking/restaurant/624ffb0755e34cb62ef983ec')
  .then((response) => {
    console.log('Hämtar')
      let bookingListFromAPI= response.data.map((bookings:IBooking)=>{
        return new Booking(bookings._id,bookings.date,bookings.restaurantId,bookings.time,bookings.numberOfGuests,bookings.customerId)
      });

      SetBookingFromAPI(bookingListFromAPI);  
    }
  );
}
let test;
const updateBooking = (bookingID:string)=>{
  SetUpdateBookingContainer(!updateBookingContainer)
  test=<div className="newbookingContainer">
    <h2>hej</h2>
  </div>
  SetToogleOverlay(!toogleOverlay)
 let restaurantId='';
  console.log(bookingID)
  // axios.post('https://school-restaurant-api.azurewebsites.net/booking/update/'+bookingID)
}


  let bookingHtml = bookingFromAPI.map((bookings: IBooking,id:number) => {
    return (<div key={id}>
          <p>
            Gästens unika id: {bookings._id} <br />
            Gästens datum: {bookings.date} <br />
            Gästens tid: {bookings.time} <br />
            Antal gäster: {bookings.numberOfGuests} <br />
          <button onClick={()=>{deletedBooking(bookings._id,id)}}>Radera</button>
          <button onClick={()=>{updateBooking(bookings._id)}}>Flytta</button> 
          </p>
      </div>
    );
  });

console.log('test')
console.log('test')

  useEffect(() => {
    console.log("booking changed");
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



  const createBooking=()=> {
    
    let costumer={...newBooking.customer}
    costumer.name=newCustomer.name
    costumer.lastname=newCustomer.lastname
    costumer.email=newCustomer.email
    costumer.phone=newCustomer.phone
    newBooking.customer=costumer
    // console.log("name:",costumer.name,"lastname:",costumer.lastname,"email:",costumer.email,"phone:",costumer.phone)
    // console.log(newBooking.customer)
    // console.log(newBooking)
    axios.post('https://school-restaurant-api.azurewebsites.net/booking/create', {
      "restaurantId": '624ffb0755e34cb62ef983ec',
      "date": newBooking.date,
      "time": newBooking.time,
      "numberOfGuests": newBooking.numberOfGuests,
      "customer": {
        "name": newCustomer.name,
        "lastname": newCustomer.lastname,
        "email": newCustomer.email,
        "phone": newCustomer.phone
      }
    }).then(response => {getFromAPI()})
    .catch(error => {console.log(error)})
  }

  
  const chooseWeek=(inputDateFromUser:string,inputTimeFromUser:string,inputGuestFromUser:number)=>{
    if(inputTimeFromUser==='18:00'||inputTimeFromUser==='21:00' ){
      let today = new Date(inputDateFromUser);
      let listOfDate:string[]=[]; 
      let listOfTime:string[]=['18:00','21:00']
    for (let i = 0; i < 7; i++) {  
     let date = new Date(today.getFullYear(), today.getMonth(), today.getDate()+i+1).toISOString().split('T')[0];
     listOfDate.push(date)
    //  dag.push(date)
    }
    bookingInfoHTML(inputDateFromUser,inputTimeFromUser,inputGuestFromUser,listOfDate,listOfTime)
    // availableBooking(listOfDate,listOfTime)
    
    }else
    return SetShowFreeTime(<div><p>Du valde ingen tid! Välj tid och försök igen!</p></div>)
  }

// let dag:string[]=[]
// let forstaSittning:string[]=[]
// let andraSittning:string[]=[]

useEffect(() => {
  console.log("booking changed");
}, [showFreeTime]);





const bookingInfoHTML=(chooseDate:string,choosenTime:string,choosenGuests:number,dates: string [], times: string [])=>{
  console.log(dates,times)
  for (let i = 0; i < dates.length; i++) {
    console.log(bookingFromAPI[i].date)
    if (chooseDate === bookingFromAPI[i].date){
           for (let i = 0; i < bookingFromAPI.length; i++) {
             if(choosenTime === bookingFromAPI[i].time&&bookingFromAPI.length<15){
              // console.log(bookingFromAPI[i].time )
              // console.log("det finns 2",bookingFromAPI[i].date[i])
              // console.log("det finns bord att boka",bookingFromAPI[i].time )
              // console.log("det finns bord att boka",bookingFromAPI[i].time)
              // console.log("det finns bord att boka",bookingFromAPI.length )
                SetToogleNewContainer(true)
              return SetShowFreeTime(<div> 
                <p>Det finns ett ledigt bord att boka gällande datumet: {chooseDate} och tiden: {choosenTime}</p>
                <button onClick={()=>{newBookingHTML()}}>Boka!</button>
                <p>Vill du boka det?</p>
                </div>)
            }   
            else if(choosenTime === bookingFromAPI[i].time&&bookingFromAPI.length>=15){
              // console.log("det finns inga bord att boka",bookingFromAPI[i].time.length>15 )
              // console.log("det finns ",bookingFromAPI[i].date[i])
              // console.log("det finns ",bookingFromAPI[i].date)
              // console.log(choosenTime, bookingFromAPI[i],bookingFromAPI[i].time.length,15,chooseDate,bookingFromAPI[i].date)
              // console.log("det finns bord att boka",bookingFromAPI.length )
              // console.log('över eller lika med')
              SetToogleNewContainer(true)
              SetShowFreeTime(<div> 
                <p>Det finns inget bord zzzz att boka gällande datumet: {chooseDate} och tiden: {choosenTime}. <br />
                Kolla ett annat datum eller avvakta för eventuella avbokningar...
                </p>
                </div>)
            }        
            else{
                SetToogleNewContainer(true)
              SetShowFreeTime(<div> 
                <p>Det finns ett bord dddddddd att boka gällande datumet: {chooseDate} och tiden: {choosenTime}</p>
                <button onClick={()=>{newBookingHTML()}}>Boka!</button>
                </div>)
            }
           }
        }else{
          SetShowFreeTime(<div> 
            <p>Det finns ett bord eeeeeeeeeee att boka gällande datumet: {chooseDate} och tiden: {choosenTime}</p>
            <button onClick={()=>{newBookingHTML()}}>Boka!</button>
                <p>Vill du boka det?</p>
            </div>)
        }
    }
    return(((<div>{chooseDate} {choosenTime}
    {showFreeTime}
    </div>))
    
    )
  }

  
  return (<div className="App-header">
    <div>

    
    <h1>Admin</h1>
    <div>
      {bookingHtml}
    <div className="updateContainer" hidden={updateBookingContainer}>
        <h1></h1>
      </div>  
    </div>
    <button onClick={()=>SetToogle(!toogle)}>Skapa bokning!</button>
    <div className="toogleContainer" hidden={toogle}>
    <div className="formContainer">
      <div className="formsCreatedBooking">
      <form>
        <label>Skriv önskat datum:</label>
        <input type="date" min="2022-04-01" value={choosenDate} required onChange={(e)=>{handleBookingDate(e.target.value)}}/>
      </form>
      <label>Tid: </label>
      <select name="time-select" id="timeSelect" required value={choosenTime}  onChange={(e)=>{handleBookingTime(e.target.value)}}>
        <option value="DEFAULT">Välj en tid ...</option>
        <option value="18:00" >18:00</option>
        <option value="21:00">21:00</option>
      </select> <br />
      <label htmlFor="amountGuest">Antal gäster:</label>
      <select name="guestAmount" id="guestForm" required value={choosenGuests} onChange={(e)=>{handleBookingInfoGuest(parseInt(e.target.value))}}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
      </select> <br />
      <button onClick={()=>{chooseWeek(choosenDate,choosenTime,choosenGuests)}}> Sök!</button>
      </div>
      <div className="freeTime">
      {showFreeTime}
      </div>
      <div  hidden={toogleNewContainer}>
      {newBookingContainer}
        <form>
              <label>Förnamn: </label>
                  <input type="text" name="name"  value={newCustomer.name} onChange={handleBookingInfoFName}/> <br />
              <label>Efternamn: </label>
                  <input type="text" name="lastname" size={28} value={newCustomer.lastname}  onChange={handleBookingInfoLName}/><br />
              <label>Email: </label>
                  <input type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" size={34} value={newCustomer.email}  onChange={handleBookingInfoEmail}/><br />
              <label>Telefonnummer: </label>
                  <input type="tel" name="phone" size={20}  value={newCustomer.phone}  onChange={handleBookingInfoPhone}/><br />
              </form>
           

                      <button onClick={()=>{createBooking()}}>Skicka bokning</button> 
                      {/* pattern="[0-9]{3}-[0-9]{3} [0-9]{2} [0-9]{2}" placeholder="070-241 67 78" */}
                </div>
      <div> 
      </div>
    </div>
    </div>
    </div>
    </div>
  )
}
