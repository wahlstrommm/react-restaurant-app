import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Booking } from "../../models/bookning/bookning";
import { IBooking } from "../../models/bookning/IBookning";
import { INewCostumer } from "../../models/Costumer/INewCostumer";
import { NewBookning } from "../../models/bookning/NewBookning";
import { Costumer } from "../../models/Costumer/Costumer";
import { CostumerData } from "../../models/Costumer/CostumerData";
import { ICostumerData } from "../../models/Costumer/ICostumerData";

export default function Admin() {
  const [bookingFromAPI, SetBookingFromAPI] = useState<IBooking[]>([]);
  const [availableBookings, SetAvailableBookings] = useState<IBooking[]>([]);
  const [costumersFromAPI, SetCostumersFromAPI] = useState<ICostumerData[]>([]);
  const [toogle, SetToogle] = useState(true);
  const [choosenDate, SetChoosenDate] = useState("2022-04-27");
  const [choosenTime, SetChoosenTime] = useState("");
  const [choosenGuests, SetChoosenGuest] = useState(1);
  const [showFreeTime, SetShowFreeTime] = useState(<div></div>);
  // const [newBookingContainer,SetNewbookingContainer] = useState(<div></div>)
  const [toogleNewContainer, SetToogleNewContainer] = useState(true);
  const [updateBookingContainer, SetUpdateBookingContainer] = useState(true);
  const [bookingIDForUpdate, SetBookingIDForUpdate] = useState("");
  const [bookingForDate, SetBookingForDate] = useState("");
  const [bookingForTime, SetBookingForTime] = useState("");
  const [bookingNumberOfGuestUpdate, SetBookingNumberOfGuestUpdate] =
    useState(0);
  const [bookingUpdateInfo, SetBookingUpdateInfo] = useState(<div></div>);
  const [toogleGDPR, SetToogleGDPR] = useState(true);
  const [newCustomer, setNewCustomer] = useState<INewCostumer>({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [newBooking, setNewBooking] = useState<NewBookning>({
    restaurantId: "624ffb0755e34cb62ef983ec",
    date: "",
    time: "",
    numberOfGuests: 0,
    customer: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });

  let costumerIDs: string[] = [];
  let costumersFull: any[] = [];

  const handleBookingInfoFName = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("hej from fname", e);
    let name = e.target.value;
    setNewCustomer({ ...newCustomer, name: name });
  };

  const handleBookingInfoLName = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("hej from lname", e);
    let lastname = e.target.value;
    setNewCustomer({ ...newCustomer, lastname: lastname });
  };

  const handleBookingInfoEmail = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("hej from email", e);
    let email = e.target.value;
    setNewCustomer({ ...newCustomer, email: email });
  };

  const handleBookingInfoPhone = (e: ChangeEvent<HTMLInputElement>) => {
    let phone = e.target.value;
    console.log("hej from phone", e);
    setNewCustomer({ ...newCustomer, phone: phone });
  };

  const handleBookingInfoGuest = (e: number) => {
    let guests = e;
    SetChoosenGuest(guests);
    setNewBooking({ ...newBooking, numberOfGuests: guests });
  };

  const handleBookingDate = (e: string) => {
    let name: string = e;
    SetChoosenDate(name);
    setNewBooking({ ...newBooking, date: name });
  };

  const handleBookingTime = (e: string) => {
    let time: string = e;
    SetChoosenTime(time);
    setNewBooking({ ...newBooking, time: time });
  };

  useEffect(() => {
    console.log("Trying to get data");
    if (bookingFromAPI.length > 0) return;
    if ((bookingFromAPI.length = 0)) return;
    getFromAPI();
  });
  // useEffect(() => {
  //   console.log("Trying to get costumer DATA");
  //   if (costumersFromAPI.length > 0) return;
  //   // getCostumersFromAPI()

  // });

  const newBookingHTML = () => {
    SetShowFreeTime(<></>);
    SetToogleNewContainer(!toogleNewContainer);
  };

  const updateAvailableBookingsPerDateTime = (date: string, time: string) => {
    SetAvailableBookings(
      bookingFromAPI.filter((booking) => {
        if (booking.time === time && booking.date === date) {
          return true;
        } else {
          return false;
        }
      })
    );
  };

  const getFromAPI = () => {
    axios
      .get<IBooking[]>(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/624ffb0755e34cb62ef983ec"
      )
      .then((response) => {
        let bookingListFromAPI = response.data.map((bookings: IBooking) => {
          return new Booking(
            bookings._id,
            bookings.date,
            bookings.restaurantId,
            bookings.time,
            bookings.numberOfGuests,
            bookings.customerId
          );
        });

        let listIDs: string[] = [];
        for (let i = 0; i < bookingListFromAPI.length; i++) {
          listIDs.push(bookingListFromAPI[i].customerId);
        }

        SetBookingFromAPI(bookingListFromAPI);
        console.log("hej");
        getIDs(bookingListFromAPI);
        return listIDs;
      })
      .then((customerIdlist) => {
        console.log(customerIdlist);
        for (let i = 0; i < customerIdlist.length; i++) {
          axios
            .get<ICostumerData[]>(
              "https://school-restaurant-api.azurewebsites.net/customer/" +
                customerIdlist[i]
            )
            .then((response) => {
              console.log("Hämtar Costumer", response.data);
              let costumersListFromAPI = response.data.map(
                (cosutmers: ICostumerData) => {
                  return costumersFull.push(
                    new CostumerData(
                      cosutmers._id,
                      cosutmers.name,
                      cosutmers.lastname,
                      cosutmers.email,
                      cosutmers.phone
                    )
                  );
                }
              );
              console.log(customerIdlist);
              console.log(costumersFromAPI);
              console.log(response.data);
              console.log(costumersFull);
              SetCostumersFromAPI(costumersFull);
              console.log(costumersListFromAPI);
            })
            .catch((error) => {
              console.log("Det blev något fel!" + " Statuskod" + error);
            });
        }
      })
      .catch((error) => {
        console.log("Det blev något fel!" + " Statuskod" + error);
      });
  };
  //       let mergedArray = [];
  // for (let i = 0, il = bookingFromAPI.length; i < il; i++) {
  //   mergedArray.push(bookingFromAPI[i]);
  //   mergedArray.push(costumersFull[i]);
  //   console.log(mergedArray)
  // }

  // var array1 = [1, 2, 3, 4];
  // var array2 = ["a", "b", "c", "d"];

  const getIDs = (bookingListFromAPI: Booking[]) => {
    console.log("från ids", typeof bookingListFromAPI);
    for (let i = 0; i < bookingListFromAPI.length; i++) {
      costumerIDs.push(bookingListFromAPI[i].customerId);
      console.log(bookingListFromAPI[i].customerId);
      let uniqeIDforCostumer = bookingListFromAPI[i].customerId;
      // getCostumersFromAPI(uniqeIDforCostumer)
    }
  };

  // for (let i = 0; i < costumersFromAPI.length; i++) {
  //   console.log(costumersFromAPI[i])
  // }
  // const getCostumersFromAPI = (uniqeIDforCostumer:string)=>{

  //   axios.get<CostumerData[]>('https://school-restaurant-api.azurewebsites.net/customer/'+uniqeIDforCostumer)
  //   .then((response) => {
  //     console.log('Hämtar Costumer',response.data)
  //     let costumersListFromAPI = response.data.map((cosutmers:CostumerData)=>{
  //       return new CostumerData(cosutmers.id,cosutmers.name,cosutmers.lastname,cosutmers.email,cosutmers.phone)
  //       });
  //       SetCostumersFromAPI(costumersListFromAPI);
  //       costumersFull.push(costumersListFromAPI)
  //       console.log(costumersListFromAPI)
  //       console.log(response.data)
  //       console.log(costumersFull)
  //       console.log(costumersListFromAPI)
  //     })
  //   }
  //   const render =()=>{
  // console.log(costumersFull.length)
  //     costumersFull.map((costumers: CostumerData,id:number) => {
  //       return ((<div key={id}>
  //             <p>
  //               Gästens bookings id: {costumers.email} <br />
  //               Gästens datum: {costumers.lastname} <br />
  //               Gästens tid: {costumers.name} <br />
  //               Gäst id:     {costumers.phone}<br />
  //               Antal gäster: {costumers.email} <br />
  //             </p>
  //         </div>)
  //       );
  //     });
  //   }
  useEffect(() => {
    const timer = setTimeout(() => {
      // render()
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const updateBooking = (
    bookingID: string,
    bookingDate: string,
    bookingTime: string,
    bookingNumberOfGuest: number,
    costumerID: string,
    restaurantId: string
  ) => {
    SetUpdateBookingContainer(!updateBookingContainer);
    console.log(costumersFromAPI);

    SetBookingIDForUpdate(bookingID);
    SetBookingForDate(bookingDate);
    SetBookingForTime(bookingTime);
    SetBookingNumberOfGuestUpdate(bookingNumberOfGuest);
    console.log("id kund", costumerID);
    console.log("gäster", bookingNumberOfGuest);
    console.log("tid", bookingForTime);
    console.log("datum", bookingDate);
    console.log("resturangid", restaurantId);

    SetBookingUpdateInfo(
      <div>
        <p>Gällande ID: {bookingIDForUpdate}</p>
        <p>Skriv önskade ändring!</p>
        <p>tid:</p>
        <select
          name="time-select"
          id="timeSelect"
          required
          value={bookingTime}
          onChange={(e) => {
            handleBookingTime(e.target.value);
          }}>
          <option value="18:00">18:00</option>
          <option value="21:00">21:00</option>
        </select>{" "}
        <br />
        <p> Antal gäster: </p>
        <select
          name="guestAmount"
          id="guestForm"
          required
          value={bookingNumberOfGuest}
          onChange={(e) => {
            handleBookingInfoGuest(parseInt(e.target.value));
          }}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>{" "}
        <br />
        <p>Datum: </p>
        <input
          type="date"
          min="2022-04-01"
          value={bookingDate}
          required
          onChange={(e) => {
            handleBookingDate(e.target.value);
          }}
        />
        <button
          onClick={() => {
            sendUpdateBooking(bookingDate, bookingTime, bookingNumberOfGuest);
          }}>
          Sök!
        </button>
      </div>
    );

    //  let restaurantId='';
    console.log(bookingID, bookingDate, bookingTime, bookingNumberOfGuest);
    // axios.post('https://school-restaurant-api.azurewebsites.net/booking/update/'+bookingID)
  };

  const sendUpdateBooking = (
    chooseDate: string,
    choosenTime: string,
    numberOfGuests: number
  ) => {
    for (let i = 0; i < bookingFromAPI.length; i++) {
      // console.log(bookingFromAPI[i].date)
      if (chooseDate === bookingFromAPI[i].date) {
      }
      for (let i = 0; i < bookingFromAPI.length; i++) {}
      if (
        choosenTime === bookingFromAPI[i].time &&
        bookingFromAPI.length < 15
      ) {
      }
    }
  };

  let bookingHtml = bookingFromAPI.map((bookings: IBooking, id: number) => {
    console.log("Kör mapping");
    console.log(costumersFull);
    console.log(costumersFromAPI);
    let costumerInfo = costumersFromAPI.filter((customerInfo) => {
      if (customerInfo._id === bookings._id) {
        console.log("från info");
        return true;
      }
    });

    console.log(costumerInfo);
    return (
      <div key={id}>
        <p>
          Gästens bookings id: {bookings._id} <br />
          Gästens datum: {bookings.date} <br />
          Gästens tid: {bookings.time} <br />
          Gäst id: {bookings.customerId}
          <br />
          Antal gäster: {bookings.numberOfGuests} <br />
          <button
            onClick={() => {
              deletedBooking(bookings._id, id);
            }}>
            Radera
          </button>
          <button
            onClick={() => {
              updateBooking(
                bookings._id,
                bookings.date,
                bookings.time,
                bookings.numberOfGuests,
                bookings.customerId,
                bookings.restaurantId
              );
            }}>
            Flytta
          </button>
        </p>
      </div>
    );
  });

  let bookingHtml2 = costumersFromAPI.map(
    (reddd: ICostumerData, id: number) => {
      console.log("Kör mapping");
      console.log(costumersFull);
      console.log(costumersFromAPI);

      return (
        <div key={id}>
          <p>
            Gästens dssdds id: {reddd._id} <br />
            Gästens dssdsdsd: {reddd.lastname} <br />
            Gästens dssdds: {reddd.email} <br />
            Gäst dssdsdsd: {reddd.name}
            <br />
            Antal gäster: {reddd.phone}
            <br />
            {/* <button onClick={()=>{deletedBooking(bookings._id,id)}}>Radera</button> */}
            {/* <button onClick={()=>{updateBooking(bookings._id,bookings.date,bookings.time,bookings.numberOfGuests,bookings.customerId,bookings.restaurantId)}}>Flytta</button>  */}
          </p>
        </div>
      );
    }
  );

  useEffect(() => {
    console.log("booking changed");
  }, [bookingFromAPI]);

  const deletedBooking = (deletedBookingID: string, index: number) => {
    let booking = bookingFromAPI;
    SetBookingFromAPI(booking.splice(index, 0));
    axios
      .delete(
        "https://school-restaurant-api.azurewebsites.net/booking/delete/" +
          deletedBookingID
      )
      .then((response) => console.log(response))
      .then(getFromAPI)
      .catch((error) => {
        console.log("Det blev något fel!" + " Statuskod" + error);
      });
    console.log(bookingFromAPI);
  };

  const createBooking = () => {
    let costumer = { ...newBooking.customer };
    costumer.name = newCustomer.name;
    costumer.lastname = newCustomer.lastname;
    costumer.email = newCustomer.email;
    costumer.phone = newCustomer.phone;
    newBooking.customer = costumer;

    axios
      .post("https://school-restaurant-api.azurewebsites.net/booking/create", {
        restaurantId: "624ffb0755e34cb62ef983ec",
        date: newBooking.date,
        time: newBooking.time,
        numberOfGuests: newBooking.numberOfGuests,
        customer: {
          name: newCustomer.name,
          lastname: newCustomer.lastname,
          email: newCustomer.email,
          phone: newCustomer.phone,
        },
      })
      .then((response) => {
        getFromAPI();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const chooseWeek = (
    inputDateFromUser: string,
    inputTimeFromUser: string,
    inputGuestFromUser: number
  ) => {
    if (inputTimeFromUser === "18:00" || inputTimeFromUser === "21:00") {
      let today = new Date(inputDateFromUser);
      let listOfDate: string[] = [];
      let listOfTime: string[] = ["18:00", "21:00"];
      for (let i = 0; i < 7; i++) {
        let date = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + i + 1
        )
          .toISOString()
          .split("T")[0];
        listOfDate.push(date);
      }
      bookingInfoHTML(
        inputDateFromUser,
        inputTimeFromUser,
        inputGuestFromUser,
        listOfDate,
        listOfTime
      );
    } else
      return SetShowFreeTime(
        <div>
          <p>Du valde ingen tid! Välj tid och försök igen!</p>
        </div>
      );
  };

  useEffect(() => {
    console.log("booking changed");
  }, [showFreeTime]);

  const bookingInfoHTML = (
    chooseDate: string,
    choosenTime: string,
    choosenGuests: number,
    dates: string[],
    times: string[]
  ) => {
    console.log(dates, times);
    for (let i = 0; i < dates.length; i++) {
      console.log(bookingFromAPI[i].date);
      if (chooseDate === bookingFromAPI[i].date) {
        for (let i = 0; i < bookingFromAPI.length; i++) {
          if (
            choosenTime === bookingFromAPI[i].time &&
            bookingFromAPI.length < 15
          ) {
            SetToogleNewContainer(true);
            return SetShowFreeTime(
              <div>
                <p>
                  Det finns ett ledigt bord att boka gällande datumet:{" "}
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
          } else if (
            choosenTime === bookingFromAPI[i].time &&
            bookingFromAPI.length >= 15
          ) {
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
    return (
      <div>
        {chooseDate} {choosenTime}
        {showFreeTime}
      </div>
    );
  };

  return (
    <div className="App-header">
      <div>
        <h1>Admin</h1>
        <div>
          {bookingHtml}
          {bookingHtml2}
          {/* {newtime} */}
          <div className="updateContainer" hidden={updateBookingContainer}>
            {bookingUpdateInfo}
          </div>
        </div>
        <button onClick={() => SetToogle(!toogle)}>Skapa bokning!</button>
        <div className="toogleContainer" hidden={toogle}>
          <div className="formContainer">
            <div className="formsCreatedBooking">
              <form>
                <label>Skriv önskat datum:</label>
                <input
                  type="date"
                  min="2022-04-01"
                  value={choosenDate}
                  required
                  onChange={(e) => {
                    handleBookingDate(e.target.value);
                  }}
                />
              </form>
              <label>Tid: </label>
              <select
                name="time-select"
                id="timeSelect"
                required
                value={choosenTime}
                onChange={(e) => {
                  handleBookingTime(e.target.value);
                }}>
                <option value="DEFAULT">Välj en tid ...</option>
                <option value="18:00">18:00</option>
                <option value="21:00">21:00</option>
              </select>{" "}
              <br />
              <label htmlFor="amountGuest">Antal gäster:</label>
              <select
                name="guestAmount"
                id="guestForm"
                required
                value={choosenGuests}
                onChange={(e) => {
                  handleBookingInfoGuest(parseInt(e.target.value));
                }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>{" "}
              <br />
              <br />
              <input
                type="checkbox"
                onClick={() => {
                  SetToogleGDPR(!toogleGDPR);
                }}
              />
              Informerat kunden om GDPR <br />
              <br />
              <button
                disabled={toogleGDPR}
                onClick={() => {
                  chooseWeek(choosenDate, choosenTime, choosenGuests);
                }}>
                {" "}
                Sök!
              </button>
            </div>
            <div className="freeTime">{showFreeTime}</div>
            <div hidden={toogleNewContainer}>
              {/* {newBookingContainer} */}
              <form>
                <label>Förnamn: </label>
                <input
                  type="text"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleBookingInfoFName}
                />{" "}
                <br />
                <label>Efternamn: </label>
                <input
                  type="text"
                  name="lastname"
                  size={28}
                  value={newCustomer.lastname}
                  onChange={handleBookingInfoLName}
                />
                <br />
                <label>Email: </label>
                <input
                  type="email"
                  name="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  size={34}
                  value={newCustomer.email}
                  onChange={handleBookingInfoEmail}
                />
                <br />
                <label>Telefonnummer: </label>
                <input
                  type="tel"
                  name="phone"
                  size={20}
                  value={newCustomer.phone}
                  onChange={handleBookingInfoPhone}
                />
                <br />
              </form>

              <button
                onClick={() => {
                  createBooking();
                }}>
                Skicka bokning
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
