import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from './profile.service';
import { localStorageKey } from '@config/localStorageKey';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: string | null;
  item: any;
  formUpdate!: FormGroup;

  constructor(private profileService: ProfileService) {
    this.userProfile = localStorage.getItem(localStorageKey.profile);
  }

  ngOnInit() {
    this.formUpdate = new FormGroup({
      username: new FormControl<string | null>(null),
      firstName: new FormControl<string | null>(null),
      lastName: new FormControl<string | null>(null),
      email: new FormControl<string | null>(null),
      birthDay: new FormControl<string | null>(null),
      phoneNumber: new FormControl<string | null>(null),
      active: new FormControl(1),
    });

    this.profileService.GetUserById(this.GetUserId()).subscribe(response => {
      this.item = response.responseDatas;
      console.log(this.item.username); // Ensure data is there
      this.setValue(); // Set form values here
    });
  }

  GetUserId() {
    const userProfileString = localStorage.getItem(localStorageKey.profile);
    const profile = JSON.parse(userProfileString!);
    return profile.id;
  }

  setValue() {
    this.formUpdate.patchValue({
      username: this.item.username,
      firstName: this.item.firstName,
      lastName: this.item.lastName,
      email: this.item.email,
      birthDay: this.item.birthDay,

      phoneNumber: this.item.phoneNumber
    });
  }

  Update(){
    this.profileService.Update(this.GetUserId(),this.formUpdate.value).subscribe(response =>{
      console.log(response)
    })
  }
}
