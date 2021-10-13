import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SchedulerPageRoutingModule } from './scheduler-routing.module';
import { SchedulerPage } from './scheduler.page';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullCalendarModule,
    SchedulerPageRoutingModule
  ],
  declarations: [SchedulerPage]
})
export class SchedulerPageModule {}
