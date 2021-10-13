import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReposPageRoutingModule } from './repos-routing.module';

import { ReposPage } from './repos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReposPageRoutingModule
  ],
  declarations: [ReposPage]
})
export class ReposPageModule {}
