import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  ResearchSubject = new BehaviorSubject({});
  PredictionSubject=new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  getCompanyById(id:String){
    return this.http.get(`${environment.BASE_URL}/api/companies/details/${id}`);
  }

  getCompanyByName(name:String):Promise<any>{
    return this.http.get(`${environment.BASE_URL}/api/companies/getByName/${name}`).toPromise();
  }

  getAll():Promise<any>{
    return this.http.get(`${environment.BASE_URL}/api/companies/getAll`).toPromise();
  }

  getRecommendationResult(recommendationParams):Promise<any>{
     return this.http.post(`${environment.BASE_URL}/api/companies/recommendation`, {
      "name":recommendationParams.name,
      "company_size":recommendationParams.company_size,
      "age":recommendationParams.age,
      "industry":recommendationParams.industry,
      "type":recommendationParams.type,
      "specialties":recommendationParams.specialties,
      "location:":recommendationParams.location
     }).toPromise();
  }

  getSearchResult(searchParams,page:number,limit:number):Promise<any>{
     
      return this.http.post(`${environment.BASE_URL}/api/companies/search?page=${page}&limit=${limit}`,{
      "industry":searchParams.industry?searchParams.industry:"",
      "type":searchParams.type?searchParams.type:"",
      "company_size":searchParams.size?searchParams.size:"",
      "location":searchParams.location?searchParams.location:"",
      "specialties":searchParams.specialties.length>0?searchParams.specialties:null
    }).toPromise()
    
  }



}
