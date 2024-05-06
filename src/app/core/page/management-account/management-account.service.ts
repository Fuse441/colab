import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@shared/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementAccountService extends ApiService {
  constructor(http:HttpClient) {
    super(http)
   }

   getUser(){
    return this.get(`User`)
   }
   Delete(id:number){
    return this.delete(`User/${id}`);
   }

   Upsert = (id:number, payload:{username:string , firstName:string,lastName:string,email:string,birthDay:number,phoneNumber:string,active:number}) => this.post(`User/Upsert/${id}`,payload)
  }

