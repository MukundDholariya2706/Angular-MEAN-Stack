import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtService } from './../core/services/jwt.service';
import { AuthService } from './../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  title = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jetService: JwtService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  get f() {
    return this.authForm.controls;
  }

  ngOnInit(): void {
    this.createForm();
    this.title = this.router.url === '/login' ? 'Login' : 'Signup';
  }

  onSubmit() {
    if (this.title === 'Signup') {
      console.log('Signup Process');
      this.authService.signup(this.authForm.value).subscribe(
        (data) => {
          this.router.navigate(['/login']);
          this._snackBar.open('Signup Successfully!', 'Success');
        },
        (err) => this.errorHandler(err, 'Opps, something went worng')
      );
    } else {
      this.authService.login(this.authForm.value).subscribe(
        (data) => {
          console.log('data :>> ', data);
          this.jetService.setToken(data.token);
          this.router.navigate(['/dashbord/invoices']);
        },
        (err) => this.errorHandler(err, 'Opps, something went worng')
      );
    }
  }

  private createForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private errorHandler(error: any, message: any) {
    console.error(error);
    this._snackBar.open(message, 'Error', {
      duration: 2000,
    });
  }
}
