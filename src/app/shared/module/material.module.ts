import { NgModule } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';

const modules = [
  MatChipsModule,

];


@NgModule({


  imports: modules,

  exports: modules

})
export class MaterialModule { }
