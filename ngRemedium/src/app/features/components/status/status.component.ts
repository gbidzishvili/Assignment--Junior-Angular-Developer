import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownServiceService } from 'src/app/shared/dropdown-service.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit,OnChanges {
  y:any;
  statusArr=[
  ]
  modalEditOpen=false;
  modalAddOpen=false;
  modalDeleteOpen = false;
  idx:number=0;
  status:string;
  addIsDisabled=false;
  isClicked=false;
  iserror=false;
  showError = false;
  searchText:any;
  FilterForm = new FormGroup({
    filter : new FormControl("")
  })
  addstatus = new FormControl("",Validators.required);
  editstatus = new FormControl("");
  z=4;
  p: number = 1;
  endpoint='status'
  constructor(public drService:DropdownServiceService) {}
  ngOnInit(): void {
    // this.statusArr = [...this.drService.getStatus()];
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
      this.statusArr.push(v)
    })
  }
  openEdit(i:number){
    console.log("idx",i)
    this.modalAddOpen=false;
    this.modalEditOpen=true;
    this.idx=i;
    this.status = this.statusArr[i];
    this.editstatus.setValue(this.statusArr[i].status)
  }
  editStatus(){
    this.statusArr[this.idx]={status:this.editstatus.value};
      this.drService.putStatus({status:this.editstatus.value,id:this.idx}).subscribe();
      this.closeModalEdit();
  }
  openAdd(i:number){
    this.modalEditOpen=false;
    this.modalAddOpen=true;
    this.idx=i;
  }
  addNewStatus(){
    if(this.addstatus.valid){
        this.addIsDisabled=false;
        this.statusArr.push({status: this.addstatus.value});
        this.drService.postStatus({status:this.addstatus.value}).subscribe();
        this.editstatus.setValue("");
        this.modalAddOpen = false;
    }
  }
  error(){
    if(this.addstatus.value === ''){
      return true;
    }
  }
  delete(i:number){
    this.modalDeleteOpen=true;
    this.status = this.statusArr[i].status;
    this.idx = i;
  }
  DeleteNewStatus(){
    console.log("idx:",this.idx)
    this.statusArr.splice(this.idx,1);
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
  
  ngOnChanges(changes: SimpleChanges): void {
  }
  


}
