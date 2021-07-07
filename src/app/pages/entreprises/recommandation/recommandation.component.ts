import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Observable } from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import {companiesList} from '../../../../assets/files/companies'
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/core/services/companies.service';

@Component({
  selector: 'app-recommandation',
  templateUrl: './recommandation.component.html',
  styleUrls: ['./recommandation.component.scss']
})
export class RecommandationComponent implements OnInit {
    loading=false;
    recommendationParams:{};
    recommendationResult:any;
    //details of the company in input
    companyDetails:any;

    //show more filters
    clicked=false;
    result=false;
    //chips settings
    visible: boolean = true;
    separatorKeysCodes = [ENTER, COMMA];
    filteredKeys: Observable<any[]>;
    keys = [
    ];
    allKeys = [
      'C++','Java','IOT','web','DevOps','managment'
    ];
    companies=companiesList;

  formRecommandation: FormGroup = this.formBuilder.group({
    company:new FormControl('',[Validators.required]),
    location: new FormControl(''),
    specialties:new FormControl(''),
    });

  @ViewChild('keyInput') keyInput: ElementRef;

 
  
  constructor(private companiesService:CompaniesService,private router:Router,private formBuilder: FormBuilder) { 
    this.filteredKeys = this.formRecommandation.get("specialties").valueChanges.pipe(
      startWith(null),
      map((key: string | null) => key ? this.filter(key) : this.allKeys.slice()));
  }

  ngOnInit(): void {
    this.loading=false;
  }

  //key word add
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add a key word
    if ((value || '').trim()) {
      this.keys.push(value.trim());
    }
    // Reset the input value
    if (input) {
    input.value = '';
    }
    this.formRecommandation.get("specialties").setValue(null);
  }
  //key word remove
  remove(key: string): void {
    const index = this.keys.indexOf(key);
    if (index >= 0) {
      this.keys.splice(index, 1);
    }
  }
  //key word select
  selected(event: MatAutocompleteSelectedEvent): void {
    this.keys.push(event.option.viewValue);
    this.keyInput.nativeElement.value = '';
    this.formRecommandation.get("specialties").setValue(null);
  }
  //key work filter function
  filter(name: string) {
    return this.allKeys.filter(key =>
        key.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }


  async onSubmit() {
    this.formRecommandation.get("specialties").setValue(this.keys);
    this.recommendationParams=this.formRecommandation.value;
    this.getCompanyDetails(this.formRecommandation.value.company); 
  }

  async getCompanyDetails(name:String){
    this.companiesService.getCompanyByName(name).then(
     (res) =>
      { this.companyDetails=res;
        this.getRecommendationResult(this.companyDetails);
      }).catch(err=>{console.log(err)} );
 }

  //get recommendation result
  getRecommendationResult(company) {
    this.loading=true;
    const params={
      "name":this.formRecommandation.value.company,
      "company_size":company.company_size,
      "age":company.age,
      "industry":company.industry,
      "type":company.type,
      "specialties":this.formRecommandation.value.specialties,
      "location":this.formRecommandation.value.location
    }
    window.scrollBy(0,300);
    this.companiesService.getRecommendationResult(params)
    .then(res=>{
      if(this.formRecommandation.value.specialties.length>0) {this.recommendationResult=res.filteredKeywords}
      if(this.formRecommandation.value.location.length>0) {this.recommendationResult=res.filteredLocations}
      else{this.recommendationResult=res.result;}
    })
    .catch(error=>console.log(error.error))
    .finally(()=>{this.result=true;this.loading=false;window.scrollBy(0,300);
    });
  }

  Clear() { 
    for (let name in this.formRecommandation.controls) {
      this.formRecommandation.controls[name].setValue(null);
      this.formRecommandation.controls[name].setErrors(null); 
    } 
    this.keys=[]; 
    this.clicked=false;
    this.result=false;
   }
  
   

   //navigate to details company
  goDetailsCompany(name){
    this.getIdAndNavigate(name);
  }

  getIdAndNavigate(name:String){
    this.companiesService.getCompanyByName(name).then(
      (res)=>{
        this.router.navigate([`entreprises/details/${res._id}`]);    
      }
    )
  }

}
