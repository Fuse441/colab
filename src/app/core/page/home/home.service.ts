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

   test(){
     return this.get("Space");
   }
  getImages(){

    let images: any[] = [];

    images= [
      {
        itemImageSrc: 'https://christmasscreensavers.net/wp-content/uploads/2020/02/Coworking-Space-1-4.jpg',
        thumbnailImageSrc: 'https://christmasscreensavers.net/wp-content/uploads/2020/02/Coworking-Space-1-4.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
    }
    ]

    return images
  }
}
