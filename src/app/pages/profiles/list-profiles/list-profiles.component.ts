import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-profiles',
  templateUrl: './list-profiles.component.html',
  styleUrls: ['./list-profiles.component.scss']
})
export class ListProfilesComponent implements OnInit {
  company:any;
  profiles:any;


  constructor(private router:Router) {
    this.company={
      id:"1",
      name:"Exemple1",
      industry:"services informatiques",
      size:"5-10",
      location:"Tunis",
      adress:"lac 2 , tunis , tunisie",
      keyWords:['spring','AI','paris'],
      contact:"70000000",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
    this.profiles=[
      {
        fullname:"tarek jarrar",
        post:"CTO",
        email:"tarek@gmail.com",
        adress:"Tunis",
        linkedin:"linkedin.com/tjarrar"
      },
      {
        fullname:"tarek jarrar",
        post:"CEO",
        email:"tarek@gmail.com",
        adress:"Tunis",
        linkedin:"linkedin.com/tjarrar"

      },
      {
        fullname:"tarek jarrar",
        post:"CBO",
        email:"tarek@gmail.com",
        adress:"Tunis",
        linkedin:"linkedin.com/tjarrar"

      }
    ]
   }

  ngOnInit(): void {
  }

  goBackDetails(){
    this.router.navigate(['/entreprises/details']);
  }
}
