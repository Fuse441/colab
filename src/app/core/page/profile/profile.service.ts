import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "@shared/service/api/api.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends ApiService {
  constructor(http:HttpClient) {
    super(http)
   }

 Update = (id:number, payload:{username:string , firstName:string,lastName:string,email:string,birthDay:number,phoneNumber:string,active:boolean}) => this.post(`User/Upsert/${id}`,payload)
   GetUserById(id:number){
    return this.get(`User/getById/${id}`)

   }
  }

