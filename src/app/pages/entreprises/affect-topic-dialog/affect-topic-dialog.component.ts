import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TopicsService } from 'src/app/core/services/topics.service';
import { AddTopicComponent } from '../../topics/add-topic/add-topic.component';
import { DetailsEntreprisesComponent } from '../details-entreprises/details-entreprises.component';

@Component({
  selector: 'app-affect-topic-dialog',
  templateUrl: './affect-topic-dialog.component.html',
  styleUrls: ['./affect-topic-dialog.component.scss']
})
export class AffectTopicDialogComponent implements OnInit {

  topics:any;
  company:any;
  topicId:String;

  constructor(private toastr:ToastrService,private topicsService:TopicsService,private router:Router,public dialog: MatDialog,public dialogRef: MatDialogRef<AffectTopicDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder) { }

  formAffect: FormGroup = this.formBuilder.group({
    topic:new FormControl('', [Validators.required])
  })
    
  ngOnInit(): void {
    this.getAllTopics();
    this.company=this.data.company;
  }

  getAllTopics(){
    this.topicsService.getAlltopics().subscribe((res)=>{this.topics=res;})
  }

  onSubmit(){
    this.topicId=this.formAffect.getRawValue().topic;
    this.topicsService.affectCompanyToTopic(this.company._id,this.topicId).then(
      (res)=>{this.data.message=res;this.toastr.success("company added successfully !");})
      .catch((err)=>{this.data.message=err.error;this.toastr.error(err.error);});
  }
  
  Cancel(){
    this.dialogRef.close();
  }

  createTopic(){
    this.dialogRef.close();  
  }  

}
