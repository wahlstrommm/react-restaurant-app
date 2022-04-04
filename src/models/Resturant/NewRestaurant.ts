import { IAdress } from "../IAdress";

export class INewRestaurant{
    name:string="Zias"
    adress:IAdress
 constructor(adress:IAdress){
     this.adress=adress;
 }
}