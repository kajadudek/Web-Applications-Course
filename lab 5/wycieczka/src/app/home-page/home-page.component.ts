import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  contactForm = new FormGroup({
    name: new FormControl('', 
    [
      Validators.required,
      Validators.pattern("[A-Za-z \p{L}]+"),
    ]),
    email: new FormControl('',
    [
      Validators.required,
      Validators.pattern("[A-Za-z\-\.0-9]+[@]{1}[A-Za-z]+[\.]{1}[a-z]{2,3}")
    ]),
    question: new FormControl('', Validators.required)
  });

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get question() {
    return this.contactForm.get('question');
  }

  onSubmit(): void{
    if (this.contactForm.valid){
      this.contactForm.reset();
    } else {
      
    }
  }

}
