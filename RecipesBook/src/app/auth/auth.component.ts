import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
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
      this.showErrorAlert(error);
      this.isLoading = false;
    });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  // that´s not the right way, but instead it´s just a second approach. Consider using ngIf approach sinc it´s way simplier
  private showErrorAlert(message: string) {
    // dinamically create our component
    // const alertComp = new AlertComponent(); wrong way to create, cause it will not be an angular component
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent); // right way, cause it´s created by Angular
    // create a concrete component
    this.alertHost.viewContainerRef.clear(); // clear all angular compoenents that had been using it
    const componentRef = this.alertHost.viewContainerRef.createComponent(alertCompFactory); // finally creates the comp
    // componentRef.instance gives us access to the concrete instance created here
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      this.alertHost.viewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
