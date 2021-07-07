import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Observable } from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import { ThemeService } from 'ng2-charts';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ResourceLoader } from '@angular/compiler';
import {companiesList} from '../../../../assets/files/companies'


@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {
  
  loading=false;
  searchParams:{};
  searchResult:any;
  nameSelected=true;
  filtersSelected=false;

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
    //filtering lists
    industries=['Transport','Finance','Services','International_Affairs','Relations','Entertainment','Art','Health','Manufacturing','Telecommunications','Education','Environmental','Computer_Software','Digitalization'];
    types=["Government Agency","Sole Proprietorship","Educational Institution","Nonprofit","Privately Held","Public Company","Partnership","Self-Employed"];
    sizes=['51-200', '11-50', '10000-300000', '201-500', '1001-5000', '2-10','5001-10000', '501-1000', '0-1'];
    companies=companiesList;
    searchByNameResult=null;

  formResearch: FormGroup = this.formBuilder.group({
    name:[''],
    industry: [''],
    type:[''],
    size: [''],
    location: [''],
    specialties:[''],
    });

    


  @ViewChild('keyInput') keyInput: ElementRef;
  @ViewChild("scroll") Scroll: ElementRef;

  constructor(private router:Router,private formBuilder: FormBuilder,private companiesService:CompaniesService) { 
    this.filteredKeys = this.formResearch.get("specialties").valueChanges.pipe(
      startWith(null),
      map((key: string | null) => key ? this.filter(key) : this.allKeys.slice()));
  }

  ngOnInit(): void {
  }

  //pagination params
  length ;
  pageSize = 9;
  pageIndex = 0;

  //key words filtering
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
    this.formResearch.get("specialties").setValue(null);
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
    this.formResearch.get("specialties").setValue(null);
  }
  //key work filter function
  filter(name: string) {
    return this.allKeys.filter(key =>
        key.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

 //initilize search filters
  Clear(): void { 
    for (let name in this.formResearch.controls) {
      this.formResearch.controls[name].setValue(null);
      this.formResearch.controls[name].setErrors(null); 
    } 
    this.keys=[]; 
    this.clicked=false;
    this.result=false;
   }
 
  //navigate to details company
  goDetailsCompany(id){
    this.router.navigate([`entreprises/details/${id}`]);
  }

  onSubmit() {
    this.formResearch.get("specialties").setValue(this.keys);
    this.searchParams=this.formResearch.value;

    if(this.formResearch.controls['name'].value )
    {this.getSearchResultsByName(this.formResearch.controls['name'].value);}
    else {this.getSearchResults(this.formResearch.value,1,this.pageSize);}
    }


  //get searching results
  getSearchResults(params,page,limit) {
    this.loading=true;
    this.searchByNameResult=null;
    console.log(params);
    this.companiesService.getSearchResult(params,page,limit)
    .then(res=>{console.log(res);this.searchResult=res;console.log(this.searchResult);this.length=this.searchResult.number;
    })
    .catch(error=>console.log(error))
    .finally(()=>{this.result=true;this.loading=false;
      window.scrollBy(0,300);
  });
  } 

  getSearchResultsByName(name){
    this.loading=true;
    this.searchResult=null;
    this.companiesService.getCompanyByName(name).then(
      res=>{this.searchByNameResult=res;console.log(this.searchByNameResult);})
    .catch(error=>console.log(error))
    .finally(()=>{this.result=true;this.loading=false;this.Scroll.nativeElement.scrollIntoView({ behavior: "smooth"});
  });
    
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    console.log(this.searchParams,this.length,this.pageIndex);
    this.getSearchResults(this.searchParams,this.pageIndex,this.pageSize);
    
  }

  trackByFn(i) {
    return i;
  }

  nameClicked(){
    this.nameSelected=true;
    this.filtersSelected=false;
    this.formResearch.get("industry").setValue(null);;
    this.formResearch.get("type").setValue(null);;
    this.formResearch.get("size").setValue(null);;
    this.formResearch.get("location").setValue(null);;
  }

  filtersClicked(){
    this.nameSelected=false;
    this.filtersSelected=true;
    this.formResearch.get("name").setValue(null);
  }
}
