
import { Component, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import {City, locations} from '@config/filter/location'
import { Filter, moreFilter } from '@config/filter/moreFilter';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Checkbox } from 'primeng/checkbox';
import { localStorageKey } from '@config/localStorageKey';
import { FormControl, FormGroup } from '@angular/forms';

import * as moment from 'moment';
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
  date?: Date;
  disabledDates!: Date[];
  minDate!: Date ;
  maxDate!: any ;
  formSelectBooking = new FormGroup({
    startTime: new FormControl<any | null>(null),
    endTime: new FormControl<any | null>(null)
  });


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
  checkDate(){

    const userProfileString = localStorage.getItem(localStorageKey.profile);
   const profile = JSON.parse(userProfileString!)

      const { startTime, endTime } = this.formSelectBooking.value;
    const startDate = moment(startTime).format('YYYY-MM-DD');
    const startTimeFormatted = moment(startTime).format('HH:mm:ss');
    const endTimeFormatted = moment(endTime).format('HH:mm:ss');

    const payload = {
      userId: profile.id,
      spaceId: this.selectedItem.spaceId,
      startTime: startTimeFormatted,
      endTime: endTimeFormatted,
      bookingStatus: 1,
      bookingDate: startDate,
      note: "Your note here"
  };

    this.homeService.login(0,payload).subscribe(response =>{
      console.log(response)
    })

  }

  selectedItem:any
  selectedItemDetail:any

closeDialog(){
  this.visible = false
}

  showDialog(id:number) {

    this.selectedItem = this.space?.find(item => item.spaceId === id);
    this.selectedItemDetail = JSON.parse(this.selectedItem.spaceDetails)
    console.log(this.selectedItemDetail)
    this.visible = true;
    this.homeService.GetBookingId(id).subscribe(response =>{

      this.minDate = new Date()
       this.disabledDates = response.responseDatas.filter((booking: { bookingStatus: number; }) => booking.bookingStatus === 1).map((booking: { bookingDate: any; }) => {
          const bookingDate = booking.bookingDate;
          const [year, month, day] = bookingDate.split('-').map(Number);

          return new Date(year, month - 1, day);
        });
    })


  }
  maxDateOnSelect(){
    const startTimeValue = this.formSelectBooking.get('startTime')?.value


    // this.maxDate = startDate

    return startTimeValue
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
