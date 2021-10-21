import { Component, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { GlobalService } from "../global.service";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-listerapport",
  templateUrl: "./listerapport.page.html",
  styleUrls: ["./listerapport.page.scss"],
})
export class ListerapportPage implements OnInit {
  nbRapport = 0;
  rapports: any = [];

  d1 = "";
  d2 = "";
  fnom = "";
  maj = "";

  constructor(
    private router: Router,
    public globalservice: GlobalService,
    public loadingController: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.globalservice.getNbRapports().then((data) => {
      this.rapports = data["data"];
      this.nbRapport = this.rapports.length;
      this.maj = data["maj"];
    });
    this.d1 = new Date().toISOString();
    this.d2 = new Date().toISOString();
    console.log("ici");
  }

  ngOnInit() {}

  setToday() {
    this.fnom = "";
    this.globalservice.getNbRapports().then((data) => {
      this.rapports = data["data"];
      this.nbRapport = this.rapports.length;
      this.maj = data["maj"];
    });
  }

  getDateRapport() {
    this.fnom = "";
    console.log(new Date(this.d1).toISOString());

    this.globalservice
      .getDateRapportList(
        new Date(this.d1).toISOString(),
        new Date(this.d2).toISOString()
      )
      .then((data) => {
        this.rapports = data;
        this.nbRapport = this.rapports.length;
      });
  }

  onChangeNom(val, field) {
    //console.log("ici")
    if (val.length > 1) {
      this.globalservice.getLikeRapportList(val, field).then((data) => {
        this.rapports = data;
        this.nbRapport = this.rapports.length;
        //this.maj = data["maj"];
      });
    }
  }

  async synchro() {
    let env = this;
    const alert = await this.alertCtrl.create({
      header: "Synchronisation",
      message: "Mise a jour effectuée avec succès",
      buttons: ["OK"],
    });

    var loading = await this.loadingController.create({
      message: "Synchronisation...",
    });
    await loading.present();

    env.globalservice.updateRdvAll(function (data) {
      //console.log(data)
      env.globalservice.loadRdv().then((datax) => {
        env.globalservice.getNbRapports().then((datar) => {
          env.rapports = datar["data"];
          env.nbRapport = env.rapports.length;
          env.maj = datar["maj"];
          loading.dismiss();
          alert.present();
        });
      });
    });
  }
  affRdv(item) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        item: JSON.stringify(item),
        user: JSON.stringify(this.globalservice.getUser()),
        from: "/listrapport",
      },
    };
    this.router.navigate(["/formrapport"], navigationExtras);
  }
}
