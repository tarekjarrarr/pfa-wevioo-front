import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private http: HttpClient) {
  }

  addUser(user: User): Promise<any> {
    return this.http.post(`${environment.BASE_URL}/api/users/auth/register`,user).toPromise()
  }

  getAllUsers():Promise<any>{
    return this.http.get(`${environment.BASE_URL}/api/users/all`).toPromise();
  }

  getAuthenticatedUser():Promise<any>{
    return this.http.get(`${environment.BASE_URL}/api/users/me`).toPromise();
  }

  getUserStats():Promise<any>{
    return this.http.get(`${environment.BASE_URL}/api/users/stats`).toPromise();
  }

  getUser(id:String):Promise<User>{
    return this.http.get(`${environment.BASE_URL}/api/users/user/${id}`).toPromise();
  }

  editUser(id:String,user:User):Promise<any>{
    return this.http.patch(`${environment.BASE_URL}/api/users/user/${id}`,{user}).toPromise();
  }

  changePassword(id:String,password:String):Promise<any>{
    return this.http.post(`${environment.BASE_URL}/api/users/user/password/${id}`,{password}).toPromise();
  }

  deleteUser(id:String):Promise<any>{
    return this.http.delete(`${environment.BASE_URL}/api/users/user/${id}`).toPromise()
  }



}
