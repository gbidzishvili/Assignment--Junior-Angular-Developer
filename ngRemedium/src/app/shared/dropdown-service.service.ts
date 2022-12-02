import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownServiceService {
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
    {status:'Suspended'}
  ]
  constructor() { }
  getUsers(){
    return this.usersArr.slice();
  }
  getStatus(){
    return this.statusArr.slice();
  }
}
