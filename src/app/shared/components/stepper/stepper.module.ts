import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeModule } from '@module/prime.module';


import { MaterialModule } from '@module/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { StepperComponent } from './stepper.component';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [
    StepperComponent
  ],exports:[StepperComponent],
  imports: [FormsModule,
    CommonModule,
    PrimeModule,
    MaterialModule,
    ReactiveFormsModule
  ],providers:[MessageService]
})
export class SteppersModule { }
