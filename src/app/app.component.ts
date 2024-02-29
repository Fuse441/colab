import { Component } from '@angular/core';

import {menu} from '@config/menu';
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
  }


}
