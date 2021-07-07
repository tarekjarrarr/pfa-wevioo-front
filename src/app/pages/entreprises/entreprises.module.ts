import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntreprisesRoutingModule } from './entreprises-routing.module';
import { EntreprisesComponent } from './entreprises.component';
import { RechercheComponent } from './recherche/recherche.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import { RecommandationComponent } from './recommandation/recommandation.component';
import { DetailsEntreprisesComponent } from './details-entreprises/details-entreprises.component';
import { AffectTopicDialogComponent } from './affect-topic-dialog/affect-topic-dialog.component';
import {  MatDialogModule } from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    EntreprisesComponent,
    RechercheComponent,
    RecommandationComponent,
    DetailsEntreprisesComponent,
    AffectTopicDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EntreprisesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
]
})
export class EntreprisesModule { }
