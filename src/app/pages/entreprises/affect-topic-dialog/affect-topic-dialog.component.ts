import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddTopicComponent } from '../../topics/add-topic/add-topic.component';
import { DetailsEntreprisesComponent } from '../details-entreprises/details-entreprises.component';

@Component({
  selector: 'app-affect-topic-dialog',
  templateUrl: './affect-topic-dialog.component.html',
  styleUrls: ['./affect-topic-dialog.component.scss']
})
export class AffectTopicDialogComponent implements OnInit {

  topics:any;

  constructor(private router:Router,public dialog: MatDialog,public dialogRef: MatDialogRef<AffectTopicDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder) { }

  formAffect: FormGroup = this.formBuilder.group({
    topic:new FormControl('', [Validators.required])
  })
    
  ngOnInit(): void {
    this.topics=[
      {id:'1',title:"Vente produit X"},
      {id:'2',title:"Vente produit Y"}
    ] ;
    console.log(this.topics);
  }

  onSubmit(){
    console.log(this.data)
    console.log(this.formAffect.getRawValue());
    this.data.topicId=this.formAffect.getRawValue();
  }
  
  Cancel(){
    this.dialogRef.close();
  }

  createTopic(){
    this.dialogRef.close();  
  }  

}
