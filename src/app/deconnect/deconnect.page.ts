import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Router, NavigationExtras } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { GlobalService } from "../global.service";

@Component({
  selector: "app-deconnect",
  templateUrl: "./deconnect.page.html",
  styleUrls: ["./deconnect.page.scss"],
})
export class DeconnectPage {
  constructor(
    private storage: Storage,
    private router: Router,
    private alertCtrl: AlertController,
    public globalservice: GlobalService,
    public loadingController: LoadingController
  ) {}
  ionViewWillEnter() {
    this.affAlert();
  }
  async affAlert() {
    const alert = await this.alertCtrl.create({
      header: "Déconnexion",
      message: "Effectuer la synchronisation et se déconnecter ?",
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            //console.log('Confirm Cancel');
            this.router.navigate(["/home"]);
          },
        },
        {
          text: "Déconnexion",
          cssClass: "primary",
          handler: () => {
            //console.log('Confirm Deco');
            this.synchro();
          },
        },
      ],
    });

    await alert.present();

    //this.storage.set('user',null);
    //this.router.navigate(["/login"]);
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
    //this.storage.set('rdv', []);
    // env.globalservice.updateRdvAll(function(data){
    loading.dismiss();
    env.storage.set("rdv", []);
    env.storage.remove("user");
    env.storage.set("client", []);
    env.storage.set("issue", []);
    env.storage.set("issues", []);
    env.storage.set("new", []);
    env.storage.set("familles", []);
    env.storage.set("produits", []);
    env.router.navigate(["/login"]);

    //})
  }
}
