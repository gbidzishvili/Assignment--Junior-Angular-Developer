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
  constructor(public drService:DropdownServiceService) {}
  ngOnInit(): void {
    this.statusArr = [...this.drService.getStatus()];
    this.FilterForm.get("filter").valueChanges.subscribe((x)=>{
      console.log(`x: ${x}`)
      this.searchText = this.FilterForm.get("filter").value;
      console.log(`searchtext: ${this.searchText}`)
      console.log(`value: ${this.FilterForm.get("filter").value}`)
      console.log(`length: ${this.FilterForm.get("filter").value.length}`)
    })

  }
  openEdit(i:number){
    this.modalAddOpen=false;
    this.modalEditOpen=true;
    this.idx=i;
    this.status = this.statusArr[i].status;
    this.editstatus.setValue(this.statusArr[this.idx].status)
  }
  editStatus(){
    this.statusArr[this.idx]=this.editstatus.value;
    this.closeModalEdit();
  }
  openAdd(i:number){
    if(this.addstatus.valid){
      this.showError = false;
    }
    this.modalEditOpen=false;
    this.modalAddOpen=true;
    this.idx=i;
  }
  addNewStatus(){
    if(this.addstatus.valid){
        this.addIsDisabled=false;
        this.drService.statusArr.push({status: this.addstatus.value});
        this.statusArr = [...this.drService.getStatus()];
        this.modalAddOpen = false;
        this.addstatus.setValue("");
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
    this.statusArr.splice(this.idx,1);
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
    // this.searchText = this.FilterForm.get("filter").value;
    // console.log("raa***")
    
  }
  


}
