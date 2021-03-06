import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicResolver } from 'src/app/core/resolvers/topic.resolver';
import { TopicsComponent } from './topics.component';


const routes: Routes = [
    {
      path: '',
      component: TopicsComponent,
      pathMatch: 'full',
      resolve: {topics:TopicResolver}
    }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule {
  

 }
