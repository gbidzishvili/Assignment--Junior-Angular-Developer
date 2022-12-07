import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { DropdownServiceService } from 'src/app/shared/dropdown-service.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit,AfterViewInit {
  names = ["Demavand", "Pradeep", "Ashutosh"]
  list=[
    {
      mail:"bidzishviligiorgi7@gmail.com",
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
  displayedColumns = ['mail', 'pn', 'name', 'surname','birthDate','category',  'status','actions'];
  dataSource:MatTableDataSource<any>;
  maxDate = new Date(2022,11,30);
  minDate = new Date(2002,0,1)
  startDate = ''
  endDate = ''
  year:number;
  month:number;
  day:number;
  process:string;
  selectValue;
  datesForm = new FormGroup({
    startDate : new FormControl(),
    endDate : new FormControl(),
  })
  @ViewChild('paginator') paginator:MatPaginator;
  constructor(public drService:DropdownServiceService,public dialog:MatDialog,public router:Router) {}
  ngOnInit(): void {
    this.drService.list.subscribe((value:User[])=>{
      console.log("details value");
      console.log(value)
      this.list = value
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator
      })
    this.dataSource = new MatTableDataSource(this.list);
  }
  startDateChange(e){
    console.log("/*/*/", new Date(e))
    this.year =new Date(e).getFullYear();
    this.month =new Date(e).getMonth()+1;
    this.day =new Date(e).getDate();
    this.startDate = (this.day)+"/"+(this.month)+"/"+(this.year)
    if(this.my_date(this.startDate)<0){
      this.startDate =(this.month)+"/"+(this.day)+"/"+(this.year)
    }
    console.log("startDate: " +this.my_date(this.startDate))
    return this.startDate;
    }
  endDateChange(e){
    console.log(e)
    this.year =new Date(e).getFullYear();
    this.month =new Date(e).getMonth()+1;
    this.day =new Date(e).getDate();
    this.endDate = (this.day)+"/"+(this.month)+"/"+(this.year)
    if(this.my_date(this.endDate)<0){
      this.endDate =(this.month)+"/"+(this.day)+"/"+(this.year)
      console.log("error" + this.endDate )
    }
    console.log("endDate: " + this.my_date(this.endDate))
    return this.endDate;
  }
  applyFilter(filterValue: string) {
    console.log(+filterValue*0===0);
   if(+filterValue*0!==0 || filterValue==="")
    {filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;}
    else{
      console.log("*/" + filterValue);
      
      console.log(+filterValue*0===0)
      console.log("number")
    }
  }
  applyDateFilter(){
    console.log("**())")
    console.log(this.startDate)
    console.log(this.endDate)
    this.dataSource = new MatTableDataSource(this.list);
    this.dataSource.data = this.dataSource.data.filter(e=>
      this.my_date(e.birthDate) >= this.my_date(this.startDate) && this.my_date(e.birthDate) <= this.my_date(this.endDate));
      console.log(this.dataSource.data)
  }
  
   
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  my_date(date_string) {    
    var date_components = date_string.split("/");
    var day = date_components[0];
    var month = date_components[1];
    var year = date_components[2];
    // console.log(new Date(year, month -1, day).getTime())
    return new Date(year, month -1, day).getTime();
  }
  consolesmth(){
    console.log("smth")
  }
  openDialog(e): void {
    console.log("event: ",e)
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '35%',
      data:e,
    });
}
  openDialogEdit(e,id): void {
    console.log("event: ",id)
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '35%',
      data:{e,id},
    });
}
 
  deleteElement(index){
    if(confirm(
      `Do you want to delete user?`)){
    this.list.splice(index,1)
    this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator
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