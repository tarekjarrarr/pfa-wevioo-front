import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/User.model';

export const credentialsKey = 'jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  helper = new JwtHelperService();
  
  constructor(@Inject(PLATFORM_ID) private platformId: any,
              private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
      if (savedCredentials) {
        this._credentials = savedCredentials;
      }
    }
  }

  get credentials(): string | null {
    return this._credentials;
  }

  private _credentials: string | null;

  isAuthenticated(): boolean {
    return !!this.credentials && !this.helper.isTokenExpired(this.credentials);
  }

  public setCredentials(credentials?: string, remember?: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      this._credentials = credentials || null;

      if (credentials) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(credentialsKey, credentials);
      } else {
        sessionStorage.removeItem(credentialsKey);
        localStorage.removeItem(credentialsKey);
      }
    }
  }

  get currentUser(){
    return this.helper.decodeToken(this.credentials);
  }

  login(email: string, password: string): Promise<any> {
    const body = {
      email,
      password
    }
    return this.http.post(`${environment.BASE_URL}/api/users/auth/login`, body).toPromise();
  }

  get role(){
    return this.helper.decodeToken(this.credentials).role;
  }

  logout() {
    this.setCredentials();
  }

  

}
