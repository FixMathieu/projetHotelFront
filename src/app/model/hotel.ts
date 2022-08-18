import { City } from "./city";

export class Hotel {
    id: number;
    name: string;
    address: string;
    phone : string;
    star : string;
    nbrRoom : number;
    price: number;
    image:string;
    city: City = new City(0, "");

    constructor(id: number = 0, name: string, address: string,phone : string,star : string,nbrRoom : number, price: number,  image:string, city: City) {
        this.id = id;
        this.name = name;
        this.address =address;
        this.phone = phone;
        this.star=star;
        this.nbrRoom =nbrRoom;
        this.price = price;
        this.image = image;
        this.city =city;
      }
}