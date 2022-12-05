import { FactoryTarget } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(public drService:DropdownServiceService) { }
  
  ngOnInit(): void {
    this.usersArr = [...this.drService.getUsers()];
    this.FilterForm.get("filter").valueChanges.subscribe((x)=>{
      this.searchText = this.FilterForm.get("filter").value;
    })
    console.log(this.usersArr)
  }
  adduser = new FormControl("",Validators.required);
  edituser = new FormControl("");
  openEdit(i:number){
    this.modalAddOpen=false;
    this.modalEditOpen=true;
    this.idx=i;
    this.user = this.usersArr[i]
    this.edituser.setValue(this.usersArr[this.idx].user)
  }
  editUser(){
    if(this.modalEditOpen){
    this.usersArr[this.idx]=this.edituser.value;
    this.closeModalEdit();
    }
  }
  openAdd(i:number){
    if(this.adduser.valid){
      this.showError = false;
    }
    this.modalEditOpen=false;
    this.modalAddOpen=true;
    this.idx=i;
  }
  addNewUser(){
    if(this.adduser.valid){
        this.addIsDisabled=false;
        this.drService.usersArr.push({user:this.adduser.value});
        this.usersArr = [...this.drService.getUsers()];
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
    this.modalDeleteOpen=true;
    this.user = this.usersArr[i].user;
    this.idx = i;
  }
  DeleteNewUser(){
    this.usersArr.splice(this.idx,1);
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
