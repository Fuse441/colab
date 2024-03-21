import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeModule } from '@module/prime.module';

import { SignOutRoutingModule } from './sign-out-routing.module';
import { MaterialModule } from '@module/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SignOutComponent } from './sign-out.component';
@NgModule({
  declarations: [
    SignOutComponent
  ],
  imports: [FormsModule,
    CommonModule,
    SignOutRoutingModule,
    PrimeModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SignOutModule { }
