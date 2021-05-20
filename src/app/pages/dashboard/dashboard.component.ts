import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {
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
    this.router.navigate(['compagnes']);
  }
}
