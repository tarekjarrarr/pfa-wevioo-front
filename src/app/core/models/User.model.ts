export interface User{
    _id?:string;
    fullname?:string;
    email?:string;
    password?:string;
    position?:string;
    phone?:string;
    dateOfBirth?:string;
    role?:Role;
}

export enum Role{
    "user","admin"
}