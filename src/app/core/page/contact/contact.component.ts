import { ContactService } from './contact.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  Code?:string;
  formContact!: FormGroup;
  inputCode?:string = "";
  constructor(private contactService:ContactService){
    this.Code = Math.random().toString(36).slice(2)
  }

  ngOnInit() {
    this.formContact = new FormGroup({
      firstName: new FormControl<string | null>(null),
      lastName: new FormControl<string | null>(null),
      email: new FormControl<string | null>(null),
      msg: new FormControl<string | null>(null),
      code: new FormControl<string | null>(null)
    });
}

Send(){
  console.log(this.formContact.value)
  console.log(this.inputCode)
  const box = {
    firstName: this.formContact.get('firstName')?.value,
    lastName: this.formContact.get("lastName")?.value,
    email: this.formContact.get("email")?.value,
    msg: this.formContact.get("msg")?.value,
  }

  this.contactService.SendMail(box).subscribe(response => {
    console.log(response)
  })
}
}
