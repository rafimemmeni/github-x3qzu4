import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  [x: string]: any;
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private userService: UserService,
    private alertService: AlertService,private router: Router) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required]
    });
}
onSubmit() {
  this.submitted = true;

  // reset alerts on submit
  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }
  this.loading = true;
  this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
          data => {
             // this.alertService.success('Registration successful', true);
              this.router.navigate(['/']);
          },
          error => {
            //this.router.navigate(['/']);
             //this.alertService.error(error);
              this.loading = false;
          });
}
}

