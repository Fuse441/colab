import { Component } from '@angular/core';

import { MessageUserService } from './message.service';
import { localStorageKey } from '@config/localStorageKey';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  chat: boolean = false;
  msg :any[] = []
  cancelBooking: boolean = false;
  confirmCancel:boolean = false
  constructor(private messageServices: MessageUserService){

  }



  cancel(){
    const userProfileString = localStorage.getItem(localStorageKey.profile)
    const profile = JSON.parse(userProfileString!)
    this.messageServices.cancelBooking(profile.id).subscribe(response =>{
      if(response.responseCode === 200){
        this.confirmCancel = false
        this.chat === false
        // this.showMessage("success","ยกเลิกรายการจองสำเร็จ","เช็คที่อีเมลและกล่องข้อความเพื่อตรวจสอบรายละเอียด")
      }
    })
  }
  toggleCancel(){
    this.confirmCancel = !this.confirmCancel
    return this.confirmCancel
  }
  toggleChat() {

    if(this.chat === false){
      const userProfileString = localStorage.getItem(localStorageKey.profile)
      const profile = JSON.parse(userProfileString!)
      this.messageServices.renderChat(profile.id).subscribe(response =>{
        this.msg = JSON.parse(response.responseDatas.details)


      })

      this.messageServices.checkStatus(profile.id).subscribe(response =>{
        if(response.responseDatas === null){
          this.cancelBooking = false
        }
        else if(response.responseDatas != null){
          this.cancelBooking = true
        }
      })
    }

    this.chat = !this.chat

    return this.chat
  }

  }






