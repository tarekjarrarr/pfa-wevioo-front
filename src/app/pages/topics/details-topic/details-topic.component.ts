import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import { TopicsService } from 'src/app/core/services/topics.service';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';

@Component({
  selector: 'app-details-topic',
  templateUrl: './details-topic.component.html',
  styleUrls: ['./details-topic.component.scss']
})
export class DetailsTopicComponent implements OnInit {
  topic: any;


  constructor(private route:ActivatedRoute,private topicsService:TopicsService,public dialog: MatDialog) { }

  ngOnInit(): void {
      this.topicsService.subject.subscribe((e) => this.topic = e );
  }

  removeCompanyFromTopic(id:string){
    if(confirm("Etes-vous sur de supprimer cet element ? ")) {
      console.log("suppression confirmée");
      this.topic.companies.splice(0,1);
    }
    
  }

  removeTicketFromCompany(id:string){
    if(confirm("Etes-vous sur de supprimer cet element ? ")) {
      console.log("suppression confirmée");
    this.topic.companies[1].tickets.splice(0,1);}
  }
  
  addTicket(){
    const dialogRef = this.dialog.open(AddTicketComponent,{
      width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.topic.companies[0].tickets.push(result);
      this.topicsService.subject.next(this.topic);
    });
  }
  }


