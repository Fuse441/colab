import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PrimeModule } from '@module/prime.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@module/material.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [FormsModule,
    CommonModule,
    HomeRoutingModule,
    PrimeModule,
    MaterialModule
  ]
})
export class HomeModule { }
