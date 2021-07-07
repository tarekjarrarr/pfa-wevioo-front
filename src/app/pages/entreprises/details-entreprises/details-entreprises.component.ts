import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/core/models/Company.model';
import { Topic } from 'src/app/core/models/topic.model';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { EntrepriseTopicsComponent } from '../../topics/entreprise-topics/entreprise-topics.component';
import { AffectTopicDialogComponent } from '../affect-topic-dialog/affect-topic-dialog.component';
import {ToastrService} from 'ngx-toastr'
@Component({
  selector: 'app-details-entreprises',
  templateUrl: './details-entreprises.component.html',
  styleUrls: ['./details-entreprises.component.scss']
})
export class DetailsEntreprisesComponent implements OnInit {
 

  profiles= false;

  companyId: string;
  company: any;
  topics: Topic[];
  loading = false;
  message:string;
 

  constructor(private toastr:ToastrService,private companiesService:CompaniesService, private activatedRouter: ActivatedRoute,private router:Router,public dialog: MatDialog,private overlay: Overlay) { }  

  ngOnInit(): void {
    this.loading = true
    this.companyId = this.activatedRouter.snapshot.params['id'];
    this.getCompanyById(this.companyId)
  }

  getCompanyById(id){
    this.loading = true
    this.companiesService.getCompanyById(id).subscribe(
      (value: any) => {
        this.company = value;
        this.loading = false
      }, err => {
        console.log(err)
      }
    )
  }
 
  addToTopic(){
    const dialogRef = this.dialog.open(AffectTopicDialogComponent,{
      width:'700px',
      data:{company:this.company,message:this.message}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      });
    }

    showTopics(company){
    let config:MatDialogConfig={
      width:'700px',
    data:{company:company,result:null,error:null}};

      const dialogRef = this.dialog.open(EntrepriseTopicsComponent,config);
    
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        });
    }

    showProfiles(){
/*       this.router.navigate(['/profiles/liste'])
 */    }

  }
  

