import { HomeService } from './../../../core/page/home/home.service';
import { Component, Input } from '@angular/core';
import { localStorageKey } from '@config/localStorageKey';
import { TimeCode } from '@config/time/time';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {
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

  constructor(private messageService: MessageService,private homeService:HomeService){


  }
  ngOnInit() {


  }


  showMessage() {
    this.messageService.add({ severity: 'success', summary: 'จองรายสำหรับ', detail: 'เช็คที่อีเมลและกล่องข้อความเพื่อตรวจสอบรายละเอียด',life:4000});
}
load() {
  this.btnLoading = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      this.btnLoading = false;
      this.visible = false;
      this.showMessage();
      resolve(true);
    }, 2000);
  });
}

toggleDialog() {
  this.visible = true;
}

sendMail() {
  this.homeService.booking(0, this.payload).subscribe({
    next: (response) => {
      if (response.responseCode === 200) {
        this.load().then(() => {

        });
      }
    },
    error: (err) => {
      console.error("Failed to send booking due to an error:", err);
    }
  });
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
