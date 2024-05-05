import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeModule } from '@module/prime.module';

import { MaterialModule } from '@module/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message.component';
@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [FormsModule,
    CommonModule,
    PrimeModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[MessageComponent]
})
export class MessageModule { }
