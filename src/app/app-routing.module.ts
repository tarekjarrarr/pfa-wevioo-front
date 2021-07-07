import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/authentication/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
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
        path: 'campagnes',
        loadChildren: () => import('./pages/topics/topics.module').then(m => m.TopicsModule) 
      },
      { 
        path: 'profiles',
        loadChildren: () => import('./pages/profiles/profiles.module').then(m => m.ProfilesModule) 
      },
      { path: 'utilisateurs',
       loadChildren: () => import('./utilisateurs/utilisateurs.module').then(m => m.UtilisateursModule) 
      }
    ]
  },
  { path: 'login', component: LoginComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
