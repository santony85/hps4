import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormrapportPage } from './formrapport.page';

const routes: Routes = [
  {
    path: '',
    component: FormrapportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormrapportPageRoutingModule {}
