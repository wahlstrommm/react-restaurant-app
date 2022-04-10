import { INewCostumer } from "../Costumer/INewCostumer"

export class NewBookning{
    restaurantId:string
    date:string
    time:string
    numberOfGuests:number
    customer: INewCostumer;
constructor(restaurantId:string,date:string,time:string,numberOfGuests:number, customer: INewCostumer){
    this.restaurantId = restaurantId,
    this.date=date,
    this.time=time,
    this.numberOfGuests=numberOfGuests;
    this.customer=customer;
    }
}