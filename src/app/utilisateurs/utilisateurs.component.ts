import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { UsersService } from '../core/services/users.service';
import * as moment from 'moment';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {

  formUser: FormGroup = this.formBuilder.group({
    fullname: new FormControl('', [Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    position:new FormControl(''),
    phone:new FormControl(''),
    dateOfBirth:new FormControl(''),
  });

  
  error: string;
  isLoading: boolean;

  constructor(private router:Router,private toastr:ToastrService ,private usersService:UsersService, private formBuilder:FormBuilder) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
   }

  ngOnInit(): void {
    this.isLoading = false;
  }

  addUser(){
      this.isLoading = true;
      this.formUser.disable();
      console.log(this.formUser.value)
      this.usersService.addUser(this.formUser.value)
        .then((res) => {
          this.toastr.success("user added successfully")
          this.router.navigate(['/']).then(() => {
            // tslint:disable-next-line:no-console
            console.log('Login successful: Redirecting...');
            // tslint:disable-next-line:no-console
            console.clear();
          });
        }).catch(() => {
          this.toastr.error("user couldn't be added")
          this.formUser.enable();
          this.formUser.reset();
          this.isLoading = false;
      });
    
  }
}
