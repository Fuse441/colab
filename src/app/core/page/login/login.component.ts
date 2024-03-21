import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AES, enc, mode, pad} from 'crypto-js';
import { LoginService } from './login.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { localStorageKey } from '@config/localStorageKey';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formGroup!: FormGroup
  username:string | undefined;
  password:string | undefined;
  constructor(private loginService: LoginService,private readonly router: Router){

  }
  ngOnInit() {
      this.formGroup = new FormGroup({
        username: new FormControl<string | null>(null),
        password: new FormControl<string | null>(null)
      });
  }
  encrypt(username: string, password: string): { username: string, password: string } {
    const key = 'MEUnb6TwJ2gfSu2GUQ2vfw==';
    const iv: Uint8Array = new Uint8Array(16);

    const encryptedLoginName = AES.encrypt(username, enc.Utf8.parse(key), {
      iv: enc.Hex.parse(this.ivToHexString(iv)),
      mode: mode.CBC,
      padding: pad.Pkcs7,
    });

    const encryptedPassword = AES.encrypt(password, enc.Utf8.parse(key), {
      iv: enc.Hex.parse(this.ivToHexString(iv)),
      mode: mode.CBC,
      padding: pad.Pkcs7,
    });

    // Assuming you want to return both encrypted values
    return {
      username: encryptedLoginName.toString(),
      password: encryptedPassword.toString(),
    };
  }

  ivToHexString(iv: Uint8Array): string {
    return Array.from(iv, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  login(){
    if (this.formGroup.valid) {
      const encrypt = this.encrypt(
        this.formGroup?.get('username')?.value,
        this.formGroup.get('password')?.value
      );

      this.loginService.login(encrypt)
  .pipe(take(1))
  .subscribe(
    (response) => {
      console.log(response);
      this.router.navigate(['/home']).then(() => {

        localStorage.setItem(localStorageKey.token,response.responseDatas.jwt)
        localStorage.setItem(localStorageKey.profile,JSON.stringify(response.responseDatas.userProfile))
        window.location.reload();
      });
    },
    (error) => {
      console.error('Error:', error);
      // Handle error here
    }
  );

  }
    }
  }

