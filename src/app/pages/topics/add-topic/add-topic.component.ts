import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AffectTopicDialogComponent } from '../../entreprises/affect-topic-dialog/affect-topic-dialog.component';
import { TopicsComponent } from '../topics.component';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AddTopicComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder) { 
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
    console.log(this.formTopic.getRawValue());
    this.data=this.formTopic.getRawValue();
  }
  
  Cancel(){
    this.dialogRef.close();
  }

  }


