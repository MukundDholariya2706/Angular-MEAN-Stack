import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  // isResultsLoading= false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {}

  private initForm(){
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }
}
