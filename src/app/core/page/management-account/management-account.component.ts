import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { localStorageKey } from '@config/localStorageKey';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { PartnerService } from '../partner/partner.service';
import { ManagementAccountService } from './management-account.service';

@Component({
  selector: 'app-management-account',
  templateUrl: './management-account.component.html',
  styleUrl: './management-account.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ManagementAccountComponent {
  users:any[] = []
  visible: boolean = false;

  formUpdate!: FormGroup
  constructor(private readonly router: Router,private managementAccountService:ManagementAccountService,private confirmationService: ConfirmationService,private appComponent:AppComponent){

    if(this.GetUserType() === "ADMIN"){
      managementAccountService.getUser().subscribe(response => {
        this.users = (response.responseDatas)
      })
    }
    else{
      this.router.navigate(['/home']).then(() => {

      })
    }


  }
  ngOnInit() {
    this.formUpdate = new FormGroup({
      username: new FormControl<string | null>(null),
      firstName: new FormControl<string | null>(null),
      lastName: new FormControl<string | null>(null),
      email: new FormControl<string | null>(null),
      birthDay: new FormControl<string | null>(null),
      phoneNumber: new FormControl<string | null>(null),
      active: new FormControl<boolean | null>(null),
    });
}
stateOptions: any[] = [
  { label: 'ปิด', value: false },
  { label: 'เปิด', value: true }
];
update(id: number) {

  console.log(id)

  if(id === 0){
    this.confirm(id,"add",this.formUpdate.value)
  }else if(id > 0){
    this.confirm(id,"edit",this.formUpdate.value)
  }

}

userId?:number
create:boolean = false
showDialog(id: number) {
  this.visible = true;
  this.userId = id
  const element = this.users.find(el => el.id === id);
  console.log(element)
  if (element) {
    this.create = false
    this.formUpdate.patchValue({
      username: element.username,
      firstName: element.firstName,
      lastName: element.lastName,
      email: element.email,
      birthDay: element.birthDay,
      phoneNumber: element.phoneNumber,
      active: true
    });

  }else{
    this.create = true
    console.log(this.visible)
    this.formUpdate.patchValue({
      partnerId: this.GetUserId(),
      status: true
    })

  }
}
  confirm(id:number,action:string,payload?:string) {
    let text = "";
    let box = "";

    this.confirmationService.confirm({
        header: 'การยืนยัน',
        message: 'โปรดยืนยันเพื่อดำเนินการต่อไป.',
        acceptIcon: 'pi pi-check mr-2',
        rejectIcon: 'pi pi-times mr-2',
        rejectButtonStyleClass: 'p-button-sm',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          if(action === "delete"){
            text = "ลบรายการสำเร็จ"
            box = "คุณได้ยืนยันการลบรายการสำเร็จ"
            this.confirmDelete(id)
          }else if(action === "edit"){
            text = "บันทึกรายกายสำเร็จ"
            box = "คุณได้ยืนยันการบันทึกรายการสำเร็จ"
           this.confirmUpdate(id,payload)
          }else if(action === "add"){
            text = "สร้างรายกายสำเร็จ"
            box = "คุณได้ยืนยันการสร้างรายการสำเร็จ"
           this.confirmUpdate(id,payload)
          }
          this.appComponent.show('success',text, box,true);

            // this.messageService.add({ severity: 'info', summary: text, detail: box, life: 3000 });
        },
        reject: () => {
          this.appComponent.show('info','ยกเลิก','คุณได้ยกเลิกรายการเรียบร้อย',true);
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

  Approve(item:boolean){
    if(!item)
      return "รอการยืน"
    else
    return "เปิดใช้งาน"
  }

  GetUserId(){
    const userProfileString = localStorage.getItem(localStorageKey.profile)
    const profile = JSON.parse(userProfileString!)
    return profile.id
  }

  GetUserType(){
    const userProfileString = localStorage.getItem(localStorageKey.profile)
    const profile = JSON.parse(userProfileString!)
    return profile.userType
  }

  confirmUpdate(id:number,payload:any){
  const  item = {
    username: payload.username,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    birthDay: payload.birthDay,
    phoneNumber: payload.phoneNumber,
    active: payload.active ? 1 : 0
    }


  this.managementAccountService.Upsert(id,item).subscribe(response => {
    if(response.responseCode === 200){
      console.log(response)
    }
  })

}

  confirmDelete(id:number){
    this.managementAccountService.Delete(id).subscribe(response => {
      if(response.responseCode === 200){

      }
    })
  }
}
