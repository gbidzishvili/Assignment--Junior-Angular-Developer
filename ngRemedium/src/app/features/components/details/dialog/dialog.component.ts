import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DropdownServiceService } from 'src/app/shared/dropdown-service.service';
import { Output, EventEmitter } from '@angular/core';
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
  @Output() newItemEvent = new EventEmitter();
  constructor(public drService:DropdownServiceService) { }

  ngOnInit(): void {
    this.drService.list.next(this.list)
    this.drService.list.subscribe((list:User[])=>{
    console.log("dialog value list")
      console.log(list)
      this.list = [...list];
    }
    )
    
    this.list.forEach(c=>this.categoriesArr.push(c.category))
    this.list.forEach(c=>this.statusArr.push(c.status))
    console.log(this.userForm)
    this.userForm.get('birthDate').valueChanges.subscribe(x=>{
     
      // console.log(this.userForm.get(`${value.getAttribute('formControlName')}`).invalid);
      
    }
    )
    this.userForm.get('mail').valueChanges.subscribe(x=>
      console.log("mail: " + this.userForm.get('mail').valid)
    )
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
    this.userForm.value.birthDate = this.birthDate
    this.list.push({
      mail: this.userForm.value.mail,
      pn: this.userForm.value.pn,
      name: this.userForm.value.name,
      surname: this.userForm.value.surname,
      birthDate: this.userForm.value.birthDate,
      category: this.userForm.value.category,
      status: this.userForm.value.status,
     })
    this.drService.list.next(this.list)
    // this.list = [...this.drService.list]
    console.log(this.list)
    this.newItemEvent.emit(this.list);
    console.log("emitted")
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