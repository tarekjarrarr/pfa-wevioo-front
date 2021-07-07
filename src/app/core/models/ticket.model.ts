import { User } from "./User.model";

export interface Ticket{
    title?:string;
    date?:string;
    addedBy?:User
}