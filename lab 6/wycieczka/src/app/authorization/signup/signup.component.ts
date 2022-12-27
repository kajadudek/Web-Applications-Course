import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  constructor(private auth: AuthService) { }

  newAccount = new FormGroup({
    name: new FormControl('',
    [
      Validators.required,
      Validators.email,
    ]),
    email: new FormControl('', 
    [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('',
    [ Validators.required ]),
    confirmPass: new FormControl('',
    [ 
      Validators.required,
      this.confirmPasswordValidator.bind(this)
    ]),
  });

  onSubmit() {
    let name = this.newAccount.get('name')!.value;
    let email = this.newAccount.get('email')!.value;
    let pass = this.newAccount.get('password')!.value;

    if (this.newAccount.valid){
      this.auth.signUp(name, email, pass);

      this.newAccount.reset();
    } else {
      this.auth.signUp(name, email, pass);
    }
  }

  confirmPasswordValidator(control: FormControl) {
    if (!this.newAccount) {
      return null;
    }
    let password = this.newAccount.value.password;
    let confirm = control.value;
    if (password != confirm) {
      return {
        confirmPass: {
          confirmPass: confirm
        }
      };
    }
    return null;
  }
}
