import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm :FormGroup= this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  error: string;
  isLoading: boolean;

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private titleService: Title) { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  login() {
    this.isLoading = true;
    this.loginForm.disable();
    this.authenticationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then((accessToken) => {
        this.authenticationService.setCredentials(accessToken.token, this.loginForm.get('remember').value);
        this.router.navigate(['/']).then(() => {
          // tslint:disable-next-line:no-console
          console.log('Login successful: Redirecting...');
          // tslint:disable-next-line:no-console
          console.clear();
        });
      }).catch(() => {
        this.error = 'Votre email ou votre mot de passe sont invalides.';
        this.loginForm.enable();
        this.loginForm.get('password').reset();
        this.isLoading = false;
    });
  }

}
