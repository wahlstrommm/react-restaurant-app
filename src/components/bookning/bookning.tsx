import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { NewBookning } from '../../models/Bookning/NewBookning';
import { INewCostumer } from '../../models/Costumer/INewCostumer'
import './styles.css';
import { useForm } from 'react-hook-form'

export default function Bookning() {
  let bookingURL = "https://school-restaurant-api.azurewebsites.net/booking/create";
  const { register, handleSubmit, formState: {errors} } = useForm();

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
  };

  const handleCustomerChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name: string = e.target.name;
    setNewCustomer({...newCustomer, [name]: e.target.value});
  };

  // Behövde skapa en egen handleChange för select eftersom de andra tar in events från Input Element. 
  const handleTimeChange = (e:ChangeEvent<HTMLSelectElement>) => {
    let name: string = e.target.name;
    setNewBooking({...newBooking, [name]: e.target.value})
  }


  function sendBooking() {
    axios.post(bookingURL, {
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
    }).then(response => {console.log(response.data)})
    .catch(error => {console.log(error)})
  }

  const onSubmit = handleSubmit((data) => {
    sendBooking();
  });
  
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label>First name:</label>
          <input 
          {...register("name", {required: true})}
          type="text" 
          name="name" 
          value={newCustomer.name} 
          onChange={handleCustomerChange}
          />
          {errors.name && "Namn är obligatoriskt"}
         </div>
         <div>
          <label>Last name:</label>
          <input 
          {...register("lastname", {required: true})}
          type="text" name="lastname" value={newCustomer.lastname} onChange={handleCustomerChange}/>
          {errors.lastname && "Efternamn är obligatoriskt"}
        </div>
        <div>
          <label>Email:</label>
          <input 
          {...register("email", {required: true})}
          type="text" name="email" value={newCustomer.email} onChange={handleCustomerChange}/>
          {errors.email && "Email är obligatoriskt"}
        </div>
        <div>
          <label>Phone number:</label>
          <input 
          {...register("phone", {required: true})}
          type="text" name="phone" value={newCustomer.phone} onChange={handleCustomerChange}/>
          {errors.phone && "Telefonnummer är obligatoriskt"}
        </div>
        <div>
          <label>Date of booking:</label>
          <input 
          {...register("date", {required: true})}
          type="date" name="date" value={newBooking.date} onChange={handleBookingChange}/>
          {errors.date && "Datum är obligatoriskt"}
        </div>
        <div>
          <label>Number of guests:</label>
          <input 
          {...register("numberOfGuests", {required: true})}
          type="number" name="numberOfGuests"  value={newBooking.numberOfGuests} onChange={handleBookingChange}/>
          {errors.numberOfGuests && "Antal gäster är obligatoriskt"}
        </div>
        <div>
          <label>Tid: </label>
          <select 
          {...register("time-select", {required: true})}
          name="time" id="timeSelect" onChange={handleTimeChange}>
            <option value="18:00">18:00</option>
            <option value="21:00">21:00</option>
          </select>
          {errors.time && "Vänligen välj en tidpunkt"}
        </div>
        <input type="submit" />
      </form>

    </>
  )
}
