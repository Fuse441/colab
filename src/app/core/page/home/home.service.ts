import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "@shared/service/api/api.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService extends ApiService {
  constructor(http:HttpClient) {
    super(http)
   }

   GetSpace(search?:string){
    if(search){
      return  this.get(`Space?search=${search}`)
    }
    else{
      return  this.get(`Space`)
    }

   }
   GetBookingId(id:number){
    return this.get(`Booking/${id}`)
   }
   checkSelectDate(id:number,date:string){
    return this.get(`Booking/selectDate/${id}/${date}`)
   }

   booking = (id:number,payload:{userId:number, spaceId: number,
   startTime: string,
   endTime: string,
   bookingStatus: number,
   bookingDate: string,
   note: string}) => this.post(`Booking/${id}`,payload)
  getImages(){

    let images: any[] = [];

    images= [
      {
        itemImageSrc: 'https://christmasscreensavers.net/wp-content/uploads/2020/02/Coworking-Space-1-4.jpg',
        thumbnailImageSrc: 'https://christmasscreensavers.net/wp-content/uploads/2020/02/Coworking-Space-1-4.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
    }, {
      itemImageSrc: 'https://www.wework.com/ideas/wp-content/uploads/sites/4/2021/07/20190731_WeWork_SonyCenter_Berlin_008_v1-1120x630.jpg',
      thumbnailImageSrc: 'https://www.wework.com/ideas/wp-content/uploads/sites/4/2021/07/20190731_WeWork_SonyCenter_Berlin_008_v1-1120x630.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1'
  }
    ]

    return images
  }
}
