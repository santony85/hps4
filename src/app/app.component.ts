import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Storage } from "@ionic/storage";
import { Router, NavigationExtras } from "@angular/router";

import { AppVersion } from "@ionic-native/app-version/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  navigate: any;
  vernum = "X.X.X";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private router: Router,
    private appVersion: AppVersion,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.sideMenu();
    this.storage.get("user").then((user) => {
      this.appVersion.getVersionNumber().then((value) => {
        this.vernum = value;
      });
      if (user.iscdv == "true") this.sideMenuCDV();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  deconnect() {
    this.storage.set("user", null);
    this.router.navigate(["/login"]);
  }

  sideMenu() {
    this.navigate = [
      {
        title: "Ma journée",
        url: "/home",
        icon: "today",
      },
      {
        title: "Mon agenda",
        url: "/scheduler",
        icon: "calendar",
      },
      /*{
        title : "Ma carte",
        url   : "/mapview",
        icon  : "map"
      },*/
      {
        title: "Mes clients",
        url: "/listeclient",
        icon: "person",
      },
      {
        title: "Mes rapports",
        url: "/listerapport",
        icon: "clipboard",
      },
      {
        title: "Mes evenements",
        url: "/evenement",
        icon: "clipboard",
      },
      {
        title: "Mes reports",
        url: "/repos",
        icon: "clipboard",
      },
      {
        title: "Deconnexion",
        url: "/deconnect",
        icon: "log-out",
      },
    ];
  }
  sideMenuCDV() {
    this.navigate = [
      {
        title: "Ma journée",
        url: "/home",
        icon: "today",
      },
      {
        title: "Ma carte",
        url: "/mapview",
        icon: "map",
      },
      {
        title: "Mes clients",
        url: "/listeclient",
        icon: "person",
      },
      {
        title: "Mes rapports",
        url: "/listerapport",
        icon: "clipboard",
      },
      {
        title: "Mon équipe",
        url: "/rapport",
        icon: "calculator",
      },
      {
        title: "Deconnexion",
        url: "/deconnect",
        icon: "log-out",
      },
    ];
  }
}
