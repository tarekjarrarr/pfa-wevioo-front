import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Observable } from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {
 
  formResearch: FormGroup = this.formBuilder.group({
    industry: new FormControl('', [Validators.required]),
    type:new FormControl(''),
    size: new FormControl(''),
    location: new FormControl(''),
    keysCtrl:new FormControl(''),
    });


  
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

  

  @ViewChild('keyInput') keyInput: ElementRef;

 
  
  constructor(private formBuilder: FormBuilder) { 
    this.filteredKeys = this.formResearch.get("keysCtrl").valueChanges.pipe(
      startWith(null),
      map((key: string | null) => key ? this.filter(key) : this.allKeys.slice()));
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
    this.formResearch.get("keysCtrl").setValue(null);
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
    this.formResearch.get("keysCtrl").setValue(null);
  }
  //key work filter function
  filter(name: string) {
    return this.allKeys.filter(key =>
        key.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  

  ngOnInit(): void {
  }

  onSubmit() {
    this.formResearch.get("keysCtrl").setValue(this.keys);
    this.result=true;
  }

  Clear(): void { 
    for (let name in this.formResearch.controls) {
      this.formResearch.controls[name].setValue(null);
      this.formResearch.controls[name].setErrors(null); 
    } 
    this.keys=[]; 
    this.clicked=false;
   }
  

}
