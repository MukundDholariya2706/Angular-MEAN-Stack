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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jetService: JwtService,
    private router: Router
  ) {}

  get f() {
    return this.authForm.controls;
  }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit() {
    this.authService.login(this.authForm.value).subscribe(
      (data) => {
        console.log('data :>> ', data);
        this.jetService.setToken(data.token);
        this.router.navigate(['/dashbord/invoices']);
      },
      (err) => console.error(err)
    );
  }

  private createForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
