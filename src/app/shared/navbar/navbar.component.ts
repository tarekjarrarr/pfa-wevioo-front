import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from 'src/app/core/models/User.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser:User;

  constructor(private authenticationService: AuthenticationService,private router:Router) {
    this.currentUser=this.authenticationService.currentUser;
    }

  ngOnInit(): void {
    
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate  (['/login']);
  }

  visitProfile(){}

  editProfile(){}
}
