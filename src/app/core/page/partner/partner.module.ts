import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeModule } from '@module/prime.module';


import { MaterialModule } from '@module/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PartnerComponent } from './partner.component';
import { PartnerRoutingModule } from './partner-routing.module';
@NgModule({
  declarations: [
    PartnerComponent
  ],
  imports: [FormsModule,
    CommonModule,
    PrimeModule,
    MaterialModule,
    ReactiveFormsModule,
    PartnerRoutingModule
  ]
})
export class PartnerModule { }
