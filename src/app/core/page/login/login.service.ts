import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "@shared/service/api/api.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiService {
  constructor(http:HttpClient) {
    super(http)
   }

   login = (payload:{username:string , password:string}) => this.post("User/login",payload)
}
