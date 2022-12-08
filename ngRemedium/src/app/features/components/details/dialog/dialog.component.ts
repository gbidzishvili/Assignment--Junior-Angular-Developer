import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DropdownServiceService } from 'src/app/shared/dropdown-service.service';
import { Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
  list=[
    
  ]
  categoriesArr:string[]=[]
  statusArr:string[]=[]
  userForm = new FormGroup({
    mail:new FormControl(null,[Validators.required,Validators.email]),
    pn:new FormControl(null,[Validators.required,Validators.pattern("^[0-9]{11}$")]),
    name:new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z ]*")]),
    surname:new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z ]*")]),
    birthDate:new FormControl(null,[Validators.required]),
    category:new FormControl(null,[Validators.required]),
    status:new FormControl(null,[Validators.required]),
  })
  year;
  month;
  day;
  birthDate;
  birthDateValue=true;
  formIsValid=false;
  editing=false;
  adding=false;
  title:string;
  newData;
  action:string;
  sendingData={
    mail:"",
    pn:"",
    name:"",
    surname:"",
    birthDate:"",
    category:"",
    status:""
  };
  endpoint="getList"
  @Output() newItemEvent = new EventEmitter();
  constructor(public drService:DropdownServiceService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.drService.getListArrays(this.endpoint).subscribe(v=>this.getValues(v))
    this.drService.getData(this.endpoint).subscribe(v=>this.getList(v))

    if(this.data==="add"){
      this.action="Save";
      this.title="Add New User";
      this.adding = true;
    }else{
      this.action="Update";
      this.title="Edit User";
      this.editing=true;
      // this.newData = [...this.data]
     for(let i in this.data.e){
        this.userForm.get(`${i}`).setValue(this.data.e[i])
       console.log("key: ",i,this.data[i])
     }
    }
    // this.list.forEach(c=>this.categoriesArr.push(c.category))
    // this.list.forEach(c=>this.statusArr.push(c.status))
  }
  getList(v){
    console.log("v: ",v)
    this.list = [...v]
  }
  getValues(v){
    console.log("::1",this.statusArr,this.categoriesArr)
    const addArrCateg=[]
    const addArrStatus=[]
    v.categories.forEach(val=>{
      if(!addArrCateg.includes(val.user)){
        this.categoriesArr.push(val)
      }
        addArrCateg.push(val.user)
      }
  )
    v.statusArr.forEach(val=>{
      // console.log(!addArrStatus.includes(val.status),addArrStatus,val.status)
      if(!addArrStatus.includes(val.status)){
        this.statusArr.push(val)
      }
      addArrStatus.push(val.status)
  }
  )
    console.log("::2",this.statusArr,this.categoriesArr)
  }
  checkIfValidvalue(value){
      if(this.userForm.get(`${value.getAttribute('formControlName')}`).invalid && this.userForm.get(`${value.getAttribute('formControlName')}`).touched){
     
    return "error";
  }
   else{
    return null;
  }
    // }
  }
  getData(e){
    // console.log(e)
    
  }
  addUser(){
    if(this.data==="add"){
    this.year =new Date(this.userForm.value.birthDate).getFullYear();
    this.month =new Date(this.userForm.value.birthDate).getMonth()+1;
    this.day =new Date(this.userForm.value.birthDate).getDate();
    if(this.day<10){
      this.day = "0"+ this.day;
    }
    this.birthDate = (this.day)+"/"+(this.month)+"/"+(this.year)
    this.userForm.value.birthDate = this.birthDate;
    console.log(this.userForm.value["category"])
    // console.log(this.userForm.value["category"].user)
    // console.log(this.userForm.value["category"])
    for(let i in this.userForm.value){
      // if(i==="category"){
      //   console.log("category",this.userForm.value[i].user)
      //   this.sendingData[i] = this.userForm.value[i];
      // }
      // else if(i==="status"){
      //    console.log("status",this.userForm.value[i].status)
      //    this.sendingData[i] = this.userForm.value[i];
      // }
      // else{
        this.sendingData[i] = this.userForm.value[i];
      // }
    }
    console.log(":::))",this.sendingData)
    this.list.push(this.sendingData)
    this.drService.postDetails(this.sendingData).subscribe()
    this.drService.isSaved.next(true);
    // this.drService.list.next(this.list)
    // console.log("list",this.list)
    }else{
      this.updateForm()
    }
  }
  updateForm(){
    console.log("data:",this.data,this.userForm.value)
  }
  isValid(){
    if(this.userForm.valid){
      this.formIsValid=true;
      return 'btn-enabled' 
    }else {
      return  'btn-disabled'
    }
  }
 
}
interface User {
  mail:string,
  pn:string,
  name:string,
  surname:string,
  birthDate:string,
  category:string,
  status:string
}