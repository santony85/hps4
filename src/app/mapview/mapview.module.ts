import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapviewPageRoutingModule } from './mapview-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MapviewPage } from './mapview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    MapviewPageRoutingModule
  ],
  declarations: [MapviewPage]
})
export class MapviewPageModule {}
