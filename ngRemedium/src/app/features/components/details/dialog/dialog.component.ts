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
  endpoint="getList";
  idx:number
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
      console.log(":)))))",this.data)
      this.idx = this.data.id;
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
    console.log("es -----------------: ",v)
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
    this.year =new Date(this.userForm.value.birthDate).getFullYear();
    this.month =new Date(this.userForm.value.birthDate).getMonth()+1;
    this.day =new Date(this.userForm.value.birthDate).getDate();
    if(this.day<10){
      this.day = "0"+ this.day;
    }
    this.birthDate = (this.day)+"/"+(this.month)+"/"+(this.year)
    this.userForm.value.birthDate = this.birthDate;
    for(let i in this.userForm.value){
      this.sendingData[i] = this.userForm.value[i];
  }
    if(this.data==="add"){
    
    this.list.push(this.sendingData)
    this.drService.postDetails(this.sendingData).subscribe()
    
    }else{
      this.updateForm(this.sendingData,this.data.id)
    }
  }
  updateForm(data,i:number){
    this.year =new Date(this.userForm.value.birthDate).getFullYear();
    this.month =new Date(this.userForm.value.birthDate).getMonth()+1;
    this.day =new Date(this.userForm.value.birthDate).getDate();
    if(this.day<10){
      this.day = "0"+ this.day;
    }
    this.birthDate = (this.day)+"/"+(this.month)+"/"+(this.year)
    this.userForm.value.birthDate = this.birthDate;
    console.log("data",data,i)
    this.drService.putDetails({data,id:i}).subscribe()
    // this.drService.getData("dialog").subscribe(v=>this.getList(v))
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