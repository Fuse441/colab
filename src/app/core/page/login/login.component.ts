import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AES, enc, mode, pad} from 'crypto-js';
import { LoginService } from './login.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { localStorageKey } from '@config/localStorageKey';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formGroup!: FormGroup
  username:string | undefined;
  password:string | undefined;
  register: boolean = false
  formRegister!: FormGroup
  constructor(private loginService: LoginService,private readonly router: Router,private appComponent:AppComponent){

  }
  OpenRegister(){
    this.register = !this.register
    console.log(this.register)
    return this.register
  }
  stateOptions: any[] = [
    { label: 'ผู้ร่วมลงทุน', value: "PARTNER" },
    { label: 'ผู้ใช้งานทั่วไป', value: "USER" }
];
  ngOnInit() {


      this.formGroup = new FormGroup({
        username: new FormControl<string | null>(null),
        password: new FormControl<string | null>(null)
      });

      this.formRegister = new FormGroup({
        username: new FormControl<string | null>(null),
        password:new FormControl<string | null>(null),
        firstName: new FormControl<string | null>(null),
        lastName: new FormControl<string | null>(null),
        email: new FormControl<string | null>(null),
        birthDay: new FormControl<string | null>(null),
        phoneNumber: new FormControl<string | null>(null),
        active: new FormControl<boolean | null>(null),
        userType: new FormControl<string | null>(null)
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
  registerUser(id:number){
    let getActive = 1
    if(this.formRegister.get("userType")?.value === "PARTNER"){
      getActive = 0
    }

    const  item = {
      username: this.formRegister.get("username")?.value,
      password: this.formRegister.get("password")?.value,
      firstName: this.formRegister.get("firstName")?.value,
      lastName: this.formRegister.get("lastName")?.value,
      email: this.formRegister.get("email")?.value,
      birthDay: this.formRegister.get("birthDay")?.value,
      phoneNumber: this.formRegister.get("phoneNumber")?.value,
      userType:this.formRegister.get("userType")?.value,
      active: getActive,


      }


    this.loginService.Upsert(id,item).subscribe(response => {
      if(response.responseCode === 404 && response.responseDatas === 0){
        this.appComponent.show("error","ชื่อผู้ใช้งานซ้ำ","กรุณาลองใหม่อีกครั้ง",false)
      }
      else if(response.responseCode === 200){
        this.appComponent.show("success","สมัครสมาชิกสำเร็จ","ลองเข้าสู่ระบบเพื่อใช้ หากมีปัญหาติดต่อแอดมิน",true)
        this.register = false
      }
    })
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

