
import { Component, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import {City, locations} from '@config/filter/location'
import { Filter, moreFilter } from '@config/filter/moreFilter';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Checkbox } from 'primeng/checkbox';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('op') overlayPanel?: OverlayPanel;
  @ViewChild('checkboxes') checkboxes?: Checkbox[];
  images: any[] | undefined;
  option: string[] | undefined;
  search:string | undefined;
  optionCity: City[] | undefined; 
  selectedCity: City | undefined;
  moreFilters:Filter[] | undefined;
  selectedFilter: any[] | undefined;
  startPrice: number  = 0
  lastPrice: number = 0
  space?: any[]
  totalRecords: number = 0
  resSpaceDetails?:any
  spaceDetail:any[] = [] 

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.images = this.homeService.getImages()
    this.optionCity = locations
    this.moreFilters = moreFilter
    this.homeService.GetSpace().subscribe((reponse => {
      this.space = reponse.responseDatas
      this.totalRecords = reponse.total
      this.resSpaceDetails = reponse.responseDatas
      this.GetSpaceDetails()
     
    }));
  }
  GetSpaceDetails(){
    
    this.resSpaceDetails.forEach((item:any) => {
      let temp = JSON.parse(item.spaceDetails)
      this.spaceDetail.push(temp)
      
    });
    console.log(this.spaceDetail)
  }

  testPrint(){
    console.log(this.spaceDetail)
  }

  clearCheckboxes() {
    this.selectedFilter = []
  }
  Search(){
    console.log(this.selectedFilter,this.startPrice,this.lastPrice)
   
  }
}
