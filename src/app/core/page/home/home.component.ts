import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  images: any[] | undefined;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.images = this.homeService.getImages()
    console.log(this.images)
  }
}
