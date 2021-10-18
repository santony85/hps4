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
  nbRdv = 0;
  rdv: any = [];

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
    console.log(this.user._id);
    this.dateH = new Date();
    this.dateH = new Date(this.dateH.getFullYear(), this.dateH.getMonth(), 1);
    this.textMounth =
      this.mois[this.dateH.getMonth()] + " " + this.dateH.getFullYear();
  }
  ngOnInit() {}

  ionViewDidEnter() {}

  decm() {
    this.dateH = new Date(this.dateH.setMonth(this.dateH.getMonth() - 1));
    this.textMounth =
      this.mois[this.dateH.getMonth()] + " " + this.dateH.getFullYear();

    var m = this.dateH.getMonth() + 1;
    if (m < 10) m = "0" + m;
    var txtt = this.dateH.getFullYear() + "-" + m + "-01T23:00:00.000Z";
    console.log(this.user._id);
    let env = this;
    var murl = "https://hps-crm.fr/listrelance/" + this.user._id + "/" + txtt;
    this.http.get(murl).subscribe((results2) => {
      let tar = [];
      console.log(results2);
      tar = results2;
      env.nbRdv = tar.length;
      this.rdv = results2;
    });
  }
  incm() {
    this.dateH = new Date(this.dateH.setMonth(this.dateH.getMonth() + 1));
    this.textMounth =
      this.mois[this.dateH.getMonth()] + " " + this.dateH.getFullYear();

    var m = this.dateH.getMonth() + 1;
    if (m < 10) m = "0" + m;
    var txtt = this.dateH.getFullYear() + "-" + m + "-01T23:00:00.000Z";
    console.log(this.user._id);
    let env = this;
    var murl = "https://hps-crm.fr/listrelance/" + this.user._id + "/" + txtt;
    this.http.get(murl).subscribe((results2) => {
      let tar = [];
      console.log(results2);
      tar = results2;
      env.nbRdv = tar.length;
      this.rdv = results2;
    });
  }
  affRdv(item) {
    //if (this.segmentModel == "rdv" || this.segmentModel == "retard") {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        item: JSON.stringify(item),
        user: JSON.stringify(this.globalservice.getUser()),
      },
    };
    this.router.navigate(["/formrdv"], navigationExtras);
    /*} else if (this.segmentModel == "j1") {
      this.presentCheckboxConfirm(item);
    } else this.presentCheckboxContact(item);*/
  }
}
