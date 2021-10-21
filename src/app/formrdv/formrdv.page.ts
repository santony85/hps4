import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Autocomplete } from "../providers/autocomplete";
import { IonicSelectableComponent } from "ionic-selectable";
import { Subscription } from "rxjs";
import { Adresse } from "../providers/adresse";
import { ModalController } from "@ionic/angular";
import { ModalproduitPage } from "../modalproduit/modalproduit.page";
import { Api } from "../providers/api";
import { GlobalService } from "../global.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LoadingController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-formrdv",
  templateUrl: "./formrdv.page.html",
  styleUrls: ["./formrdv.page.scss"],
})
export class FormrdvPage implements OnInit {
  validations_form: FormGroup;
  adresses: Adresse[];
  adresse: Adresse;
  listprod = [];
  portsSubscription: Subscription;
  mmark: any;
  rdv: any = {};
  user: any = [];
  isnew = false;
  isrdv = false;
  tmpdate = "";
  tmpdatep = "";
  affAdr = 1;

  mylocate: any = "";
  tmpColor: any = "";

  txtrdv = "";

  client = {
    dateRdv: "",
    heureRDV: "",
    nom: "",
    prenom: "",
    autoCompleteCli: "",
    adresse: "",
    idadr: "",
    num: "",
    rue: "",
    cp: "",
    ville: "",
    tel: "",
    lat: "",
    long: "",
    comTele: "",
    issuerdv: "",
    issue: "",
    tranchemr: "",
    tranchemme: "",
    anneeConstr: "",
    nboccupants: "",
  };

