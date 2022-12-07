import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { DetailsComponent } from './features/components/details/details.component';
import { ListComponent } from './features/components/list/list.component';
import { StatusComponent } from './features/components/status/status.component';

const routes: Routes = [
  { path: '', loadChildren: ()=>import('./features/components/categories/categories.module').then(m=>m.CategoriesModule) },
  { path: 'status', loadChildren: ()=>import('./features/components/status/status.module').then(m=>m.StatusModule) },
  { path: 'list', loadChildren: ()=>import('./features/components/list/list.module').then(m=>m.ListModule) },
  { path: 'details', loadChildren: ()=>import('./features/components/details/details.module').then(m=>m.DetailsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}
