import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HomeService  {
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
