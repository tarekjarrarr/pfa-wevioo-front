import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from 'src/app/core/models/User.model';
import { UsersService } from 'src/app/core/services/users.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   currentUser:User;
   loading = false;
  userStats: number;
  constructor(private router: Router,private authenticationService: AuthenticationService,private usersService:UsersService) { }


  ngOnInit(): void {
    this.getCurrentUser();
    this.getStats();
  }

  

  public doughnutChartLabels: Label[] = ['industries', 'IT', 'Banque / Assurance'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  goSearch(){
    this.router.navigate(['entreprises/recherche']);
  }

  goRecommandation(){
    this.router.navigate(['entreprises/recommandation']);
  }

  goTopics(){
    this.router.navigate(['campagnes']);
  }

  getCurrentUser(){
    this.loading=true;
    this.usersService.getUser(this.authenticationService.currentUser._id).then(
      res=>{
        this.currentUser=res;
      }
    ).catch(error=>{console.log(error)}).finally(()=>this.loading=false)
  }

  getStats() {
    this.loading=true;
    this.usersService.getUserStats().then(
      res=>{
        this.userStats=res;
      }
    ).catch(error=>{console.log(error)}).finally(()=>this.loading=false);

  }

}
