import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateursRoutingModule } from './utilisateurs-routing.module';
import { UtilisateursComponent } from './utilisateurs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    UtilisateursComponent
  ],
  imports: [
    CommonModule,
    UtilisateursRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule

  ]
})
export class UtilisateursModule { }
