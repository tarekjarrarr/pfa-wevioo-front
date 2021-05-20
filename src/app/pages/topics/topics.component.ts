import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { TopicsService } from 'src/app/core/services/topics.service';
import { AddTopicComponent } from './add-topic/add-topic.component';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {


  panelOpenState = false;
  selected=null;
  topics=[];
  selectedTopic:any;

  constructor(private router:Router,private topicsService:TopicsService,public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.topics= [
      {id:'1',
      title:'Vente produit X',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      created:'27/02/2020',
      modified:'30/02/2020',
      start:'01/03/2020',
      end:'30/03/2020',
      creator:' jarrar',
      companies:[{
        company:{
          id:"1",
          name:"Expensya1",
          industry:"services informatiques",
          size:"5-10",
          location:"Tunis",
          adress:"lac 2 , tunis , tunisie",
          keyWords:['spring','AI','paris'],
          contact:"70000000",
          description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image:"data:image/png;base64,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"
        },
        tickets:[
          {id:'1',title:'prise de contact',date:'03/03/2020',addedBy:{name:'Tarek Jarrar'},file:'fichier.txt'},
          {id:'2',title:'reunion commerciale',date:'05/03/2020',addedBy:{name:'Nadia Sbaa'},file:'CR.txt'}
        ]
      },
      {
        company:{
          id:"1",
          name:"Expensya2",
          industry:"services informatiques",
          size:"5-10",
          location:"Tunis",
          adress:"lac 2 , tunis , tunisie",
          keyWords:['spring','AI','paris'],
          contact:"70000000",
          description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image:"data:image/png;base64,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"
        },
        tickets:[
          {id:'1',title:'prise de contact',date:'03/03/2020',addedBy:{name:'Tarek Jarrar'},file:'fichier.txt'},
          {id:'2',title:'prise de contact',date:'03/03/2020',addedBy:{name:'Tarek Jarrar'},file:'fichier.txt'}
        ]
      }]},
      {id:'2',
      title:'Vente produit Y',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      created:'27/02/2020',
      modified:'30/02/2020',
      start:'01/03/2020',
      end:'30/03/2020',
      creator:'tarek jarrar',
    },{id:'3',
    title:'Vente produit Z',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    created:'27/02/2020',
    modified:'30/02/2020',
    start:'01/03/2020',
    end:'30/03/2020',
    creator:' jarrar',
    status:'closed',
    companies:[{
      company:{
        id:"1",
        name:"Expensya",
        industry:"services informatiques",
        size:"5-10",
        location:"Tunis",
        adress:"lac 2 , tunis , tunisie",
        keyWords:['spring','AI','paris'],
        contact:"70000000",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image:"data:image/png;base64,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"
      },
      tickets:[
        {id:'1',title:'prise de contact',date:'03/03/2020',addedBy:{name:'Tarek Jarrar'},file:'fichier.txt'},
        {id:'2',title:'prise de contact',date:'03/03/2020',addedBy:{name:'Tarek Jarrar'},file:'fichier.txt'}
      ]
    }]
    },{id:'4',
    title:'Vente produit W',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    created:'27/02/2020',
    modified:'30/02/2020',
    start:'01/03/2020', 
    end:'30/03/2020',
    creator:' jarrar',
    companies:[{
      company:{
        name:"Expensya",
        industry:"services informatiques",
        size:"5-10",
        location:"Tunis",
        adress:"lac 2 , tunis , tunisie",
        keyWords:['spring','AI','paris'],
        contact:"70000000",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image:"data:image/png;base64,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"
      },
      tickets:[
        {id:'1',title:'prise de contact',date:'03/03/2020',addedBy:{name:'Tarek Jarrar'},file:'fichier.txt'},
        {id:'2',title:'prise de contact',date:'03/03/2020',addedBy:{name:'Tarek Jarrar'},file:'fichier.txt'}
      ]
    }]
    }]
  }
 

  showDetails(id:String){
    this.selectedTopic=this.topics.find(t => t.id === id);
    this.topicsService.subject.next(this.selectedTopic);
  }

  addTopic(){
    const dialogRef = this.dialog.open(AddTopicComponent,{
    width:'600px'  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);    
  });
  }
  
}
