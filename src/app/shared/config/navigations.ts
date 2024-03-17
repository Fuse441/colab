
import { Routes } from "@angular/router";
import { AuthenGuard } from "@core/guard/authen-guard.guard";

export const navigationRoutes: Routes = [
  {
    path: 'home',

    loadChildren: () => import(`../../core/page/home/home.module`).then(m => m.HomeModule),
  },{
    path: 'login',

    loadChildren: () => import(`../../core/page/login/login.module`).then(m => m.LoginModule),
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
