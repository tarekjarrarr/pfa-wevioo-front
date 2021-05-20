import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [],
    children:
    [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      { 
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) 
      },
      { 
        path: 'entreprises',
        loadChildren: () => import('./pages/entreprises/entreprises.module').then(m => m.EntreprisesModule) 
      },
      { 
        path: 'compagnes',
        loadChildren: () => import('./pages/topics/topics.module').then(m => m.TopicsModule) 
      },
      { 
        path: 'profiles',
        loadChildren: () => import('./pages/profiles/profiles.module').then(m => m.ProfilesModule) 
      }
    ]
  }
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
