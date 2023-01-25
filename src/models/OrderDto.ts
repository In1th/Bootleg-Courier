import { DocumentData } from "firebase/firestore";
import { makeAutoObservable } from "mobx";


export class Order{
    name: string;
    approved: boolean;
    deliveryTime: Date;
    contractor: string;
  
    constructor(dto: DocumentData){
      console.log(dto)
      this.name = dto.name;
      this.approved = dto.approved;
      this.deliveryTime = new Date(dto.deliveryTime.seconds * 1000);
      this.contractor = dto.contractor;
      makeAutoObservable(this);
    }
  }