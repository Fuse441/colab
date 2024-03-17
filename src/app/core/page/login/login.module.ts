import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeModule } from '@module/prime.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from '@module/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [FormsModule,
    CommonModule,
    LoginRoutingModule,
    PrimeModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
