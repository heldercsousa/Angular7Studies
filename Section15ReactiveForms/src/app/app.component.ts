import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup; //overall, a form is a FormGroup
  forbiddenUsernames = ['Chris', 'Anna'];
  ngOnInit() {
    //property is wrapped up with cotation mark just to be safe it will be kept like this when minification runs
    //it might not be necessary depending on the case
    //userData now contains the overall form. So inputs now are nested inside it
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username' : new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), //forbiddenNames.bind(this) is required cause custom validator is been called by Angular when checking this validit. It´s not been called by this class
        'email' : new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender' : new FormControl('male'),
      'hobbies' : new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    //has to be casted to FormArray, otherwise will throw an error
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  ///returns a KeyValuePair. Ex: {nameIsForbidden: true}
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    //this is important cause angular recognize this form control is invalid. 
    //You should not return {'nameIsForbidden': false} cause thats not how Angular works. 
    //This line might be suppressed
    return null; 
  }
}
