import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/ticket.model';
import { Topic } from '../models/topic.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  subject = new BehaviorSubject({});
  topicsUrl:String= environment.BASE_URL + '/api/topics';
  constructor(private http: HttpClient,private usersService:UsersService) { }

  getAlltopics():Observable<Topic[]>{
    return this.http.get<Topic[]>(this.topicsUrl+'/getAll');
  }

  addTopic(topic: Topic,userId:String): any {
    return this.http.post(this.topicsUrl+'/create', {
      "title":topic.title,
      "description":topic.description,
      "creator":userId
    });
  }

  addTicket(ticket: Ticket,userId:String,topicId:String,companyId:String): any {
    return this.http.post(this.topicsUrl+`/addTicket/${topicId}/${companyId}`, {
      "title":ticket.title,
      "date":ticket.date,
      "addedBy":userId
    });
  }

  deleteTicket(topicId:String,companyId:String,ticketId:string):Promise<any>{
    return this.http.delete(this.topicsUrl+`/deleteTicket/${topicId}/${companyId}/${ticketId}`).toPromise();
  }
  
  deleteTopic(topicId:String):Promise<any>{
    return this.http.delete(this.topicsUrl+`/deleteTopic/${topicId}`).toPromise();
  }
  

  deleteCompanyFromTopic(companyId:String,topicId:String):Promise<any>{
    return this.http.delete(this.topicsUrl+`/deleteFromTopic/${companyId}/${topicId}`).toPromise();
  }

  getTopicsByCompany(companyId:String):Observable<any[]>{
    return this.http.get<any[]>(this.topicsUrl+`/getTopicsByCompany/${companyId}`);
  }

  affectCompanyToTopic(companyId:String,topicId:String):Promise<any>{
    return this.http.post(this.topicsUrl+`/affect/${companyId}/${topicId}`,{}).toPromise();
  }
  
}
