import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {User} from'../features/components/details/details.component'
@Injectable({
  providedIn: 'root'
})
export class DropdownServiceService implements User {
  subscribe(arg0: (v: any) => any) {
    throw new Error('Method not implemented.');
  }
  subj = new Subject<string>();
  usersArr=[
    {user:"VIP User"},
    {user:"Idle User"},
    {user:"standart User"},
    {user:"user 1"},
    {user:"user 2"},
  ];
  statusArr=[
    {status:'Active'},
    {status:'Blocked'},
    {status:'Suspended'},
    {status:'status1'},
    {status:'status2'},
    {status:'status3'}
  ]
  list = new Subject();
  isSaved=new Subject();
  constructor(public http:HttpClient) { }
  mail: string;
  pn: string;
  name: string;
  surname: string;
  birthDate: string;
  category: string;
  status: string;
  getUsers(){
    return this.usersArr.slice();
  }
  getStatus(){
    return this.statusArr.slice();
  }
  getData(endpoint){
   return this.http.get(`http://localhost:3000/${endpoint}`)
  }
  getListArrays(endpoint){
   return this.http.get(`http://localhost:3000/${endpoint}/arrays`)
  }
  putCategories(body:{user:String,id:number}){
   return this.http.put("http://localhost:3000/categories",body)
  }
  putStatus(body:{status:String,id:number}){
   return this.http.put("http://localhost:3000/status",body)
  }
  postCategories(body:{user:String}){
   return this.http.post("http://localhost:3000/categories",body)
  }
  postStatus(body:{status:String}){
    return this.http.post("http://localhost:3000/status",body)
  }

  postDetails(body:User){
    return this.http.post("http://localhost:3000/dialog",body)
  }
  putDetails(body:User){
    return this.http.post("http://localhost:3000/dialog",body)
  }
  deleteCategories(endpoint:string,id:number){
    return this.http.delete(`http://localhost:3000/delete/${endpoint}/${id}`)
  }
}
