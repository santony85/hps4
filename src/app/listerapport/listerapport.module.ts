import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListerapportPageRoutingModule } from './listerapport-routing.module';

import { ListerapportPage } from './listerapport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListerapportPageRoutingModule
  ],
  declarations: [ListerapportPage]
})
export class ListerapportPageModule {}
