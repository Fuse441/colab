import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@module/material.module';
import { PrimeModule } from '@module/prime.module';
import { ManagementAccountComponent } from './management-account.component';
import { ManagementAccountRoutingModule } from './management-routing.module';



@NgModule({
  declarations: [ManagementAccountComponent],
  imports: [
    FormsModule,
    CommonModule,
    PrimeModule,
    MaterialModule,
    ReactiveFormsModule,
    ManagementAccountRoutingModule
  ]
})
export class ManagementAccountModule { }
