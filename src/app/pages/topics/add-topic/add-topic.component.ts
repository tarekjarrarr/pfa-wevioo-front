import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TopicsService } from 'src/app/core/services/topics.service';
import { UsersService } from 'src/app/core/services/users.service';
import { AffectTopicDialogComponent } from '../../entreprises/affect-topic-dialog/affect-topic-dialog.component';
import { TopicsComponent } from '../topics.component';
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent implements OnInit {
  CurrentUser: any;

  constructor( private router:Router,private topicsService:TopicsService,private usersService:UsersService,public dialogRef: MatDialogRef<AddTopicComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,private toastr: ToastrService) { 
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
  }
  formTopic: FormGroup = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    start:new FormControl(''),
    end:new FormControl(''),
  });

  ngOnInit(): void {
  }

  onSubmit(){
    
    this.addTopic();
  }
  
  Cancel(){
    this.dialogRef.close();
  }

  addTopic(){
    this.usersService.getAuthenticatedUser().then((res)=>{
      this.CurrentUser=res;
      const topic={
        "title":this.formTopic.getRawValue().title,
        "description":this.formTopic.getRawValue().description
      };
      console.log(this.CurrentUser._id);
      this.topicsService.addTopic(topic,this.CurrentUser._id).subscribe(
        (res)=>{
          location.reload();
          this.toastr.success("La campagne a été ajouté avec succes");
                },err=>{
          console.log(err);
          this.toastr.error(err.error)
        })
    });
   
  }

  }


