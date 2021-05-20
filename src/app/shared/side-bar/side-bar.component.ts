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
      link: '/dashboard',
      icon: 'fa-home',
      children:[]
    },
    {
      label:'entreprises',
      link:'#',
      icon:'fa-building',
      children:[{
        label: 'recherche',
        link: '/entreprises/recherche'
        },
        {
        label: 'recommandation',
        link: '/entreprises/recommandation'
        }
      ] 
    },
    {
      label:'topics',
      link:'/compagnes',
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
