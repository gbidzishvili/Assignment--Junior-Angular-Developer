import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Routes, RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { DialogComponent } from './dialog/dialog.component';


const routes: Routes = [
  { path: '', component: DetailsComponent },

]
@NgModule({
  declarations: [
    DetailsComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    BsDatepickerModule.forRoot(),
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    NgxPaginationModule,
    // BrowserAnimationsModule,
    MatInputModule,
    
    // BrowserModule,
    // Ng2SearchPipeModule,
    // FormsModule,
    // MatFormFieldModule,
    // MatDatepickerModule,
    // MatNativeDateModule, 
    // MatMomentDateModule,
  
    // Ng2SearchPipeModule,
    // ReactiveFormsModule,
    // FormsModule,
    // BrowserAnimationsModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatDatepickerModule,
    
  ]
})
export class DetailsModule { }
