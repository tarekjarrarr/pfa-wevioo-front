import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/app/core/models/topic.model';
import { TopicsService } from 'src/app/core/services/topics.service';
import { UsersService } from 'src/app/core/services/users.service';
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

  constructor(private usersService:UsersService,private activatedRoute: ActivatedRoute,private router:Router,private topicsService:TopicsService,public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { topics: Topic[] }) => {
      this.topics = data.topics
    });
  }
 

  showDetails(id:String){
    this.selectedTopic=this.topics.find(t => t._id === id);
    console.log(this.selectedTopic);
    console.log(id);
    this.topicsService.subject.next(this.selectedTopic);
  }

  trackByFn(i) {
    return i;
  }

  addTopic(){
    const dialogRef = this.dialog.open(AddTopicComponent,{
    width:'600px' ,data:{message:String}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.topicsService.getAlltopics().subscribe(
        (topics) => {
          this.topics = topics
        }
      );
      });
  }

  removeTopic(id:String,index){
    if(confirm("Etes-vous sur de supprimer cette campagne ? ")) {
      
      this.topicsService.deleteTopic(id).then(
        (res)=>{console.log("supprission confirmée");this.topics.splice(index,1);
        }
      ).catch((err)=>{console.log(err);window.location.reload()})
    
    }
    
  }

 
 
  
}
