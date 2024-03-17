import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { PanelModule } from 'primeng/panel';
const modules = [
  PanelModule,
  ButtonModule,
  FormsModule,
  InputTextModule,
  ChipsModule,
  MenubarModule,
  GalleriaModule,
  CardModule,
  PasswordModule
];


@NgModule({


  imports: modules,

  exports: modules

})
export class PrimeModule { }
