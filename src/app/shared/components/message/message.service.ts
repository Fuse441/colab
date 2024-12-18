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
  checkStatus(id:number){
    return this.get(`Booking/CheckStatus/${id}`)
  }
  cancelBooking(id:number){
    return this.post(`Booking/UpdateStatus/${id}`,null)
  }
}
