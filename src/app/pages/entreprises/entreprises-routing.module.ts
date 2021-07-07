import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesResolver } from 'src/app/core/resolvers/companies.resolver';
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
  {path:'recommandation',component:RecommandationComponent,resolve: {companiesList:CompaniesResolver}},
  {path:'details/:id',component:DetailsEntreprisesComponent}

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntreprisesRoutingModule { }
