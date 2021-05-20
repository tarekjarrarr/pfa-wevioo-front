import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProfilesComponent } from './list-profiles/list-profiles.component';
import { ProfilesComponent } from './profiles.component';

const routes: Routes = [
  { path: '', component: ProfilesComponent },
  {path:'liste',component:ListProfilesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
