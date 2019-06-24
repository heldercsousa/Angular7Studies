import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup; //overall, a form is a FormGroup

  ngOnInit() {
    //property is wrapped up with cotation mark just to be safe it will be kept like this when minification runs
    //it might not be necessary depending on the case
    //userData now contains the overall form. So inputs now are nested inside it
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username' : new FormControl(null, Validators.required),
        'email' : new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender' : new FormControl('male')
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
