import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';

const modules = [
  ButtonModule,
  InputTextModule,
  ChipsModule
  
];


@NgModule({


  imports: modules,

  exports: modules

})
export class PrimeModule { }
