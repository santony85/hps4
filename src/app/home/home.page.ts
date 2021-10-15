import { Component } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { GlobalService } from "../global.service";
import { MenuController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

import { CallNumber } from "@ionic-native/call-number/ngx";
import { LoadingController } from "@ionic/angular";

import { Storage } from "@ionic/storage";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  rdv: any = [];
  segmentModel = "rdv";
  maj = "";

  ntous = 0;
  nrdv = 0;
  naconf = 0;
  ncontact = 0;
  nretard = 0;

  affBadge = 0;

  constructor(
    private router: Router,
    public globalservice: GlobalService,
    public menuCtrl: MenuController,
    private callNumber: CallNumber,
    public loadingController: LoadingController,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.swipeGesture(false);
    this.menuCtrl.enable(true);
    this.globalservice.loadUser();

    this.synchro();
  }

  countNbAction() {
    this.globalservice.getNbAConfirmer().then((data) => {
      this.naconf = data["data"].length;
    });
    this.globalservice.getNbRdv().then((data) => {
      this.nrdv = data["data"].length;
    });
    this.globalservice.getNbContact().then((data) => {
      this.ncontact = data["data"].length;
    });
    this.globalservice.getNbRetard().then((data) => {
      this.nretard = data["data"].length;
    });
  }

  async synchro() {
    let env = this;
    const alert = await this.alertCtrl.create({
      header: "Synchronisation",
      message: "Enregistrement effectuée avec succès",
      buttons: ["OK"],
    });

    var loading = await this.loadingController.create({
      message: "Synchronisation...",
    });
    await loading.present();
    //this.storage.set('rdv', []);
    env.globalservice.updateRdvAll(function (data) {
      env.globalservice.loadRdv().then((datax) => {
        env.segmentModel = "rdv";
        env.affBadge = 0;
        env.globalservice.getNbRdv().then((data) => {
          env.rdv = data["data"];
          env.maj = data["maj"];
          env.countNbAction();
          loading.dismiss();
          alert.present();

          env.globalservice.getRdv().then((datax) => {
            env.globalservice.getNbRdv().then((data) => {
              //console.log(data["data"])

              env.rdv = data["data"];
              env.maj = data["maj"];

              var now = new Date().getTime();
              var theDate = new Date(env.maj).getTime();
              const oneday = 60 * 60 * 24 * 1000;

              var cmpDate = now - theDate > oneday;
              if (cmpDate)
                alert("Votre dernière synchronisation à plus de 24h.");

              //console.log(cmpDate)
            });
            env.countNbAction();
            env.segmentModel = "rdv";
          });
        });
      });
    });
  }

  tst(item) {
    alert(item);
  }

  async presentCheckboxNew() {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Nouveau",
      inputs: [
        {
          name: "radio1",
          type: "radio",
          label: "Rendez-vous",
          value: "0",
          checked: true,
        },
        {
          name: "radio2",
          type: "radio",
          label: "Contact",
          value: "1",
        },
        {
          name: "radio3",
          type: "radio",
          label: "Prospect",
          value: "2",
        },
        {
          name: "radio3",
          type: "radio",
          label: "Evenement",
          value: "3",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            //console.log('Confirm Cancel');
          },
        },
        {
          text: "Ok",
          handler: (data: string) => {
            if (data != "2") {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  item: JSON.stringify(null),
                  user: JSON.stringify(this.globalservice.getUser()),
                  from: data,
                },
              };
              this.router.navigate(["/formrdv"], navigationExtras);
            } else {
              //this.affRdv(null);
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  item: JSON.stringify(null),
                  user: JSON.stringify(this.globalservice.getUser()),
                },
              };
              this.router.navigate(["/formrapport"], navigationExtras);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async presentCheckboxConfirm(item) {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Issues",
      inputs: [
        {
          name: "radio1",
          type: "radio",
          label: "ABS",
          value: "ABS",
          cssClass: "ABS",
          checked: true,
        },
        {
          name: "radio2",
          type: "radio",
          label: "Confirmer",
          value: "CONFIRME",
        },
        {
          name: "radio3",
          type: "radio",
          label: "Refus",
          value: "REFUS",
        },
        {
          name: "radio4",
          type: "radio",
          label: "Appeler",
          value: "3",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: (data: string) => {
            if (data == "3") {
              this.callNumber
                .callNumber(item.tel, true)
                .then((res) => console.log("Launched dialer!", res))
                .catch((err) => console.log("Error launching dialer", err));
            } else {
              item.issuerdv = data;
              //console.log(item)
              //update local
              let env = this;
              this.globalservice.updateRdvLocal(item, function (res) {
                //console.log(res);
                //reload confirm
                env.countNbAction();
                env.globalservice.getNbAConfirmer().then((data) => {
                  env.rdv = data["data"];
                  env.maj = data["maj"];
                });
              });
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async presentCheckboxContact(item) {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Issues",
      inputs: [
        {
          name: "radio1",
          type: "radio",
          label: "ABS",
          value: "ABS",
          checked: true,
        },
        {
          name: "radio2",
          type: "radio",
          label: "Prendre RDV",
          value: "PRDV",
        },
        {
          name: "radio3",
          type: "radio",
          label: "Refus",
          value: "REFUS",
        },
        {
          name: "radio4",
          type: "radio",
          label: "Appeler",
          value: "3",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            //console.log('Confirm Cancel');
          },
        },
        {
          text: "Ok",
          handler: (data: string) => {
            if (data == "1") {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  item: JSON.stringify(item),
                  user: JSON.stringify(this.globalservice.getUser()),
                },
              };
              this.router.navigate(["/formrapport"], navigationExtras);
            } else if (data == "PRDV") {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  item: JSON.stringify(item),
                  user: JSON.stringify(this.globalservice.getUser()),
                },
              };
              this.router.navigate(["/formrdv"], navigationExtras);
            } else if (data == "3") {
              this.callNumber
                .callNumber(item.tel, true)
                .then((res) => console.log("Launched dialer!", res))
                .catch((err) => console.log("Error launching dialer", err));
            }
          },
        },
      ],
    });
    await alert.present();
  }

  affRdv(item) {
    if (this.segmentModel == "rdv" || this.segmentModel == "retard") {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          item: JSON.stringify(item),
          user: JSON.stringify(this.globalservice.getUser()),
        },
      };
      this.router.navigate(["/formrapport"], navigationExtras);
    } else if (this.segmentModel == "j1") {
      this.presentCheckboxConfirm(item);
    } else this.presentCheckboxContact(item);
  }

  segmentChanged(event) {
    if (this.segmentModel == "rdv") {
      this.affBadge = 0;
      this.globalservice.getNbRdv().then((data) => {
        this.rdv = data["data"];
        this.maj = data["maj"];
      });
    } else if (this.segmentModel == "contact") {
      this.affBadge = 0;
      this.globalservice.getNbContact().then((data) => {
        this.rdv = data["data"];
        this.maj = data["maj"];
      });
    } else if (this.segmentModel == "retard") {
      this.affBadge = 1;
      this.globalservice.getNbRetard().then((data) => {
        this.rdv = data["data"];
        this.maj = data["maj"];
      });
    } else {
      this.affBadge = 1;
      this.globalservice.getNbAConfirmer().then((data) => {
        this.rdv = data["data"];
        this.maj = data["maj"];
      });
    }
  }
}
