import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


const routes: Routes = [
  { path: '', component: CategoriesComponent,pathMatch:"full" },

]
@NgModule({
  declarations: [
    CategoriesComponent,
],
  imports: [
    CommonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatButtonModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  // exports:[
  //   CategoriesComponent,
  //   RouterModule
  // ]
})
export class CategoriesModule { }
