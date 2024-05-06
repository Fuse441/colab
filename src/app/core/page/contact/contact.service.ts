import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "@shared/service/api/api.service";

@Injectable({
  providedIn: 'root'
})
export class ContactService extends ApiService {
  constructor(http:HttpClient) {
    super(http)
   }

 SendMail = (payload:{firstName:string ,lastName:string,email:string,msg:string}) => this.post(`User/contact`,payload)

  }

