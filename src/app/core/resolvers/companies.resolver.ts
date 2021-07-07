import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import { TopicsService } from '../services/topics.service';
import {companiesList} from '../../../assets/files/companies'
@Injectable({
  providedIn: 'root'
})
export class CompaniesResolver implements Resolve<any> {

  constructor(private topicsService: TopicsService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return companiesList.sort();
  }

}
