import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementAccountComponent } from './management-account.component';



const routes: Routes = [
  { path: '', component: ManagementAccountComponent },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementAccountRoutingModule { }
