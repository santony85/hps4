import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ReposPageRoutingModule } from "./repos-routing.module";
import { ReposPage } from "./repos.page";
import { FullCalendarModule } from "@fullcalendar/angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReposPageRoutingModule,
    FullCalendarModule,
  ],
  declarations: [ReposPage],
})
export class ReposPageModule {}
