import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "@shared/service/api/api.service";

@Injectable({
  providedIn: 'root'
})
export class MessageUserService extends ApiService {
  constructor(http:HttpClient) {
    super(http)
   }

  renderChat(id:number){
    return this.get(`Chat/${id}`)
  }
}
