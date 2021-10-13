import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeclientPageRoutingModule } from './listeclient-routing.module';

import { ListeclientPage } from './listeclient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeclientPageRoutingModule
  ],
  declarations: [ListeclientPage]
})
export class ListeclientPageModule {}
