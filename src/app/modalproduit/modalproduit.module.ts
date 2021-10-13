import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalproduitPageRoutingModule } from './modalproduit-routing.module';

import { ModalproduitPage } from './modalproduit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalproduitPageRoutingModule
  ],
  declarations: [ModalproduitPage]
})
export class ModalproduitPageModule {}
