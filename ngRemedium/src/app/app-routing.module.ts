import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { DetailsComponent } from './features/components/details/details.component';
import { ListComponent } from './features/components/list/list.component';
import { StatusComponent } from './features/components/status/status.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent,pathMatch:"full" },
  { path: 'status', component: StatusComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'list', component: ListComponent },
  { path: '**', component: ListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}
