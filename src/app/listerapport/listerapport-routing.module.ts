import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListerapportPage } from './listerapport.page';

const routes: Routes = [
  {
    path: '',
    component: ListerapportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListerapportPageRoutingModule {}
