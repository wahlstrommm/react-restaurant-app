export class NewBookning{
    restaurantId:string
date:string
time:string
numberOfGuests:number
constructor(restaurantId:string,date:string,time:string,numberOfGuests:number){
    this.restaurantId = restaurantId,
    this.date=date,
    this.time=time,
    this.numberOfGuests=numberOfGuests;
    
}
}