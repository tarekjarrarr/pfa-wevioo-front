import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import { TopicsService } from '../services/topics.service';

@Injectable({
  providedIn: 'root'
})
export class TopicResolver implements Resolve<any> {

  constructor(private topicsService: TopicsService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.topicsService.getAlltopics()
  }

}
