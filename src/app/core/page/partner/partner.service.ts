import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "@shared/service/api/api.service";

@Injectable({
  providedIn: 'root'
})
export class PartnerService extends ApiService {
  constructor(http:HttpClient) {
    super(http)
   }

  getSpace(id:number){
    return this.get(`Space/getSpace/${id}`)
  }
  getSpaceAll(){
    return this.get(`Space`)
  }
  deleteSpace(id:number){
    return this.delete(`Space/${id}`)
  }
  getChart(id:number){
    return this.get(`Booking/chart/${id}`)
  }

 Update = (id:number, payload:{spaceName:string , spaceDescription:string,spaceType:string,spaceDetails:string,partnerId:number,image:string}) => this.post(`Space/${id}`,payload)
 Create = (id:number, payload:{spaceName:string , spaceDescription:string,spaceType:string,spaceDetails:string,partnerId:number,image:string}) => this.post(`Space/${id}`,payload)
  }

