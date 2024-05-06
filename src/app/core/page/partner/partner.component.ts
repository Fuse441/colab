import { spaceDetails } from './../../../shared/config/card/spaceDetails';


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { localStorageKey } from '@config/localStorageKey';
import { PartnerService } from './partner.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppService } from 'src/app/app.service';
import { AppComponent } from 'src/app/app.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';


@Component({
  selector: 'app-partner',

  templateUrl: './partner.component.html',
  styleUrl: './partner.component.scss',
  providers: [ConfirmationService, MessageService]
})


export class PartnerComponent {
  space:any[] = []
  visible: boolean = false;

  formUpdate!: FormGroup
  constructor(private readonly router: Router,private parterService:PartnerService,private confirmationService: ConfirmationService,private appComponent:AppComponent){

    if(this.GetUserType() === "PARTNER"){
      console.log(this.GetUserType())
      parterService.getSpace(this.GetUserId()).subscribe(response => {
        this.space = (response.responseDatas)
      })
    }else if(this.GetUserType() === "ADMIN"){
      parterService.getSpaceAll().subscribe(response => {
        this.space = (response.responseDatas)
      })
    }
    else{
      this.router.navigate(['/home']).then(() => {

      })
    }


  }
  ngOnInit() {
    this.formUpdate = new FormGroup({
      spaceName: new FormControl<string | null>(null),
      spaceDescription: new FormControl<string | null>(null),
      spaceType: new FormControl<string | null>(null),
      spaceDetails: new FormControl<string | null>(null),
      price: new FormControl<number | null>(null),
      location: new FormControl<string | null>(null),
      amenities: new FormControl<string | null>(null),
      capacity: new FormControl<string | null>(null),
      partnerId: new FormControl<number | null>(null),
      status: new FormControl<boolean | null>(null),
      image: new FormControl<string | null>(null)
    });
}

update(id: number) {
  const priceValue = Number(this.formUpdate.get("price")?.value); // แปลงค่าเป็นตัวเลข
  const locationValue = this.formUpdate.get("location")?.value;
  const amenitiesString  = (this.formUpdate.get("amenities")?.value); // สมมติว่านี่เป็น array หรือสตริง
  const capacityValue = Number(this.formUpdate.get("capacity")?.value); // แปลงค่าเป็นตัวเลข

  const amenitiesValue = amenitiesString ? amenitiesString.split(',').map((item: string) => item.trim()) : [];

  const spaceDetailsValue = JSON.stringify({
    price: priceValue,   // ตอนนี้ค่า price เป็นตัวเลข, ไม่ใช่สตริง
    location: locationValue,
    amenities: amenitiesValue,
    capacity: capacityValue
  });

  this.formUpdate.get("spaceDetails")?.setValue(spaceDetailsValue);

  if(id === 0){
    this.confirm(id,"add",this.formUpdate.value)
  }else if(id > 0){
    this.confirm(id,"edit",this.formUpdate.value)
  }

}


create:boolean = false
showDialog(id: number) {
  this.visible = true;

  const element = this.space.find(el => el.spaceId === id);
  console.log(element)
  if (element) {
    this.create = false
    const details = JSON.parse(element.spaceDetails);

    const spaceDetailsValue = JSON.stringify({
      price: details.price,
      location: details.location,
      amenities: details.amenities,
      capacity: details.capacity
    });
    console.log(spaceDetailsValue)
    this.formUpdate.setValue({
      spaceName: element.spaceName,
      spaceDescription: element.spaceDescription,
      spaceType: element.spaceType,
      price: details.price,
      location: details.location,
      amenities: details.amenities,
      capacity: details.capacity,
      spaceDetails: spaceDetailsValue,
      image: element.image,
      partnerId: element.partnerId,
      status: true
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
          this.appComponent.show('success',text, box);

            // this.messageService.add({ severity: 'info', summary: text, detail: box, life: 3000 });
        },
        reject: () => {
          this.appComponent.show('info','ยกเลิก','คุณได้ยกเลิกรายการเรียบร้อย');
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
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
      spaceName:payload.spaceName,
      spaceDescription:payload.spaceDescription,
      spaceType:payload.spaceType,
      spaceDetails:payload.spaceDetails,
      partnerId:payload.partnerId,
      image:payload.image,
      status:payload.status
    }
if(id === 0 ){
  this.parterService.Create(id,item).subscribe(response => {
    if(response.responseCode === 200){
      console.log(response)
    }
  })
}
else{
  this.parterService.Update(id,item).subscribe(response => {
    if(response.responseCode === 200){
      console.log(response)
    }
  })
}
}

  confirmDelete(id:number){
    this.parterService.deleteSpace(id).subscribe(response => {
      if(response.responseCode === 200){

      }
    })
  }
}
