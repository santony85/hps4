import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { GlobalService } from "./global.service";
import { IonicStorageModule } from "@ionic/storage";
import { HttpClientModule } from "@angular/common/http";
import { IonicSelectableModule } from "ionic-selectable";
import { ModalproduitPageModule } from "./modalproduit/modalproduit.module";
import { Autocomplete } from "../../src/app/providers/autocomplete";
import { Api } from "../../src/app/providers/api";

import { AppVersion } from "@ionic-native/app-version/ngx";

import { IonicGestureConfig } from "./hammergestureconfig.service";

import { CallNumber } from "@ionic-native/call-number/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";

import {
  FontAwesomeModule,
  FaIconLibrary,
} from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FullCalendarModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot({
      scrollAssist: true,
      scrollPadding: false,
    }),
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ModalproduitPageModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    StatusBar,
    SplashScreen,
    GlobalService,
    Api,
    CallNumber,
    Autocomplete,
    Geolocation,
    AppVersion,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
  }
}
