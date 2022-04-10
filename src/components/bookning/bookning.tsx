import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { NewBookning } from '../../models/Bookning/NewBookning';
import { INewCostumer } from '../../models/Costumer/INewCostumer'

export default function Bookning() {
  let bookingURL = "https://school-restaurant-api.azurewebsites.net/booking/create";

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
    restaurantId: '624ff079138a40561e115f16',
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


  function sendBooking() {
    axios.post(bookingURL, {
      restaurantId: '',
      date: newBooking.date,
      time: newBooking.time,
      numberOfGuests: newBooking.numberOfGuests,
      customer: {
        name: newBooking.customer.name,
        lastname: newBooking.customer.lastname,
        email: newBooking.customer.email,
        phone: newBooking.customer.phone
      }
    }).then(response => {console.log(response.data)})
    .catch(error => {console.log(error)})
  }


  return (
    <>
      <form>
        <label>First name:</label>
        <input type="text" name="name" value={newCustomer.name} onChange={handleCustomerChange}/>
        <label>Last name:</label>
        <input type="text" name="lastname" value={newCustomer.lastname} onChange={handleCustomerChange}/>
        <label>Email:</label>
        <input type="text" name="email" value={newCustomer.email} onChange={handleCustomerChange}/>
        <label>Phone number:</label>
        <input type="text" name="phone" value={newCustomer.phone} onChange={handleCustomerChange}/>
        <label>Date of booking:</label>
        <input type="date" name="date" value={newBooking.date} onChange={handleBookingChange}/>
        <label>Time to reserve table:</label>
        <input type="time" name="time" value={newBooking.time} onChange={handleBookingChange}/>
        <label>Number of guests:</label>
        <input type="number" name="numberOfGuests"  value={newBooking.numberOfGuests} onChange={handleBookingChange}/>
      </form>
      <button onClick={sendBooking}>Book a table!</button>
    </>
  )
}
