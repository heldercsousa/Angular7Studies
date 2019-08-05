import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return; 
    }

    const email = form.value.email;
    const password = form.value.password;
    
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    
    authObs = this.authService.login(email, password);

    authObs.subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, error => {
      console.log(error);
      this.error = "ocorreu um erro";
      this.isLoading = false;
    });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
