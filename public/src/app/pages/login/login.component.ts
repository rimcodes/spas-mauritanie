import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are worng!';
  showPass = false;

  constructor(
      private formBuilder: FormBuilder,
      private auth: AuthService,
      private localstorageService: LocalstorageService,
      private router: Router
  ) {}

  ngOnInit(): void {
      this._initLoginForm();
  }

  onSubmit() {
      this.isSubmitted = true;

      if (this.logInFormGroup.invalid) return;

      this.auth
          .login(this.loginForm['code'].value, this.loginForm['password'].value)
          .subscribe(
              (user) => {
                  this.authError = false;
                  this.localstorageService.setToken(user.token);
                  this.localstorageService.setUserId(user.id);

                  this.router.navigate(['/']);
              },
              (err) => {
                  if (+err.status > 400) {
                      this.authMessage =
                          'We are sorry, there seems to be something wrong! Try again later.';
                  }
                  this.authError = true;
              }
          );
  }

  showPassword() {
    this.showPass = !this.showPass;
  }

  private _initLoginForm() {
      // ...
      this.logInFormGroup = this.formBuilder.group({
          code: ['', [Validators.required]],
          password: ['', Validators.required]
      });
  }

  get loginForm() {
      return this.logInFormGroup.controls;
  }

}
