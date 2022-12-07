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
    {
      mail:"bidzishvili@gmail.com",
      pn:"12001034395",
      name:"giorgi",
      surname:"bidzishvili",
      birthDate:"15/05/2012",
      category:"VIP User",
      status:"active"

    },
    {
      mail:"chkadua@gmail.com",
      pn:"17054305678",
      name:"nata",
      surname:"chkadua",
      birthDate:"23/10/2013",
      category:"user1",
      status:"active"

    },
    {
      mail:"ckhadadze@gmail.com",
      pn:"19086243187",
      name:"vinme",
      surname:"chkadua_2",
      birthDate:"17/12/2014",
      category:"user1",
      status:"active"

    },
    {
      mail:"z_chichua@gmail.com",
      pn:"01027077710",
      name:"zura",
      surname:"chichua",
      birthDate:"19/01/2015",
      category:"user1",
      status:"active"

    },
    {
      mail:"z_chichua@gmail.com",
      pn:"44524560724",
      name:"zura",
      surname:"chichua",
      birthDate:"19/01/2016",
      category:"user1",
      status:"active"

    },
    {
      mail:"z_chichua@gmail.com",
      pn:"44344322452",
      name:"zura",
      surname:"chichua",
      birthDate:"19/01/2017",
      category:"user1",
      status:"active"

    },
    {
      mail:"z_chichua@gmail.com",
      pn:"14545670012",
      name:"zura",
      surname:"chichua",
      birthDate:"19/01/2018",
      category:"user1",
      status:"active"

    },
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
  @Output() newItemEvent = new EventEmitter();
  constructor(public drService:DropdownServiceService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
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
    this.list.forEach(c=>this.categoriesArr.push(c.category))
    this.list.forEach(c=>this.statusArr.push(c.status))
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
    
    for(let i in this.userForm.value){
     this.sendingData[i] = this.userForm.value[i];
     console.log("sendingData",this.sendingData,this.userForm.value[i],i)
    }
    console.log(":::))",this.sendingData)
    this.list.push(this.sendingData)
    this.drService.list.next(this.list)
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