import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
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

  removeCompanyFromTopic(companyIndex,id:string){
    if(confirm("Etes-vous sur de supprimer cet element ? ")) {
      
      this.topicsService.deleteCompanyFromTopic(id,this.topic._id).then(
        (res)=>{console.log("suppression confirmée");this.topic.companies.splice(companyIndex,1);
        }
      ).catch((err)=>{console.log(err)})
    }
  }

  removeTicketFromCompany(CompanyIndex,ticketIndex,company:String,id:string){
    if(confirm("Etes-vous sur de supprimer cet element ? ")) {
      
      this.topicsService.deleteTicket(this.topic._id,company,id).then(
        (res)=>{console.log("supprission confirmée");this.topic.companies[CompanyIndex].tickets.splice(ticketIndex,1);
        }
      ).catch((err)=>{console.log(err);window.location.reload()})
    
    }
    
  }
  
  addTicket(companyId:String,index:number){
    const dialogRef = this.dialog.open(AddTicketComponent,{
      data :{'TopicId':this.topic._id,"companyId":companyId},
      width:'500px'
    });
    dialogRef.afterClosed().subscribe(result => {
       this.topic.companies[index].tickets.push(result);
       window.location.reload();
       this.topicsService.subject.next(this.topic);
    });
  }


  }


