import { Component } from '@angular/core';
import { localStorageKey } from '@config/localStorageKey';

import {menu} from '@config/menu';
import { PrimeIcons } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'colab';
  items = [{}]
  constructor(){
    this.items = menu

    console.log(this.items[2])
  }

  ngOnInit(){
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
  }
}
