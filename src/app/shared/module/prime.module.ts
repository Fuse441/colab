import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
const modules = [
  ButtonModule,
  InputTextModule,
  ChipsModule,
  MenubarModule,
  GalleriaModule,
  CardModule
];


@NgModule({


  imports: modules,

  exports: modules

})
export class PrimeModule { }
