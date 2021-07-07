import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TopicsService } from 'src/app/core/services/topics.service';
import { DetailsEntreprisesComponent } from '../../entreprises/details-entreprises/details-entreprises.component';

@Component({
  selector: 'app-entreprise-topics',
  templateUrl: './entreprise-topics.component.html',
  styleUrls: ['./entreprise-topics.component.scss']
})
export class EntrepriseTopicsComponent implements OnInit {
  topics:any;
  company:any;
  constructor(private topicsService:TopicsService,private router: Router,public dialogRef: MatDialogRef<EntrepriseTopicsComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit(): void {
    this.company=this.data.company;
    this.getTopics(this.company._id);
    };

  cancel(){
    this.dialogRef.close();
  }

  voirTopics(){
    this.router.navigate(['/campagnes']);
    this.cancel();
  }

  getTopics(companyId){

    this.topicsService.getTopicsByCompany(companyId).subscribe(
      (res)=>{
        this.topics=res;
      }
    ),err=>{console.log(err)}
  }

} 
