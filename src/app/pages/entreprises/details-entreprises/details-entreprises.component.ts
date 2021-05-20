import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EntrepriseTopicsComponent } from '../../topics/entreprise-topics/entreprise-topics.component';
import { AffectTopicDialogComponent } from '../affect-topic-dialog/affect-topic-dialog.component';

@Component({
  selector: 'app-details-entreprises',
  templateUrl: './details-entreprises.component.html',
  styleUrls: ['./details-entreprises.component.scss']
})
export class DetailsEntreprisesComponent implements OnInit {
  entrepriseId="eaderr145"
  entreprise={
    id:"eaderr145",
    name:"Exemple d'entreprise",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    industry:"information technology",
    location:"Tunis",
    size:"11-50",
    type:"public company",
    age:"29",
    specialties:["data science","IT"]
  }

  newTopicId: string;
  profiles= false;

 
 

  constructor(private router:Router,public dialog: MatDialog,private overlay: Overlay) { }  

  ngOnInit(): void {
  }

 
  addToTopic(){
    const dialogRef = this.dialog.open(AffectTopicDialogComponent,{
      width:'600px',
      data:{entreprise:this.entreprise,topicId:this.newTopicId}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      });
    }

    showTopics(){
    let config:MatDialogConfig={
      width:'600px',
    data:{entreprise:this.entreprise}};

      const dialogRef = this.dialog.open(EntrepriseTopicsComponent,
        config);
    
      dialogRef.afterClosed().subscribe(result => {
       // console.log(result);
        });
    }

    showProfiles(){
      this.router.navigate(['/profiles/liste'])
    }

  }
  

