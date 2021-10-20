import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EvenementPageRoutingModule } from "./evenement-routing.module";

import { EvenementPage } from "./evenement.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EvenementPageRoutingModule,
  ],
  declarations: [EvenementPage],
})
export class EvenementPageModule {}
