import { Component, OnInit } from '@angular/core';
/* import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Role } from '../../core/enums/role.enum'; */

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  routes = [
    {
      label: 'Dashboard',
      link: '',
      icon: 'fa-home',
      children:[]
    },
    {
      label:'entreprises',
      link:'/entreprises',
      icon:'fa-building',
      children:[{
        label: 'recherche',
        link: '/entreprise/recherche'
        },
        {
        label: 'recommendation',
        link: '/entreprise/recommendation'
        }
      ] 
    },
    {
      label:'profils',
      link:'/profils',
      icon:'fa-user-friends',
      children:[]
    },
    {
      label:'topics',
      link:'/topics',
      icon:'fa-briefcase',
      children:[]

    }
  ];
  

 // constructor(private authenticationService: AuthenticationService) { }
  constructor() { }

  ngOnInit(): void {
    // tslint:disable-next-line:no-console
    //console.log(this.authenticationService.role);
  }

  /* get role(): Role {
    return this.authenticationService.role;
  } */

}
