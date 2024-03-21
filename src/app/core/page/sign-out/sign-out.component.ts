import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { localStorageKey } from '@config/localStorageKey';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent {
  constructor(private readonly router: Router){

  }

  ngOnInit(){
    this.router.navigate(['/home']).then(() => {

      localStorage.removeItem(localStorageKey.profile)
      localStorage.removeItem(localStorageKey.token)
      window.location.reload();
    });
  }
}
