import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicsComponent } from './topics.component';


const routes: Routes = [
    {
      path: '',
      component: TopicsComponent,
      pathMatch: 'full'
    }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule {
  

 }
