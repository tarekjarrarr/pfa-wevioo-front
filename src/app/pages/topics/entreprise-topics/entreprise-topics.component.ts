import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetailsEntreprisesComponent } from '../../entreprises/details-entreprises/details-entreprises.component';

@Component({
  selector: 'app-entreprise-topics',
  templateUrl: './entreprise-topics.component.html',
  styleUrls: ['./entreprise-topics.component.scss']
})
export class EntrepriseTopicsComponent implements OnInit {
  topics:any;

  constructor(private router: Router,public dialogRef: MatDialogRef<EntrepriseTopicsComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit(): void {
    this.topics=[
      {title:'Vente produit W',
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      created:'27/02/2020',
      tickets:[
          {id:'1',title:'prise de contact',date:'03/03/2020',addedBy:{name:'Tarek Jarrar'},file:'fichier.txt'},
          {id:'2',title:'reunion business developers',date:'03/03/2020',addedBy:{name:'Tarek Jarrar'},file:'fichier.txt'},
        ]},
      {
      title:'Vente produit Y',
      created:'27/02/2020',
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tickets:[
          {id:'1',title:'envoie de mail',date:'03/03/2020'},
          {id:'2',title:'premiere reunion',date:'03/03/2020'}
        ]}
      
    ]
    };

  cancel(){
    this.dialogRef.close();
  }

  voirTopics(){
    this.router.navigate(['/compagnes']);
    this.cancel();
  }

} 
