import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormrdvPage } from './formrdv.page';

const routes: Routes = [
  {
    path: '',
    component: FormrdvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormrdvPageRoutingModule {}
