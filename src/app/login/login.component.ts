import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formbuilder: FormBuilder, private auth: AuthService) {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login(event:any) {
    let email = this.loginForm.controls.email.value;
    let pwd = this.loginForm.controls.password.value;

    return this.auth.signInWithEmail(email, pwd);
  }

  loginWithGithub(event: any) {
    return this.auth.signInOrLinkGithub();
  }

}
