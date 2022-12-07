import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesModule } from './features/components/categories/categories.module';
import { StatusModule } from './features/components/status/status.module';
import { ListModule } from './features/components/list/list.module';
import { DetailsModule } from './features/components/details/details.module';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { StatusComponent } from './features/components/status/status.component';
// import { ListComponent } from './features/components/list/list.component';
// import { DetailsComponent } from './features/components/details/details.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatTableModule} from '@angular/material/table'
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatInputModule } from '@angular/material/input';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
// import {MatButtonModule} from '@angular/material/button';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import {MatDialogModule} from '@angular/material/dialog';
// import { DialogComponent } from './features/components/details/dialog/dialog.component';
// import { MatSelectModule} from '@angular/material/select';
// import {MatIconModule} from '@angular/material/icon';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {NgxPaginationModule} from 'ngx-pagination'
// import { RouterModule } from '@angular/router';
// import { DetailsModule } from './features/components/details/details.module';

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    // StatusModule,
    // CategoriesModule,
    // ListModule,
    // DetailsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
    // Ng2SearchPipeModule,
    // ReactiveFormsModule,
    // FormsModule,
    // BrowserAnimationsModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatDatepickerModule,
    // MatNativeDateModule, 
    // MatMomentDateModule,
    // BsDatepickerModule.forRoot(),
    // MatButtonModule,
    // MatDialogModule,
    // MatSelectModule,
    // MatIconModule,
    // MatToolbarModule,
    // NgxPaginationModule,
    // RouterModule,
    
    
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
],
  bootstrap: [AppComponent],
})
export class AppModule { }
