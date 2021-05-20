import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsEntreprisesComponent } from './details-entreprises/details-entreprises.component';
import { EntreprisesComponent } from './entreprises.component';
import { RechercheComponent } from './recherche/recherche.component';
import { RecommandationComponent } from './recommandation/recommandation.component';

const routes: Routes = [
  {
    path:'',
    component:EntreprisesComponent,
    pathMatch: 'full'  
  },
  {path:'recherche',component: RechercheComponent},
  {path:'recommandation',component:RecommandationComponent},
  {path:'details',component:DetailsEntreprisesComponent}

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntreprisesRoutingModule { }
