import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FactoryTarget } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DropdownServiceService } from 'src/app/shared/dropdown-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit,OnChanges {
  usersArr=[
  ];
  modalEditOpen=false;
  modalAddOpen=false;
  modalDeleteOpen = false;
  idx:number=0;
  user:string;
  addIsDisabled=false;
  isClicked=false;
  iserror=false;
  showError = false;
  FilterForm = new FormGroup({
    filter : new FormControl("")
  })
  searchText="";
  adduser = new FormControl("",Validators.required);
  edituser = new FormControl("");
  z=4;
  p: number = 1;
  endpoint='categories'
  constructor(public drService:DropdownServiceService,public router:Router,public http:HttpClient) { }
  
  ngOnInit(): void {
    this.FilterForm.get("filter").valueChanges.subscribe((x)=>{
      this.searchText = this.FilterForm.get("filter").value;
    })
    this.drService.getData(this.endpoint).subscribe(v=>this.getValues(v))
    // this.p= (this.z/this.usersArr.length)+1;
    // console.log(this.z,this.usersArr.length+1,this.p)
   }
  getValues(v){
    console.log("v",v)
    let i = v;
    v.forEach(v=>{
      console.log("vaax",v)
      this.usersArr.push(v)
    })
  }
  openEdit(i:number){
    console.log("idx",i)
    this.modalAddOpen=false;
    this.modalEditOpen=true;
    this.idx=i;
    this.user = this.usersArr[i];
    this.edituser.setValue(this.usersArr[this.idx].user);
  }
  editUser(){
    if(this.modalEditOpen){
      this.usersArr[this.idx]={user:this.edituser.value};
      this.drService.putCategories({user:this.edituser.value,id:this.idx}).subscribe();
      this.closeModalEdit();
    }
  }
  openAdd(i:number){
    console.log("idx",i)
    this.modalEditOpen=false;
    this.modalAddOpen=true;
    this.idx=i;
  }
  addNewUser(){
    if(this.adduser.valid){
        this.addIsDisabled=false;
        this.usersArr.push({user:this.adduser.value});
        this.drService.postCategories({
          user: this.adduser.value,
        }).subscribe()
        console.log("arr",this.usersArr)
        this.modalAddOpen = false;
        this.adduser.setValue("");
    }
  }
  error(){
    if(this.adduser.value === ''){
      return true;
    }
  }
  delete(i:number){
    console.log("idx",i)

    this.modalDeleteOpen=true;
    this.user = this.usersArr[i].user;
    this.idx = i;
  }
  DeleteNewUser(){
    this.usersArr.splice(this.idx,1);
    this.drService.deleteCategories(this.endpoint,this.idx).subscribe()
    this.modalDeleteOpen = false;
  }
  closeModalEdit(){
    this.modalEditOpen=false;
  }
  closeModaladd(){
    this.modalAddOpen=false;
  }
  closeModalDelete(){
    this.modalDeleteOpen = false;
  }
  ngOnChanges(){
  }
  
}
