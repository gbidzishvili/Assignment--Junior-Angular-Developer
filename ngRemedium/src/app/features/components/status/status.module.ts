import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, Routes } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';


const routes: Routes = [
  { path: '', component: StatusComponent },

]
@NgModule({
  declarations: [
    StatusComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ]
})
export class StatusModule { }

