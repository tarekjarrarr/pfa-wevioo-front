import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersService } from 'src/app/core/services/users.service';
import { DetailsTopicComponent } from '../details-topic/details-topic.component';
import {ToastrService} from "ngx-toastr";
import { TopicsService } from 'src/app/core/services/topics.service';
import * as moment from 'moment';

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
  CurrentUser: any;
  topicId:any;
  companyId:any;
  constructor(private topicsService:TopicsService,private toastr:ToastrService,private usersService:UsersService, public dialogRef: MatDialogRef<AddTicketComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
   }

  ngOnInit(): void {
    this.topicId=this.data.TopicId;
    this.companyId=this.data.companyId;
  }

  Cancel(){
    this.dialogRef.close();
  }

  /* onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formTicket.patchValue({
        fileSource: file
      });
    }
  } */
  
  onSubmit() {
    this.data.title=this.formTicket.getRawValue().title;
    this.data.date=moment(this.formTicket.getRawValue().date).format('DD/MM/YYYY');
    this.addTicket();
  }

  addTicket(){
    this.usersService.getAuthenticatedUser().then((res)=>{
      this.CurrentUser=res;
      const ticket={
        "title":this.data.title,
        "date":this.data.date
      };
      this.topicsService.addTicket(ticket,this.CurrentUser._id,this.topicId,this.companyId).subscribe(
        (res)=>{
          window.location.reload();
          console.log(res);
          this.toastr.success("une etiquette a été ajouté avec succes");
                },err=>{
          console.log(err.message);        
        })
    });
  }
  
}
