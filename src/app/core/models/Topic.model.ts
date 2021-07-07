import { User } from "./user.model";
import {Company} from "./Company.model"
import { Ticket } from "./ticket.model";

export interface Topic{
    title?:string;
    description?:string;
    created?:string;
    modified?:string;
    status?:Status;
    creator?:User;
    companies?:Array<TopicCompany>;
}
 
export enum Status{
    "open",
    "closed"
}

export interface TopicCompany{
    company?:Company;
    tickets?:Array<Ticket>;
}

