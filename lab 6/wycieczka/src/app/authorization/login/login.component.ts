import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private auth: AuthService) { }

  loginForm = new FormGroup({
    email: new FormControl('', 
    [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('',
    [ Validators.required ]),
  });

  onSubmit() {
    if (this.loginForm.valid){
      let email = this.loginForm.get('email')!.value;
      let password = this.loginForm.get('password')!.value;

      this.auth.logIn(email, password);
      this.loginForm.reset();
    }
  }
}
