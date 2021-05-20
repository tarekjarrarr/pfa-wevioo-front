import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicsRoutingModule } from './topics-routing.module';
import { TopicsComponent } from './topics.component';
import { DetailsTopicComponent } from './details-topic/details-topic.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { EntrepriseTopicsComponent } from './entreprise-topics/entreprise-topics.component';




@NgModule({
  declarations: [
    TopicsComponent,
    DetailsTopicComponent,
    AddTicketComponent,
    AddTopicComponent,
    EntrepriseTopicsComponent  ],
  imports: [
    CommonModule,
    TopicsRoutingModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule
  ]
})
export class TopicsModule { }
