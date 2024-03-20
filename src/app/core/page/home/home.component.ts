
import { Component } from '@angular/core';
import { HomeService } from './home.service';
import {City, locations} from '@config/filter/location'
import { Filter, moreFilter } from '@config/filter/moreFilter';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  images: any[] | undefined;
  option: string[] | undefined;
  search:string | undefined;
  optionCity: City[] | undefined; 
  selectedCity: City | undefined;
  moreFilters:Filter[] | undefined;
  selectedFilter: any[] | undefined;
  startPrice: number  = 0
  lastPrice: number = 0
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.images = this.homeService.getImages()
    this.optionCity = locations
    this.moreFilters = moreFilter
    this.homeService.test().subscribe((reponse => {
      console.log(reponse)
    }));
  }

  Search(){
    console.log(this.selectedFilter,this.startPrice,this.lastPrice)

  }
}
