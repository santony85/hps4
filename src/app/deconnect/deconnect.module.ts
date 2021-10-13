import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeconnectPageRoutingModule } from './deconnect-routing.module';

import { DeconnectPage } from './deconnect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeconnectPageRoutingModule
  ],
  declarations: [DeconnectPage]
})
export class DeconnectPageModule {}
