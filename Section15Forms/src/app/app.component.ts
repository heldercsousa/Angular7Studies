import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', { static: false}) signupForm: NgForm; //alternative approach to onSubmit(form: NgForm)
  defaultQuestion = 'pet';
  answer = "";
  genders = ['male', 'female'];
  user = { usernm: '', mail:'', secret: '', answer: '', gender: '' };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    //setValue allows to set the value of the role form
    //this isnt the best approach
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: 'heldercsousa@gmail.com'
    //   },
    //   secret: 'teacher',
    //   questionAnswer: 'Question ueinn',
    //   gender: 'male'
    // });
    //patchValue is the best approach, since it doesnt override all params like in previous one
    //it´s available only on form property
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    this.submitted=true; 
    this.user.usernm = this.signupForm.value.userData.username;
    this.user.mail = this.signupForm.value.userData.email;
    this.user.secret = this.signupForm.value.secret;
    this.user.gender = this.signupForm.value.gender;  
    this.user.answer = this.signupForm.value.questionAnswer;
  }
}
