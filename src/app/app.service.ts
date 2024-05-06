import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "@shared/service/api/api.service";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AppService extends ApiService {
  constructor(http:HttpClient) {
    super(http)
   }

  getSpace(id:number){
    return this.get(`Space/getSpace/${id}`)
  }

  deleteSpace(id:number){
    return this.delete(`Space/${id}`)
  }


}
