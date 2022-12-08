import { Component, OnInit,AfterViewInit, OnChanges, SimpleChanges, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { filter } from 'rxjs';
import { DropdownServiceService } from 'src/app/shared/dropdown-service.service';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
 
  // names = ["Demavand", "Pradeep", "Ashutosh"]
  list=[
   
  ]
  displayedColumns = ['mail', 'pn', 'name', 'surname','birthDate','category',  'status'];
  categoriesArr=[{user: 'None'}];
  statusArr=[{status: 'None'}];
  dataSource:MatTableDataSource<any>;
  maxDate = new Date(2022,11,30);
  minDate = new Date(2002,0,1)
  startDate = '01/01/1950'
  endDate = '01/01/2022'
  year:number;
  month:number;
  day:number;
  datesForm = new FormGroup({
    startDate : new FormControl(),
    endDate : new FormControl(),
  })
  filterByDates=false;
  filterByEmail=false;
  filterByName=false;
  filterBySurName=false;
  filterByCategory=false;
  filterByStatus=false;
  categoryControl = new FormControl('',);
  statusControl = new FormControl('',);
  endpoint="getList"
  @ViewChild('paginator') paginator:MatPaginator;
  constructor(public drService:DropdownServiceService,public http:HttpClient) {}
  ngOnInit(): void {
    this.drService.getListArrays(this.endpoint).subscribe(v=>this.getValues(v))
    this.drService.getData(this.endpoint).subscribe(v=>this.getList(v))
    this.dataSource = new MatTableDataSource(this.list);
    this.categoryControl.valueChanges.subscribe(val=>{
      console.log("val: ",val)
      if(val["user"]==="None")this.dataSource.filter = ""
      else{
        this.dataSource.filter = val["user"]
      }
    }
    )
    this.statusControl.valueChanges.subscribe(val=>{
      if(val["status"] ==="None")this.dataSource.filter = ""
      else{
        this.dataSource.filter = val["status"]
      }
    })
  }
  getList(v){
    console.log("v: ",v)
    this.list = [...v]
    this.dataSource = new MatTableDataSource(this.list);
    this.dataSource.paginator = this.paginator 
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
  
  applyFilterMail(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource = new MatTableDataSource(this.list);
    this.dataSource.data = this.dataSource.data.filter(e=>{
      return e.mail.includes(filterValue)
    })
  }
  applyFilterName(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource = new MatTableDataSource(this.list);
    this.dataSource.data = this.dataSource.data.filter(e=>{
      return e.name.includes(filterValue)
    })
  }
  applyFilterSurName(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource = new MatTableDataSource(this.list);
    this.dataSource.data = this.dataSource.data.filter(e=>{
      return e.surname.includes(filterValue)
    })
  }
  searchByDate(){
    this.dataSource = new MatTableDataSource(this.list);
    this.dataSource.data = this.dataSource.data.filter(e=>
      this.my_date(e.birthDate) >= this.my_date(this.startDate) && this.my_date(e.birthDate) <= this.my_date(this.endDate));
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  my_date(date_string) {    
    var date_components = date_string.split("/");
    var day = date_components[0];
    var month = date_components[1];
    var year = date_components[2];
    return new Date(year, month -1, day).getTime();
  }
  openFiltByEmail(){
    this.filterByEmail = !this.filterByEmail;
    if(!this.filterByEmail){
      this.dataSource = new MatTableDataSource(this.list)
      this.dataSource.paginator = this.paginator
    }
  }
  openFiltByName(){
    this.filterByName = ! this.filterByName;
    if(!this.filterByName){
        this.dataSource = new MatTableDataSource(this.list)
        this.dataSource.paginator = this.paginator
    }
  }
  openFiltBySurName(){
    this.filterBySurName = ! this.filterBySurName;
      if(!this.filterBySurName){
      this.dataSource = new MatTableDataSource(this.list)
      this.dataSource.paginator = this.paginator
    }
    
  }
  openFiltBydates(){
    this.filterByDates = !this.filterByDates;
    if(!this.filterByStatus){
      this.dataSource = new MatTableDataSource(this.list)
      this.dataSource.paginator = this.paginator
    }
  }
  openFiltByCategory(){
    this.filterByCategory = !this.filterByCategory;
    if(!this.filterByCategory){
      this.categoryControl.setValue("")
      this.dataSource = new MatTableDataSource(this.list)
      this.dataSource.paginator = this.paginator
    }
  }
  openFiltByStatus(){
    this.filterByStatus = !this.filterByStatus;
    if(!this.filterByStatus){
      this.statusControl.setValue("")
      console.log(this.list)
      this.dataSource = new MatTableDataSource(this.list)
      this.dataSource.paginator = this.paginator
    }
  }
}
