import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeclientPage } from './listeclient.page';

const routes: Routes = [
  {
    path: '',
    component: ListeclientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeclientPageRoutingModule {}
