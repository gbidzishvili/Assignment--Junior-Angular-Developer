import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { MomentDateAdapter } from '@angular/material-moment-adapter"';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { StatusComponent } from './features/components/status/status.component';
import { ListComponent } from './features/components/list/list.component';
import { DetailsComponent } from './features/components/details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule} from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './features/components/details/dialog/dialog.component';
import { MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgxPaginationModule} from 'ngx-pagination'
import { RouterModule, Routes } from '@angular/router';
// const routes: Routes = [
//   { path: '', component: CategoriesComponent },
//   { path: 'status', component: StatusComponent },
//   { path: 'details', component: DetailsComponent },
//   { path: 'list', component: ListComponent },
//   { path: '**', component: ListComponent },

// ];
@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    StatusComponent,
    ListComponent,
    DetailsComponent,
    DialogComponent,
    
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatMomentDateModule,
    BsDatepickerModule.forRoot(),
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    NgxPaginationModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
],
  bootstrap: [AppComponent],
})
export class AppModule { }
