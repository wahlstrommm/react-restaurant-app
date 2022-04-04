export class Bookning{
    id:string
    restaurantId:string
    date:string
    time:string
    numberOfGuests:number
    customerId:string
    constructor(id:string,restaurantId:string,date:string,time:string,numberOfGuests:number,customerId:string){
        this.id=id,
        this.restaurantId=restaurantId,
        this.date=date,
        this.time=time,
        this.numberOfGuests=numberOfGuests,
        this.customerId=customerId
    }
}