  genders: Array<string>;
  issues: Array<string>;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private autocomplete: Autocomplete,
    public modalController: ModalController,
    private route: ActivatedRoute,
    public globalservice: GlobalService,
    private geolocation: Geolocation,
    public loadingController: LoadingController,
    public api: Api,
    private http: HttpClient
  ) {
    /*this.tmpdate = this.api.makeDateUs(new Date(), 1) + " à " + this.api.makeHour(new Date());
    this.tmpdatep = this.api.makeDateUs(new Date(), 1) + " à " + this.api.makeHourp(new Date());
    var mdate = this.api.makeDate(new Date()) + " à " + this.api.makeHour(new Date());
    this.client.dateRdv = mdate;*/

    this.route.queryParams.subscribe((params) => {
      this.user = JSON.parse(params.user);
      ////console.log(this.user);
      if (params.item !== "null") {
        this.rdv = JSON.parse(params.item);
        this.isrdv = true;
        //console.log(this.rdv);
        this.txtrdv = "rendez-vous";
        this.affAdr = 0;

        /* ORM */
        this.client.dateRdv = this.rdv.dateRdv;
        this.client.heureRDV = this.rdv.heureRDV;
        this.client.nom = this.rdv.nom;
        this.client.idadr = this.rdv.idadr;
        this.client.prenom = this.rdv.prenom;
        this.client.autoCompleteCli = this.rdv.autoCompleteCli;
        this.client.adresse = this.rdv.autoCompleteCli;
        this.client.num = this.rdv.num;
        this.client.rue = this.rdv.rue;
        this.client.cp = this.rdv.cp;
        this.client.ville = this.rdv.ville;
        this.client.tel = this.rdv.tel;
        this.client.lat = this.rdv.lat;
        this.client.long = this.rdv.long;
        this.client.comTele = this.rdv.comTele;
        this.client.issuerdv = this.rdv.issuerdv;
        this.rdv.issue = "";
        this.client.tranchemr = this.rdv.tranchemr;
        this.client.tranchemme = this.rdv.tranchemme;
        this.client.anneeConstr = this.rdv.anneeConstr;
        this.client.nboccupants = this.rdv.nboccupants;
        /* /ORM */
      } else {
        this.isnew = true;

        if (params.from == "1") {
          this.isrdv = false;
          this.txtrdv = "contact";
        } else {
          this.isrdv = true;
          this.txtrdv = "rendez-vous";
        }
        this.rdv.issue = "";
        this.rdv.dateRdv = "";
        this.rdv.heureRDV = "";
        this.rdv.nom = "";
        this.rdv.idadr = "";
        this.rdv.prenom = "";
        this.rdv.autoCompleteCli = "";
        this.rdv.adresse = "";
        this.rdv.rue = "";
        this.rdv.cp = "";
        this.rdv.ville = "";
        this.rdv.tel = "";
        this.rdv.lat = "";
        this.rdv.long = "";
        this.rdv.comTele = "";
        this.rdv.issuerdv = "";

        this.rdv.tranchemr = "";
        this.rdv.tranchemme = "";
        this.rdv.anneeConstr = "";
        this.rdv.nboccupants = "";

        this.client.dateRdv = this.rdv.dateRdv;
        this.client.heureRDV = this.rdv.heureRDV;
        this.client.nom = this.rdv.nom;
        this.client.idadr = this.rdv.idadr;
        this.client.prenom = this.rdv.prenom;
        this.client.autoCompleteCli = this.rdv.autoCompleteCli;
        this.client.adresse = this.rdv.autoCompleteCli;
        this.client.num = this.rdv.num;
        this.client.rue = this.rdv.rue;
        this.client.cp = this.rdv.cp;
        this.client.ville = this.rdv.ville;
        this.client.tel = this.rdv.tel;
        this.client.lat = this.rdv.lat;
        this.client.long = this.rdv.long;
        this.client.comTele = this.rdv.comTele;
        this.client.issuerdv = this.rdv.issuerdv;

        this.client.tranchemr = this.rdv.tranchemr;
        this.client.tranchemme = this.rdv.tranchemme;
        this.client.anneeConstr = this.rdv.anneeConstr;
        this.client.nboccupants = this.rdv.nboccupants;

        this.affAdr = 1;
      }
    });
  }

  filterPorts(ports: Adresse[], text: string) {
    return ports.filter((port) => {
      return (
        port.label.toLowerCase().indexOf(text) !== -1 ||
        port.id.toString().toLowerCase().indexOf(text) !== -1
      );
    });
  }
  onChange(event) {
    //console.log(event);
    this.tmpColor = event.detail.value.color;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalproduitPage,
    });
    modal.onDidDismiss().then((data) => {
      let res: any;
      res = data;
      if (res.data.prod !== null) {
        let mprod = res.data.prod;
        mprod.qte = res.data.qte;
        this.listprod.push(mprod);
      }
    });

    await modal.present();
  }

  ngOnInit() {
    this.genders = ["Mr", "Mme", "MrMme"];
    let env = this;

    this.globalservice.getIssues(function (data) {
      env.issues = data;
      //console.log(data);
    });
    var dtrdv = "";
    var hrrdv = "";
    if (this.isnew && !this.isrdv) {
      var dn = new Date().toISOString();
      dtrdv = dn;
      hrrdv = this.globalservice.formatHeure(dn);
    }
    //this.user=this.globalservice.user();
    this.validations_form = this.formBuilder.group({
      dateRdv: new FormControl(dtrdv, Validators.required),
      heureRDV: new FormControl(hrrdv, Validators.required),
      rapport: new FormControl(""),
      comTele: new FormControl(""),
      adresse: new FormControl(
        this.client.autoCompleteCli,
        Validators.required
      ),
      autoCompleteCli: new FormControl(
        this.client.autoCompleteCli,
        Validators.required
      ),
      idadr: new FormControl(this.client.idadr),
      num: new FormControl(this.client.num),
      rue: new FormControl(this.client.rue),
      cp: new FormControl(this.client.cp),
      ville: new FormControl(this.client.ville),
      lat: new FormControl(this.client.lat),
      long: new FormControl(this.client.long),
      tel: new FormControl(this.client.tel, Validators.required),
      nom: new FormControl(this.client.nom, Validators.required),
      prenom: new FormControl(this.client.prenom, Validators.required),
      gender: new FormControl(this.genders[0], Validators.required),
      issuerdv: new FormControl(""),
      tranchemr: new FormControl(this.client.tranchemr),
      tranchemme: new FormControl(this.client.tranchemme),
      anneeConstr: new FormControl(this.client.anneeConstr),
      nboccupants: new FormControl(this.client.nboccupants),
    });
  }

  validation_messages = {
    dateRdv: [{ type: "required", message: "Le nom est obligatoire." }],
    nom: [{ type: "required", message: "Le prénom est obligatoire." }],
    prenom: [{ type: "required", message: "Le prénom est obligatoire." }],
    tel: [{ type: "required", message: "Le téléphone est obligatoire." }],
    heureRDV: [{ type: "required", message: "Ce champs est obligatoire." }],
    adresse: [{ type: "required", message: "Le téléphone est obligatoire." }],
    autoCompleteCli: [
      { type: "required", message: "Ce champs est obligatoire." },
    ],
  };

  searchPorts(event: { component: IonicSelectableComponent; text: string }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    //console.log(text);
    // Close any running subscription.
    if (this.portsSubscription) {
      this.portsSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.portsSubscription) {
        this.portsSubscription.unsubscribe();
      }

      event.component.items = [];
      event.component.endSearch();
      return;
    }
    let env = this;
    this.autocomplete.getAdresse(text, function (madr) {
      event.component.items = madr;
      event.component.endSearch();
    });
  }

  ionViewWillLeave() {}

  portChange(event: { component: IonicSelectableComponent; value: any }) {
    //console.log(event.value);
    this.validations_form.controls["autoCompleteCli"].setValue(
      event.value.label
    );
    this.validations_form.controls["adresse"].setValue(event.value.label);
    this.validations_form.controls["idadr"].setValue(event.value.id);
    this.validations_form.controls["num"].setValue(event.value.num);
    this.validations_form.controls["rue"].setValue(event.value.rue);
    this.validations_form.controls["cp"].setValue(event.value.cp);
    this.validations_form.controls["ville"].setValue(event.value.ville);
    this.validations_form.controls["lat"].setValue(event.value.lat);
    this.validations_form.controls["long"].setValue(event.value.lng);
  }

  async reverseAdr() {
    let env = this;
    var loading = await this.loadingController.create({
      message: "Localisation...",
    });
    await loading.present();
    //this.map2.locate().on("locationfound", (e: any) => {
    this.geolocation.getCurrentPosition().then((resp) => {
      //env.mmark.setLatLng(e.latlng);
      env.autocomplete.getReverse(
        resp.coords.latitude,
        resp.coords.longitude,
        function (madr) {
          env.validations_form.controls["autoCompleteCli"].setValue(
            madr[0].label
          );
          env.validations_form.controls["adresse"].setValue(madr[0].label);
          env.validations_form.controls["idadr"].setValue(madr[0].id);
          env.validations_form.controls["num"].setValue(madr[0].num);
          env.validations_form.controls["rue"].setValue(madr[0].rue);
          env.validations_form.controls["cp"].setValue(madr[0].cp);
          env.validations_form.controls["ville"].setValue(madr[0].ville);
          env.validations_form.controls["lat"].setValue(madr[0].lat);
          env.validations_form.controls["long"].setValue(madr[0]);
          loading.dismiss();
          //if(env.mylocate=="")env.mylocate=madr[0];
        }
      );
    });
  }

  onSubmit(values) {
    let env = this;
    /* ORM */
    this.rdv.nom = values.nom;
    this.rdv.idadr = values.idadr;
    this.rdv.prenom = values.prenom;
    //this.rdv.autoCompleteCli = values.autoCompleteCli;
    this.rdv.adresse = values.autoCompleteCli;

    delete this.rdv.autoCompleteCli;

    this.rdv.num = values.num;
    this.rdv.rue = values.rue;
    this.rdv.cp = values.cp;
    this.rdv.ville = values.ville;
    this.rdv.tel = values.tel;
    this.rdv.lat = String(values.lat);
    this.rdv.long = String(values.long);
    this.rdv.comTele = values.comTele;
    this.rdv.source = values.gender;
    this.rdv.lat = "" + this.rdv.lat;
    this.rdv.long = "" + this.rdv.long;

    this.rdv.tranchemr = values.tranchemr;
    this.rdv.tranchemme = values.tranchemme;
    this.rdv.anneeConstr = values.anneeConstr;
    this.rdv.nboccupants = values.nboccupants;
    this.rdv.aff = "2";

    if (!this.isnew) {
      console.log("formrdv");
      this.rdv.issuerdv = "CONFIRME";
      this.rdv.dateRdv = values.dateRdv;
      this.rdv.heureRDV = this.globalservice.formatHeure(values.heureRDV);
      this.rdv.status = "rdv";

      var murl = "https://hps-crm.fr/addobj/newhpsrdv";
      this.http.post(murl, this.rdv).subscribe((results2) => {
        console.log(results2);
        env.router.navigate(["/home"]);
      });
    } else {
      console.log("formrdvelse");

      var dn = new Date().toISOString();
      this.rdv.datepriserdv = dn;
      this.rdv.idtel = "";
      this.rdv.nomtel = "";
      this.rdv.nomcomhps1 = this.user.prenom + " " + this.user.nom;
      this.rdv.idcomhps1 = this.user._id;
      this.rdv.nomcomhps2 = "";
      this.rdv.idcomhps2 = "";
      this.rdv.issue = "";

      // si rdv
      if (this.isrdv) {
        this.rdv.issuerdv = "CONFIRME";
        this.rdv.dateRdv = values.dateRdv;
        this.rdv.heureRDV = this.globalservice.formatHeure(values.heureRDV);
        this.rdv.origine = "rdv";
        this.rdv.status = "rdv";
      } else {
        this.rdv.dateRdv = values.dateRdv;
        this.rdv.heureRDV = values.heureRDV;
        this.rdv.issuerdv = "";
        this.rdv.origine = "contact";
        this.rdv.status = "contact";
      }
      var murl = "https://hps-crm.fr/addobj/newhpsrdv";
      this.http.post(murl, this.rdv).subscribe((results2) => {
        console.log(results2);
        env.router.navigate(["/home"]);
      });
    }
  }
}
