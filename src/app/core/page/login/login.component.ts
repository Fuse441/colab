import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formGroup!: FormGroup
  username:string | undefined;
  password:string | undefined;

  ngOnInit() {
      this.formGroup = new FormGroup({
        username: new FormControl<string | null>(null),
        password: new FormControl<string | null>(null)
      });
  }
}
