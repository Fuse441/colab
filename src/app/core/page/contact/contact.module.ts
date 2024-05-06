import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from '@module/prime.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@module/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [FormsModule,
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    PrimeModule,
    FormsModule,
    MaterialModule
  ]
})
export class ContactModule { }
