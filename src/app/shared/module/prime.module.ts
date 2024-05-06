import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';
import { AutoFocusModule } from 'primeng/autofocus';
import { TagModule } from 'primeng/tag';
const modules = [
  TagModule,
  AutoFocusModule,
  RatingModule,
  ConfirmDialogModule,
  DataViewModule,
  SelectButtonModule,
  RippleModule,
  ToastModule,
  StepperModule,
  CalendarModule,
  DialogModule,
  PaginatorModule,
  InputTextareaModule,
  InputNumberModule,
  OverlayPanelModule,
  CheckboxModule,
  PanelModule,
  ButtonModule,
  FormsModule,
  InputTextModule,
  ChipsModule,
  MenubarModule,
  GalleriaModule,
  CardModule,
  PasswordModule,
  DropdownModule,

];


@NgModule({


  imports: modules,

  exports: modules

})
export class PrimeModule { }
