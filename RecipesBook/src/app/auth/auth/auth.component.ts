import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  https://medium.com/@renato.groffe/asp-net-core-2-0-jwt-identity-core-na-autentica%C3%A7%C3%A3o-de-apis-e2a6fab07421
  isLoginMode = true;
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    form.reset();
  }
}
