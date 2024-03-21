import { Component } from '@angular/core';
import { localStorageKey } from '@config/localStorageKey';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userProfile: string | null

  constructor() {
    this.userProfile = localStorage.getItem(localStorageKey.profile)
  }
}
