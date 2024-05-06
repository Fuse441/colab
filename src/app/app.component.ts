import { AppService } from './app.service';
import { Component } from '@angular/core';
import { localStorageKey } from '@config/localStorageKey';

import {menu} from '@config/menu';
import { MessageService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'colab';
  items = [{}]
  loading = false
  constructor(private messageService: MessageService,private appService:AppService){
    this.items = menu

    console.log(this.items[2])
  }
  show(severity:string,summary:string,detail:string) {
    console.log("pass")
    this.loading = true
      this.messageService.add({ severity: severity, summary: summary, detail: detail });
      setTimeout(() => {
        this.loading = false
        window.location.reload();
      }, 3000);

}
  ngOnInit(){
    const userProfileString = localStorage.getItem(localStorageKey.profile);
   const profile = JSON.parse(userProfileString!)

    if(localStorage.getItem(localStorageKey.token)){
      this.items.splice(2, 1,{

        label: 'บัญชี',
        icon: PrimeIcons.USER,
        url: 'profile'

    });
      this.items.push({

          label: 'ออกจากระบบ',
          icon: PrimeIcons.SIGN_OUT,
          url: 'sign_out'

      })
    }
    if(profile.userType === "ADMIN" || profile.userType === "PARTNER"){
      this.items.push({

        label: 'การจัดการรายการ',
        icon: PrimeIcons.FILE_EDIT,
        url: 'management'

    })
    }
  }
}
