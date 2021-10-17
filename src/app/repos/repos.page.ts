import { Component, OnInit, ViewChild, forwardRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { Router, NavigationExtras } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalService } from "../global.service";
import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-repos",
  templateUrl: "./repos.page.html",
  styleUrls: ["./repos.page.scss"],
})
export class ReposPage implements OnInit {
  url: any;
  textMounth = "Octobre 2021";

  mois = [
    "JANVIER",
    "FEVRIER",
    "MARS",
    "AVRIL",
    "MAI",
    "JUIN",
    "JUILLET",
    "AOUT",
    "SEPTEMBRE",
    "OCTOBRE",
    "NOVEMBRE",
    "DECEMBRE",
  ];

  dateH: any;
  user: any;

  constructor(
    private sanitize: DomSanitizer,
    public loadingController: LoadingController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private router: Router,
    public globalservice: GlobalService
  ) {
    this.user = this.globalservice.getUser();
    this.dateH = new Date();
    this.dateH = new Date(this.dateH.getFullYear(), this.dateH.getMonth(), 1);
    this.textMounth =
      this.mois[this.dateH.getMonth()] + " " + this.dateH.getFullYear();

    var murl = "https://hps-crm.fr/restobj/" + this.user._id + "/rdv";
    this.http.get(murl).subscribe((results2) => {});
  }
  ngOnInit() {}

  ionViewDidEnter() {}

  decm() {
    this.dateH = new Date(this.dateH.setMonth(this.dateH.getMonth() - 1));
    this.textMounth =
      this.mois[this.dateH.getMonth()] + " " + this.dateH.getFullYear();
    //2021-10-12T08:39:38.828Z
    var tmp = new Date(this.dateH.getFullYear(), this.dateH.getMonth(), 1);
    console.log(tmp);
  }
  incm() {
    this.dateH = new Date(this.dateH.setMonth(this.dateH.getMonth() + 1));
    this.textMounth =
      this.mois[this.dateH.getMonth()] + " " + this.dateH.getFullYear();
    var tmp = new Date(this.dateH.getFullYear(), this.dateH.getMonth(), 1);
    console.log(tmp);
  }
}
