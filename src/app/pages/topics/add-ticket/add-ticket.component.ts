import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DetailsTopicComponent } from '../details-topic/details-topic.component';



@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {
    
  formTicket: FormGroup = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    date:new FormControl(''),
    file:new FormControl('')
  });
  
  constructor( public dialogRef: MatDialogRef<AddTicketComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
   }

  ngOnInit(): void {
  }

  Cancel(){
    this.dialogRef.close();
  }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formTicket.patchValue({
        fileSource: file
      });
    }
  }
  
  onSubmit() {

    console.log(this.formTicket.getRawValue());
    this.data=this.formTicket.getRawValue();
  }
  
}
