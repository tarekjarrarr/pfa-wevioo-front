import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { ListProfilesComponent } from './list-profiles/list-profiles.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ProfilesComponent,
    ListProfilesComponent
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    MatButtonModule
  ]
})
export class ProfilesModule { }
