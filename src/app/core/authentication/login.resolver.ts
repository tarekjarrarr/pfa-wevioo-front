import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Resolve, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginResolver implements Resolve<any>{

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  resolve(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

}
