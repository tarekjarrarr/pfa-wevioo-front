import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Observable } from 'rxjs';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-recommandation',
  templateUrl: './recommandation.component.html',
  styleUrls: ['./recommandation.component.scss']
})
export class RecommandationComponent implements OnInit {

  formRecommandation: FormGroup = this.formBuilder.group({
    company:new FormControl('',[Validators.required]),
    industry: new FormControl(''),
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
    this.filteredKeys = this.formRecommandation.get("keysCtrl").valueChanges.pipe(
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
    this.formRecommandation.get("keysCtrl").setValue(null);
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
    this.formRecommandation.get("keysCtrl").setValue(null);
  }
  //key work filter function
  filter(name: string) {
    return this.allKeys.filter(key =>
        key.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  

  ngOnInit(): void {
  }

  onSubmit() {
    this.formRecommandation.get("keysCtrl").setValue(this.keys);
    this.result=true;
  }

  Clear(): void { 
    for (let name in this.formRecommandation.controls) {
      this.formRecommandation.controls[name].setValue(null);
      this.formRecommandation.controls[name].setErrors(null); 
    } 
    this.keys=[]; 
    this.clicked=false;
   }
  
}
