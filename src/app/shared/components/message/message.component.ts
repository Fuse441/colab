import { Component } from '@angular/core';

import { MessageUserService } from './message.service';
import { localStorageKey } from '@config/localStorageKey';
import { take } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  chat: boolean = false;
  msg :any[] = []
  cancelBooking: boolean = false;
  constructor(private messageService: MessageUserService){

  }
  toggleChat() {

    if(this.chat === false){
      const userProfileString = localStorage.getItem(localStorageKey.profile)
      const profile = JSON.parse(userProfileString!)
      this.messageService.renderChat(profile.id).subscribe(response =>{
        this.msg = JSON.parse(response.responseDatas.details)


      })

      this.messageService.checkStatus(profile.id).subscribe(response =>{
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





