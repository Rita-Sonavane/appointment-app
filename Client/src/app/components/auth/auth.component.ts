import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from 'src/app/selectors/auth.selectors';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  currentFormMode: 'login' | 'register' = 'login';
  registerForm: FormGroup | any;
  loginForm: FormGroup | any;

  constructor(private fb: FormBuilder, private store: Store, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.store.select(selectIsAuthenticated).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['home/list']);
      }
    });


    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  changeFormMode(mode: 'login' | 'register') {
    this.currentFormMode = mode;
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    if (this.loginForm.valid) {
      console.log("Submitting form with values", this.loginForm.value);

      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Sign in successful', response);

          Swal.fire({
            title: 'Success',
            text: 'Login successful',
            icon: 'success',
            timer: 1000, // Automatically close after 2 seconds
            showConfirmButton: false // Hide the confirm button
          }).then(() => {
            this.router.navigate(['home/list']);
          });
        },
        (error) => {
          console.log(error);

          let title = 'Error';
          let text = 'Something went wrong. Please try again later.';

          if (error.status === 401 && error.error.message === 'Invalid credentials') {
            text = 'Invalid email or password. Please try again.';
          } else if (error.status === 404 && error.error.message === 'User not found') {
            text = 'No account found with this email. Please check your email and try again.';
          }

          Swal.fire({
            title: title,
            text: text,
            icon: 'error',
            timer: 2000,
            showConfirmButton: false
          });
        }
      );
    }
  }

  onRegistersubmit(): void {
    console.log("Inside Register", this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        console.log('Sign up successful', response);

        Swal.fire({
          title: 'Success',
          text: 'You have signed up successfully',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        }).then(() => {
          // this.resetForm();
          this.changeFormMode('login');
        });

      },
      (error) => {
        console.log(error);

        let title = 'Error';
        let text = 'Something went wrong. Please try again later.';

        if (error.status === 409 && error.error.message === 'Email already exists') {
          text = 'The email address is already in use. Please use a different email.';
        }

        Swal.fire({
          title: title,
          text: text,
          icon: 'error',
          timer: 1000,
          showConfirmButton: false
        });
      }
    );
  }

}
