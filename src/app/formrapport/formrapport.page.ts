import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ɵCodegenComponentFactoryResolver,
} from "@angular/core";
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

@Component({
  selector: "app-formrapport",
  templateUrl: "./formrapport.page.html",
  styleUrls: ["./formrapport.page.scss"],
})
export class FormrapportPage implements OnInit {
  validations_form: FormGroup;
  adresses: Adresse[];
  adresse: Adresse;
  listprod = [];
  portsSubscription: Subscription;
  mmark: any;
  rdv: any = {};
  user: any = [];
  isnew = false;
  tmpdate = "";
  tmpdatep = "";
  affAdr = 1;

  isrdv = true;

  repos: any = [
    { id: "01", name: "JANVIER" },
    { id: "02", name: "FEVRIER" },
    { id: "03", name: "MARS" },
    { id: "04", name: "AVRIL" },
    { id: "05", name: "MAI" },
    { id: "06", name: "JUIN" },
    { id: "07", name: "JUILLET" },
    { id: "08", name: "AOUT" },
    { id: "09", name: "SEPTEMBRE" },
    { id: "10", name: "OCTOBRE" },
    { id: "11", name: "NOVEMBRE" },
    { id: "12", name: "DECEMBRE" },
  ];

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
  textMounth = "Octobre 2021";

  mylocate: any = "";
  tmpColor: any = "";
  affVente = 0;
  affRepo = 0;

  client = {
    dateRdv: "",
    heureRDV: "",

    date: "",
    tele: "",
    nom: "",
    prenom: "",
    autoCompleteCli: "",
    adresse: "",
    idadr: "",
    numAdr: "",
    rue: "",
    cp: "",
    ville: "",
    tel: "",
    lat: "",
    long: "",
    comTele: "",
    issue: "",
    color: "",
    issuerdv: "",

    montant: "",
    mens: "",
    nbmens: "",
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
    public api: Api
  ) {
    this.dateH = new Date();
    this.dateH = new Date(this.dateH.getFullYear(), this.dateH.getMonth(), 1);
    this.textMounth =
      this.mois[this.dateH.getMonth()] + " " + this.dateH.getFullYear();

    this.tmpdate =
      this.api.makeDateUs(new Date(), 1) +
      " à " +
      this.api.makeHour(new Date());
    this.tmpdatep =
      this.api.makeDateUs(new Date(), 1) +
      " à " +
      this.api.makeHourp(new Date());
    var mdate =
      this.api.makeDate(new Date()) + " à " + this.api.makeHour(new Date());
    this.client.date = mdate;
    //console.log()

    this.route.queryParams.subscribe((params) => {
      this.user = JSON.parse(params.user);
      ////console.log(this.user);
      if (params.item !== "null") {
        this.rdv = JSON.parse(params.item);
        //console.log(this.rdv)
        var rdt =
          this.globalservice.formatDate(this.rdv.dateRdv) +
          " à " +
          this.rdv.heureRDV;
        this.affAdr = 0;

        /* ORM */
        this.client.dateRdv = this.rdv.dateRdv;
        this.client.heureRDV = this.rdv.heureRDV;

        this.client.date = rdt;
        this.client.tele = this.rdv.nomtel;
        this.client.nom = this.rdv.nom;
        this.client.idadr = this.rdv.idadr;
        this.client.prenom = this.rdv.prenom;
        this.client.autoCompleteCli = this.rdv.autoCompleteCli;
        this.client.adresse = this.rdv.autoCompleteCli;
        this.client.numAdr = this.rdv.numAdr;
        this.client.rue = this.rdv.rue;
        this.client.cp = this.rdv.cp;
        this.client.ville = this.rdv.ville;
        this.client.tel = this.rdv.tel;
        this.client.lat = this.rdv.lat;
        this.client.long = this.rdv.long;
        this.client.comTele = this.rdv.comTele;
        this.client.issue = this.rdv.issue;

        this.client.color = this.rdv.issue;

        this.client.montant = this.rdv.montant;
        this.client.mens = this.rdv.mens;
        this.client.nbmens = this.rdv.nbmens;
        /* /ORM */
      } else {
        this.isnew = true;
        this.affAdr = 1;

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
        this.client.dateRdv = this.rdv.dateRdv;
        this.client.heureRDV = this.rdv.heureRDV;
        this.client.nom = this.rdv.nom;
        this.client.idadr = this.rdv.idadr;
        this.client.prenom = this.rdv.prenom;
        this.client.autoCompleteCli = this.rdv.autoCompleteCli;
        this.client.adresse = this.rdv.autoCompleteCli;
        this.client.numAdr = this.rdv.numAdr;
        this.client.rue = this.rdv.rue;
        this.client.cp = this.rdv.cp;
        this.client.ville = this.rdv.ville;
        this.client.tel = this.rdv.tel;
        this.client.lat = this.rdv.lat;
        this.client.long = this.rdv.long;
        this.client.comTele = this.rdv.comTele;
        this.client.issuerdv = this.rdv.issuerdv;
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
    console.log(event.detail.value);
    if (event.detail.value == "VENTE") {
      this.affVente = 1;
      this.affRepo = 0;
      this.validations_form.controls["rapport"].setValidators(null);
      this.validations_form.controls["rapport"].updateValueAndValidity();
    } else if (event.detail.value == "RELANCE") {
      this.affVente = 0;
      this.affRepo = 1;
      this.validations_form.controls["rapport"].setValidators([
        Validators.required,
      ]);
      this.validations_form.controls["rapport"].updateValueAndValidity();
    } else {
      this.affVente = 0;
      this.affRepo = 0;
      this.validations_form.controls["rapport"].setValidators(null);
      this.validations_form.controls["rapport"].updateValueAndValidity();
    }
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
        mprod.prix = res.data.prix;
        this.listprod.push(mprod);
        mprod.array.forEach((element) => {});
        //console.log(this.listprod)
      }
    });

    await modal.present();
  }

