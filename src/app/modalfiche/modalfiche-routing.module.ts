import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalfichePage } from './modalfiche.page';

const routes: Routes = [
  {
    path: '',
    component: ModalfichePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalfichePageRoutingModule {}
