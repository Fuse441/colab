import { map, take } from 'rxjs';

import { Component, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import {City, locations} from '@config/filter/location'
import { Filter, moreFilter } from '@config/filter/moreFilter';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Checkbox } from 'primeng/checkbox';
import { localStorageKey } from '@config/localStorageKey';
import { FormControl, FormGroup } from '@angular/forms';

import * as moment from 'moment';
import { TimeCode } from '@config/time/time';
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
  stepper: boolean = false;
  spaceDetail:any[] = []
  date?: Date;
  disabledDates!: Date[];
  minDate!: Date ;
  maxDate!: any ;



  formSelectBooking = new FormGroup({
    date: new FormControl<any|null>(null),
    startTime: new FormControl<any | null>(null),
    endTime: new FormControl<any | null>(null)
  });

  stateOptions: any[] = [
    { label: '09:00-10:00', value: 'CODE_TIME_01',disabled:false },
    { label: '10:00-11:00', value: 'CODE_TIME_02' ,disabled:false},
    { label: '11:00-12:00', value: 'CODE_TIME_03' ,disabled:false}
];
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
  onDialogChange(event:any){
    console.log(event)
  }
  handleDialogClose(success: boolean) {
    console.log(success)
    if (success) {


    } else {
      this.visible = false;
      this.stepper = false
    }
  }
  capacity:number = 0
  onDateChange(event: any) {
    this.formSelectBooking.get('startTime')?.setValue(null)
    const formatDate = moment(event).format('YYYY-MM-DD');
    this.homeService.checkSelectDate(this.selectedItem.spaceId, formatDate).pipe(take(1)).subscribe((response) => {
      if(response.responseCode === 200){

        this.capacity = ( this.selectedItemDetail.capacity - response.responseDatas.length)
        console.log(this.capacity)
        const bookedTimes = response.responseDatas.map((item: { bookingStartTime: string; bookingEndTime: string }) => ({
            startTime: item.bookingStartTime,
            endTime: item.bookingEndTime
        }));
        console.log(bookedTimes)
        this.stateOptions = this.stateOptions.map((option) => {

          const timeCode = TimeCode[option.value as keyof typeof TimeCode];
          const isDisabled = bookedTimes.some((time: { startTime: string; endTime: string; }) =>
            time.startTime === timeCode.startTime && time.endTime === timeCode.endTime
        );
        console.log(isDisabled)
        return { ...option, disabled: isDisabled };
        })
      }
      else{
        this.stateOptions = this.stateOptions.map((option) => {
          this.capacity = this.selectedItemDetail.capacity
          return { ...option, disabled: false };
      });


      }


    });
}



  startDate?:string;
  startTimeFormatted?:string
  endTimeFormatted?:string
  formattedCodeToTime:any
  payload:any
  checkDate(){


    this.stepper = true
    const userProfileString = localStorage.getItem(localStorageKey.profile);
   const profile = JSON.parse(userProfileString!)

      const { date,startTime, endTime } = this.formSelectBooking.value;
    this.startDate = moment(date).format('YYYY-MM-DD');
    this.startTimeFormatted = this.formSelectBooking.get('startTime')?.value
    this.formattedCodeToTime = (TimeCode[this.startTimeFormatted as keyof typeof TimeCode]);

   this.payload = {
      userId: profile.id,
      spaceId: this.selectedItem.spaceId,
      startTime: this.formattedCodeToTime.startTime,
      endTime: this.formattedCodeToTime.endTime,
      bookingStatus: 1,
      bookingDate: this.startDate,
      note: "Your note here"
  };

  console.log(this.payload)
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