  ngOnInit() {
    this.genders = ["Mr", "Mme", "MrMme"];
    let env = this;

    this.globalservice.getIssues(function (data) {
      env.issues = data;
      console.log(data);
    });
    var dtrdv = "";
    var hrrdv = "";
    if (this.isnew && !this.isrdv) {
      var dn = new Date().toISOString();
      dtrdv = dn;
      hrrdv = this.globalservice.formatHeure(dn);
    }
    this.validations_form = this.formBuilder.group({
      dateRdv: new FormControl(dtrdv),
      heureRDV: new FormControl(hrrdv),
      date: new FormControl(this.client.date),
      tele: new FormControl(this.client.tele),
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
      numAdr: new FormControl(this.client.numAdr),
      rue: new FormControl(this.client.rue),
      cp: new FormControl(this.client.cp),
      ville: new FormControl(this.client.ville),
      lat: new FormControl(this.client.lat),
      long: new FormControl(this.client.long),
      tel: new FormControl(this.client.tel, Validators.required),
      nom: new FormControl(this.client.nom, Validators.required),
      prenom: new FormControl(this.client.prenom, Validators.required),
      gender: new FormControl(this.genders[0], Validators.required),
      issue: new FormControl("", Validators.required),
      montant: new FormControl(this.client.montant),
      mens: new FormControl(this.client.mens),
      nbmens: new FormControl(this.client.nbmens),
    });
  }

