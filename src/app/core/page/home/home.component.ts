
import { Component, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import {City, locations} from '@config/filter/location'
import { Filter, moreFilter } from '@config/filter/moreFilter';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Checkbox } from 'primeng/checkbox';
import { localStorageKey } from '@config/localStorageKey';
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
  visible: boolean = false;
  spaceDetail:any[] = []

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.images = this.homeService.getImages()
    this.optionCity = locations
    this.moreFilters = moreFilter
    this.homeService.GetSpace().subscribe((reponse => {
      this.space = reponse.responseDatas
      this.totalRecords = reponse.total
this.checkToken()
      console.log(this.space)
    }));
  }


  selectedItem:any
  selectedItemDetail:any
  showDialog(id:number) {
    this.selectedItem = this.space?.find(item => item.spaceId === id);
    this.selectedItemDetail = JSON.parse(this.selectedItem.spaceDetails)
    console.log(this.selectedItemDetail)
    this.visible = true;

  }
  token:boolean = false
  checkToken(){
    let temp = localStorage.getItem(localStorageKey.token)
    if(temp === null){
      this.token = false
    } else{
      this.token = true
    }
    return localStorage.getItem(localStorageKey.token)
  }

  clearCheckboxes() {
    this.selectedFilter = []
  }
  Search(){
    console.log(this.selectedFilter,this.startPrice,this.lastPrice)

  }
}
