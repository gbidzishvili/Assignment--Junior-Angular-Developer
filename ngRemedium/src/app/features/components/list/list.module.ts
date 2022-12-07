import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';


const routes: Routes = [
  { path: '', component: ListComponent },

]
@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    BsDatepickerModule.forRoot(),
    MatSelectModule,
    RouterModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    // MatDatepickerModule,
    // MatNativeDateModule, 
    // MatMomentDateModule,
    // HttpClientModule,
    // MatDialogModule,
    MatIconModule,
    // Ng2SearchPipeModule,  
    FormsModule,
    // BrowserAnimationsModule,
  ],

})
export class ListModule { }