  validation_messages = {
    nom: [{ type: "required", message: "Le nom est obligatoire." }],
    prenom: [{ type: "required", message: "Le prénom est obligatoire." }],
    tel: [{ type: "required", message: "Le téléphone est obligatoire." }],
    issue: [{ type: "required", message: "Ce champs est obligatoire." }],
    rapport: [{ type: "required", message: "Ce champs est obligatoire." }],
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
    this.validations_form.controls["numAdr"].setValue(event.value.num);
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
          env.validations_form.controls["numAdr"].setValue(madr[0].num);
          env.validations_form.controls["rue"].setValue(madr[0].rue);
          env.validations_form.controls["cp"].setValue(madr[0].cp);
          env.validations_form.controls["ville"].setValue(madr[0].ville);
          env.validations_form.controls["lat"].setValue(madr[0].lat);
          env.validations_form.controls["long"].setValue(madr[0].lng);
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
    this.rdv.autoCompleteCli = values.autoCompleteCli;

    this.rdv.adresse = values.autoCompleteCli;

    this.rdv.numAdr = values.numAdr;
    this.rdv.rue = values.rue;
    this.rdv.cp = values.cp;
    this.rdv.ville = values.ville;
    this.rdv.tel = values.tel;
    this.rdv.lat = String(values.lat);
    this.rdv.long = String(values.long);
    this.rdv.comTele = values.comTele;
    this.rdv.issue = values.issue;

    this.issues.forEach((elm) => {
      if (elm["nom"] == values.issue) env.rdv.color = elm["color"];
    });

    this.rdv.produits = this.listprod;

    this.rdv.montant = values.montant;
    this.rdv.mens = values.mens;
    this.rdv.nbmens = values.nbmens;

    this.rdv.rapport = values.rapport;

    this.rdv.civilite = values.gender;
    if (this.affRepo == 1) {
      this.rdv.status = "relance";

      console.log(this.dateH);
      var dt = new Date(
        this.dateH.getFullYear(),
        this.dateH.getMonth(),
        2,
        0,
        0
      );
      console.log(dt);
      this.rdv.daterelance = dt;
    } else this.rdv.status = "rapport";
    this.rdv.DateSign = this.rdv.dateRdv;

    //si status == relance
    //date relance

    if (!this.isnew) {
      this.globalservice.updateRdv(this.rdv, function (res) {
        env.router.navigate(["/home"]);
      });
    } else {
      var dn = new Date().toISOString();
      this.rdv.datepriserdv = dn;
      this.rdv.idtel = "";
      this.rdv.nomtel = "";
      this.rdv.source = this.rdv.civilite;
      this.rdv.nomcomhps1 = this.user.nom;
      this.rdv.idcomhps1 = this.user._id;
      this.rdv.nomcomhps2 = "";
      this.rdv.idcomhps2 = "";
      this.rdv.source = this.rdv.civilite;
      // si rdv
      this.rdv.issuerdv = "CONFIRME";
      this.rdv.dateRdv = dn;
      this.rdv.heureRDV = this.globalservice.formatHeure(values.heureRDV);
      this.rdv.origine = "rdv";
      if (this.affRepo == 1) {
        this.rdv.status = "relance";
        console.log(this.dateH);
        var dt = new Date(
          this.dateH.getFullYear(),
          this.dateH.getMonth(),
          2,
          0,
          0
        );
        console.log(dt);
        this.rdv.daterelance = dt;
      } else this.rdv.status = "rapport";
      //console.log(this.rdv);
      //addNewRdvLocal
      console.log("par la");
      this.globalservice.addNewRdvLocal(this.rdv, function (data) {
        //env.globalservice.updateRdvLocal(env.rdv, function (res) {
        env.router.navigate(["/home"]);
        //});
      });
    }
  }

  decm() {
    let tmpd = new Date(this.dateH);
    tmpd = new Date(tmpd.setMonth(tmpd.getMonth() - 1));
    let tmpn = new Date();

    tmpn = new Date(tmpn.getFullYear(), tmpn.getMonth(), 1);
    console.log(tmpn);

    if (tmpd >= tmpn) {
      this.dateH = tmpd;
      this.textMounth =
        this.mois[this.dateH.getMonth()] + " " + this.dateH.getFullYear();
      console.log(this.dateH);
    }

    //2021-10-12T08:39:38.828Z
    //var tmp = new Date(this.dateH.getFullYear(), this.dateH.getMonth(), 1);
    //console.log(tmp);
  }
  incm() {
    console.log(this.dateH);
    this.dateH = new Date(this.dateH.setMonth(this.dateH.getMonth() + 1));

    this.textMounth =
      this.mois[this.dateH.getMonth()] + " " + this.dateH.getFullYear();
    //var tmp = new Date(this.dateH.getFullYear(), this.dateH.getMonth(), 1);
    //console.log(tmp);
  }
}
