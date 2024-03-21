import { CommonModule } from '@angular/common';

import { Routes } from "@angular/router";
import { AuthenGuard } from "@core/guard/authen-guard.guard";

export const navigationRoutes: Routes = [
  {
    path: 'home',

    loadChildren: () => import(`../../core/page/home/home.module`).then(m => m.HomeModule),
  },{
    path: 'login',

    loadChildren: () => import(`../../core/page/login/login.module`).then(m => m.LoginModule),
  },{
    path: 'contact',

    loadChildren: () => import(`../../core/page/contact/contact.module`).then(m => m.ContactModule),
  },{
    path: 'profile',

    loadChildren: () => import(`../../core/page/profile/profile.module`).then(m => m.ProfileModule),
  },{
    path: 'sign_out',

    loadChildren: () => import(`../../core/page/sign-out/sign-out.module`).then(m => m.SignOutModule),
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
