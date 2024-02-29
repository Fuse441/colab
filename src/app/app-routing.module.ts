import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { navigationRoutes } from '@config/navigations';

const routes: Routes = navigationRoutes;

@NgModule({

  imports: [RouterModule.forRoot(navigationRoutes,{useHash: false},)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
