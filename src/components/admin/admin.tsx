import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Booking } from "../../models/bookning/bookning";
import { IBooking } from "../../models/bookning/IBookning";
import { INewCostumer } from "../../models/Costumer/INewCostumer";
import { NewBookning } from "../../models/bookning/NewBookning";
import { Costumer } from "../../models/Costumer/Costumer";
import { CostumerData } from "../../models/Costumer/CostumerData";
import { ICostumerData } from "../../models/Costumer/ICostumerData";
import { UpdateBookning } from "../../models/bookning/UpdateBookning";

export default function Admin() {
  const [bookingFromAPI,SetBookingFromAPI]= useState<IBooking[]>([]);
  // const [availableBookings,SetAvailableBookings] = useState<IBooking[]>([]);
  const [costumersFromAPI,SetCostumersFromAPI] = useState<ICostumerData[]>([]);

  const [toogle, SetToogle] = useState(true); 
  const [toogleGDPR,SetToogleGDPR] = useState(true)
  const [toogleNewContainer,SetToogleNewContainer] = useState(true)
  const [updateBookingContainer,SetUpdateBookingContainer] = useState(true)
  const [tooglePersonalInfo,SetTooglePersonalInfo] = useState(true)
  const [updateBookingButton,SetUpdateBookingButton] = useState(true)
  const [choosenTime,SetChoosenTime] = useState('');
  const [choosenDate,SetChoosenDate] = useState('');
  const [bookingIDForUpdate,SetBookingIDForUpdate] =useState('')
  const [costumerIDForUpdate,SetCostumerIDForUpdate] = useState('')
  const [bookingForDate,SetBookingForDate] =useState('')
  const [bookingForTime,SetBookingForTime] =useState('')
  const [updateBookingText,SetUpdateBookingText]=useState('')
  const [choosenGuests,SetChoosenGuest] = useState(0)
  const [bookingNumberOfGuestUpdate,SetBookingNumberOfGuestUpdate] =useState(0)

  const [showFreeTime,SetShowFreeTime] = useState(<div></div>)
  const [bookingUpdateInfo,SetBookingUpdateInfo]=useState(<div></div>)

  const baseURL:string='https://school-restaurant-api.azurewebsites.net/'
  const ourRestaurantId:string='624ff079138a40561e115f16'
  const [newCustomer, setNewCustomer] = useState<INewCostumer>({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });

    const [newBooking, setNewBooking] = useState<NewBookning>({
      restaurantId: ourRestaurantId,
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

  const [newUpdatebooking,SetNewUpdatebooking] = useState<UpdateBookning>({
    id: '',
    restaurantId:ourRestaurantId,
    date: '',
    time: '',
    numberOfGuests:0,
    customerId: ''
    })

let costumersFull:any[]=[]

    const handleBookingInfoFName=(e:ChangeEvent<HTMLInputElement>)=>{
      let name = e.target.value
      setNewCustomer({...newCustomer,name:name})
    }

    const handleBookingInfoLName=(e:ChangeEvent<HTMLInputElement>)=>{
      let lastname = e.target.value
      setNewCustomer({...newCustomer,lastname:lastname})
    }   

    const handleBookingInfoEmail=(e:ChangeEvent<HTMLInputElement>)=>{
      let email = e.target.value
      setNewCustomer({...newCustomer,email:email})
    }

    const handleBookingInfoPhone=(e:ChangeEvent<HTMLInputElement>)=>{
      let phone = e.target.value;
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
      console.log(name)
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
  },[]);



  useEffect(() => {
    console.log("Trying to get data");
    if (costumersFromAPI.length > 0) return;
  },[]);

  const newBookingHTML = ()=>{
    SetShowFreeTime(<></>)
   SetToogleNewContainer(!toogleNewContainer)
  }

const getFromAPI = ()=>{
  axios.get<IBooking[]>(baseURL+'booking/restaurant/'+ourRestaurantId)
  .then((response) => {
        let bookingListFromAPI= response.data.map((bookings:IBooking)=>{
        return new Booking(bookings._id,bookings.date,bookings.restaurantId,bookings.time,bookings.numberOfGuests,bookings.customerId)

         });
         let listIDs: string [] = [];
        for (let i = 0; i < bookingListFromAPI.length; i++) {
          listIDs.push(bookingListFromAPI[i].customerId);
        }
        SetBookingFromAPI(bookingListFromAPI);
      return listIDs
    })
    .then((customerIdlist) => {
      console.log(customerIdlist)
      for (let i = 0; i < customerIdlist.length; i++) {
        axios.get<ICostumerData[]>(baseURL+'customer/'+customerIdlist[i])
          .then((response) => {
              let costumersListFromAPI = response.data.map((cosutmers:ICostumerData)=>{
            return costumersFull.push( new CostumerData(cosutmers._id,cosutmers.name,cosutmers.lastname,cosutmers.email,cosutmers.phone))
            });
            SetCostumersFromAPI(costumersFull)
          }).catch(error=>{
            console.log("Det blev något fel!" + " Statuskod" + error)
           })
        }
      }).catch(error=>{
        console.log("Det blev något fel!" + " Statuskod" + error)
      })
    }


    const sendUpdateBooking = ()=>{
    
      let updateBooking={...newUpdatebooking}
      updateBooking.id=bookingIDForUpdate
      updateBooking.restaurantId=ourRestaurantId
      updateBooking.date=bookingForDate
      updateBooking.time=bookingForTime
      updateBooking.numberOfGuests=bookingNumberOfGuestUpdate
      updateBooking.customerId=costumerIDForUpdate
    
      axios.put(baseURL+'booking/update/'+bookingIDForUpdate,{
    
        "id": updateBooking.id,
        "restaurantId": ourRestaurantId,
        "date": updateBooking.date,
        "time": updateBooking.time,
        "numberOfGuests": updateBooking.numberOfGuests,
        "customerId": updateBooking.customerId
        
      }).then(response=>( console.log(response)))
      .then(getFromAPI)
      .catch(error=>{
        console.log("Det blev något fel!" + " Statuskod" + error)
       })
       console.log(bookingFromAPI)
    }
  

    const deletedBooking=(deletedBookingID:string,index:number)=>{
     let booking = bookingFromAPI
     SetBookingFromAPI(booking.splice(index,0)) 
     axios.delete(baseURL+'booking/delete/'+deletedBookingID)
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
    
    axios.post(baseURL+'booking/create', {
    "restaurantId": ourRestaurantId,
    "date": newBooking.date,
    "time": newBooking.time,
    "numberOfGuests": newBooking.numberOfGuests,
    "customer": {
      "name": newCustomer.name,
      "lastname": newCustomer.lastname,
      "email": newCustomer.email,
      "phone": newCustomer.phone
    }
    }).then(response => {getFromAPI()
    SetToogleNewContainer(!toogleNewContainer)
    })
    .catch(error => {console.log(error)
    SetShowFreeTime(<div>
      <p>Blev ett fel med bokningen! Kolla att ni skrev in rätt info annars testa igen. Statuskod: {error}</p>
    </div>)
    })
    }

  const updateBooking = (bookingID:string,bookingDate:string,bookingTime:string,bookingNumberOfGuest:number,costumerID:string,restaurantId:string)=>{
 SetUpdateBookingContainer(!updateBookingContainer)
  SetUpdateBookingText('')
  SetBookingUpdateInfo(<div>
 <p>Boknings ID: {bookingID}<br />
  Tid: {bookingTime} <br />
  Datum: {bookingDate}<br />
  Antal gäster:   {bookingNumberOfGuest}<br /> 
  Skriv önskade ändring!</p>
 </div>)

 SetBookingIDForUpdate(bookingID);
 SetBookingForDate(bookingDate);
 SetBookingForTime(bookingTime);
 SetBookingNumberOfGuestUpdate(bookingNumberOfGuest);
 SetCostumerIDForUpdate(costumerID)
}

const confirmUpdatedBookingInfo=(chooseDate:string,choosenTime:string,numberOfGuests:number)=>{

  SetBookingForTime(choosenTime);
  SetBookingForDate(chooseDate)
  SetBookingNumberOfGuestUpdate(numberOfGuests)

  for (let i = 0; i < bookingFromAPI.length; i++) {

    if (chooseDate === bookingFromAPI[i].date){
      if(choosenTime === bookingFromAPI[i].time&&bookingFromAPI.length<15){

          SetUpdateBookingText('Du kan flytta till denna tid!')
        SetUpdateBookingButton(false)

      }else if(choosenTime === bookingFromAPI[i].time&&bookingFromAPI.length>=15){

        SetUpdateBookingText('Tyvärr fullbokad men kanske kan kolla på en annat datum?')
        SetUpdateBookingButton(true)

      }else{

        SetUpdateBookingText('Kan ändra till det här datumet men en annan tid!!')
        SetUpdateBookingButton(false)
      }
    }if(bookingFromAPI.length<15){

      SetUpdateBookingText('Du kan flytta till denna tid!')
        SetUpdateBookingButton(false)
    }
            }
          }



  let bookinginfo = bookingFromAPI.map((bookings: IBooking,id:number) => {
    return (<div key={id}>
          <p>
            Gästens bookings id: {bookings._id} <br />
            Gästens datum: {bookings.date} <br />
            Gästens tid: {bookings.time} <br />
            Gäst id:     {bookings.customerId}<br />
            Antal gäster: {bookings.numberOfGuests} <br />
          <button onClick={()=>{deletedBooking(bookings._id,id)}}>Radera</button>
          <button onClick={()=>{updateBooking(bookings._id,bookings.date,bookings.time,bookings.numberOfGuests,bookings.customerId,bookings.restaurantId)}}>Flytta</button> 
          </p>
      </div>
    );
  });

  let bookingHtml2 = costumersFromAPI.map(
    (reddd: ICostumerData, id: number) => {
      console.log("Kör mapping");
      console.log(costumersFull);
      console.log(costumersFromAPI);

  let personalBookingInfo = costumersFromAPI.map((costumer: ICostumerData,id:number) => {
    return (<div key={id}>
          <p>
            Förnamn: {costumer.name}<br />
            Efternamn: {costumer.lastname} <br />
            ID: {costumer._id} <br />
            Email: {costumer.email} <br />
            Telefonnummer: {costumer.phone}
          <br />

          </p>
        </div>
      );
    }
  );

  useEffect(() => {
    console.log("booking changed");
  }, [bookingFromAPI]);
  
  const chooseWeek=(inputDateFromUser:string,inputTimeFromUser:string,inputGuestFromUser:number)=>{
    if(inputDateFromUser===''||inputGuestFromUser===0){

     return SetShowFreeTime(<div><p>Du valde inget datum eller antal gäster! 
       gör om och försök igen!</p></div>)

    }else{

      if(inputTimeFromUser==='18:00'||inputTimeFromUser==='21:00' ){

        let today = new Date(inputDateFromUser);
        let listOfDate:string[]=[]; 
        let listOfTime:string[]=['18:00','21:00']

      for (let i = 0; i < 7; i++) {  

      let date = new Date(today.getFullYear(), today.getMonth(), today.getDate()+i+1).toISOString().split('T')[0];
      listOfDate.push(date)
    }
    bookingInfoHTML(inputDateFromUser,inputTimeFromUser,inputGuestFromUser,listOfDate,listOfTime)    

    }else
    return SetShowFreeTime(<div><p>Du valde ingen tid! Välj tid och försök igen!</p></div>)
  }}

useEffect(() => {
  console.log("booking changed");
}, [showFreeTime]);





const bookingInfoHTML=(chooseDate:string,choosenTime:string,choosenGuests:number,dates: string [], times: string [])=>{
  if(bookingFromAPI.length===0){

    SetToogleNewContainer(true)
    return SetShowFreeTime(<div> 
      <p>Det finns ett ledigt bord att boka gällande datumet: {chooseDate} och tiden: {choosenTime}</p>
      <button onClick={()=>{newBookingHTML()}}>Boka!</button>
      <p>Vill du boka det?</p>
      </div>)

  }else{

 
  for (let i = 0; i < dates.length; i++) {

    if (chooseDate === bookingFromAPI[i].date){

           for (let i = 0; i < bookingFromAPI.length; i++) {

             if(choosenTime === bookingFromAPI[i].time&&bookingFromAPI.length<15){

                SetToogleNewContainer(true)
              return SetShowFreeTime(<div> 
                <p>Det finns ett ledigt bord att boka gällande datumet: {chooseDate} och tiden: {choosenTime}</p>
                <button onClick={()=>{newBookingHTML()}}>Boka!</button>
                <p>Vill du boka det?</p>
                </div>)
            }   
            else if(choosenTime === bookingFromAPI[i].time&&bookingFromAPI.length>=15){

              SetToogleNewContainer(true)
              SetShowFreeTime(<div> 
                <p>Det finns inget bord att boka gällande datumet: {chooseDate} och tiden: {choosenTime}. <br />
                Kolla ett annat datum eller avvakta för eventuella avbokningar...
                </p>
                </div>)
            }        
            else{
              
                SetToogleNewContainer(true)
              SetShowFreeTime(<div> 
                <p>Det finns bord att boka gällande datumet: {chooseDate} och tiden: {choosenTime}</p>
                <button onClick={()=>{newBookingHTML()}}>Boka!</button>
                </div>)
            }
           }
        }else{
          SetShowFreeTime(<div> 
            <p>Det finns bord att boka gällande datumet: {chooseDate} och tiden: {choosenTime}</p>
            <button onClick={()=>{newBookingHTML()}}>Boka!</button>

                <p>Vill du boka det?</p>
              </div>
            );
          } else if (
            choosenTime === bookingFromAPI[i].time &&
            bookingFromAPI.length >= 15
          ) {
            // console.log("det finns inga bord att boka",bookingFromAPI[i].time.length>15 )
            // console.log("det finns ",bookingFromAPI[i].date[i])
            // console.log("det finns ",bookingFromAPI[i].date)
            // console.log(choosenTime, bookingFromAPI[i],bookingFromAPI[i].time.length,15,chooseDate,bookingFromAPI[i].date)
            // console.log("det finns bord att boka",bookingFromAPI.length )
            // console.log('över eller lika med')
            SetToogleNewContainer(true);
            SetShowFreeTime(
              <div>
                <p>
                  Det finns inget bord zzzz att boka gällande datumet:{" "}
                  {chooseDate} och tiden: {choosenTime}. <br />
                  Kolla ett annat datum eller avvakta för eventuella
                  avbokningar...
                </p>
              </div>
            );
          } else {
            SetToogleNewContainer(true);
            SetShowFreeTime(
              <div>
                <p>
                  Det finns ett bord dddddddd att boka gällande datumet:{" "}
                  {chooseDate} och tiden: {choosenTime}
                </p>
                <button
                  onClick={() => {
                    newBookingHTML();
                  }}>
                  Boka!
                </button>
              </div>
            );
          }
        }
      } else {
        SetShowFreeTime(
          <div>
            <p>
              Det finns ett bord eeeeeeeeeee att boka gällande datumet:{" "}
              {chooseDate} och tiden: {choosenTime}
            </p>
            <button
              onClick={() => {
                newBookingHTML();
              }}>
              Boka!
            </button>
            <p>Vill du boka det?</p>
          </div>
        );
      }
    }

    return(((<div>{chooseDate} {choosenTime}
    {showFreeTime}
    </div>))
    
    )
  } }

  
  return (<div className="App-header">
    <div>
    <h1>Admin</h1>
    <button onClick={()=>{SetTooglePersonalInfo(!tooglePersonalInfo)}} disabled={bookingFromAPI.length==0}>Visa personlig info</button>

    <div hidden={!tooglePersonalInfo}>
      {bookinginfo}
    </div>

    <div hidden={tooglePersonalInfo}>
      {personalBookingInfo}
    </div>

        <div className="updateContainer" hidden={updateBookingContainer}>
              <div>
              {bookingUpdateInfo}
                      <select name="time-select" id="timeSelect" required   onChange={(e)=>{handleBookingTime(e.target.value)}}>
                        <option value="18:00">18:00</option>
                        <option value="21:00">21:00</option>
                      </select> 
                     
                     <select name="guestAmount" id="guestForm" required  onChange={(e)=>{handleBookingInfoGuest(parseInt(e.target.value))}}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>  
                          <option value="6">6</option>
                     </select> <br />
                     
                   <input type="date" min="2022-04-01" required onChange={(e)=>{handleBookingDate(e.target.value)}}/>
                   <button onClick={()=>{confirmUpdatedBookingInfo(choosenDate,choosenTime,choosenGuests)}}>Sök!</button>
                   
                   <p>{updateBookingText}</p>

                   <button onClick={()=>{sendUpdateBooking()}} disabled={updateBookingButton}>Ändra</button>
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
                <option value="0">Välj antal gäster</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
        </select> <br /><br />
        
        <input type="checkbox" onClick={()=>{SetToogleGDPR(!toogleGDPR)}}/>Informerat kunden om GDPR <br /><br />
        <button disabled={toogleGDPR} onClick={()=>{chooseWeek(choosenDate,choosenTime,choosenGuests)}}> Sök!</button>
      </div>

          <div className="freeTime">
          {showFreeTime}
          </div>

          <div  hidden={toogleNewContainer}>
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
            </div>
        <div> 
      </div>
      </div>
    </div>
    </div>
  </div>
  )
}
