import { HomeService } from './../../../core/page/home/home.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { localStorageKey } from '@config/localStorageKey';
import { TimeCode } from '@config/time/time';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { catchError, of, pipe, take } from 'rxjs';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent{
  @Input() spaceName?:string
  @Input() spaceDescription?:string
  @Input() spaceType?:string
  @Input() location?:string
  @Input() selectedItemDetail?:any
  @Input() bookingDate:any
  @Input() codeToTime?:any
  @Input() endTime:any
  @Input() payload:any
  btnLoading = false;
  visible:boolean = false;
  bookingStatus:boolean = false
  currentDate: Date = this.getCurrentDate();
  @Output() closeDialog: EventEmitter<any> = new EventEmitter();
  constructor(private messageService: MessageService,private homeService:HomeService){


  }
  ngOnInit() {

  }

  getCurrentDate(): Date {
    return new Date(); // วันที่ปัจจุบัน
  }
  showMessage(format:string,msg:string,details:string) {
    this.messageService.add({ severity: format, summary: msg, detail: details,life:4000});
}
load() {
  this.btnLoading = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      this.btnLoading = false;
      this.visible = false;

      resolve(true);
    }, 500);
  });
}

toggleDialog() {
  this.visible = true;
}

sendMail() {
  this.btnLoading = true;
    this.homeService.booking(0, this.payload).subscribe(response => {
      if(response.responseCode === 200){
        this.showMessage("success","จองรายสำหรับ","เช็คที่อีเมลและกล่องข้อความเพื่อตรวจสอบรายละเอียด");
        this.visible = false;
        this.closeDialog.emit(false);
        this.btnLoading = false;

      }
      else{
        this.showMessage("error","จองรายการไม่สำเร็จ","กรุณาตรวจว่าคุณได้จอง Co-Working Space ไปแล้วหรือยัง");
        this.visible = false;
        this.closeDialog.emit(false);
        this.btnLoading = false;
      }
    })

}
  calculateTotal(price: number) {
    // แปลงสตริงเป็นวัตถุ Date
    const startDate = new Date(this.codeToTime?.startTime);
    const endDate = new Date(this.codeToTime?.endTime);

    // คำนวณระยะเวลาในหน่วยมิลลิวินาที
//     const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60); // แปลงเป็นชั่วโมง


//     return Math.ceil(duration) * price; // ปัดเศษเวลาขึ้นและคูณด้วยราคา
// }
  }
}
