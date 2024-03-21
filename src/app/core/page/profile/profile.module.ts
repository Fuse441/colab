import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeModule } from '@module/prime.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { MaterialModule } from '@module/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [FormsModule,
    CommonModule,
    ProfileRoutingModule,
    PrimeModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
