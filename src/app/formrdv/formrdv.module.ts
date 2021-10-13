import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormrdvPageRoutingModule } from './formrdv-routing.module';
import { FormrdvPage } from './formrdv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    FormrdvPageRoutingModule
  ],
  declarations: [FormrdvPage]
})
export class FormrdvPageModule {}
