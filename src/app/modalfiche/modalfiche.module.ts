import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalfichePageRoutingModule } from './modalfiche-routing.module';

import { ModalfichePage } from './modalfiche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalfichePageRoutingModule
  ],
  declarations: [ModalfichePage]
})
export class ModalfichePageModule {}
