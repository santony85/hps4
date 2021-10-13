import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReposPage } from './repos.page';

const routes: Routes = [
  {
    path: '',
    component: ReposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReposPageRoutingModule {}
