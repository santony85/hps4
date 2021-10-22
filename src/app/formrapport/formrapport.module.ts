import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { IonicSelectableModule } from "ionic-selectable";
import { FormrapportPageRoutingModule } from "./formrapport-routing.module";
import { FormrapportPage } from "./formrapport.page";
//import { ModalproduitPageModule} from '../modalproduit/modalproduit.module'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    //ModalproduitPageModule,
    FormrapportPageRoutingModule,
  ],
  declarations: [FormrapportPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormrapportPageModule {}
