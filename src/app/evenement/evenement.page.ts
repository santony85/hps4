import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../global.service";
import { Router, NavigationExtras } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-evenement",
  templateUrl: "./evenement.page.html",
  styleUrls: ["./evenement.page.scss"],
})
export class EvenementPage implements OnInit {
  issues: any = [
    "Congés",
    "Maladie",
    "Réunion",
    "Formation",
    "Proactivité",
    "Perso",
  ];

  periodes: any = ["Matin", "Aprés-midi", "Journée complète"];

  event = {
    start: new Date(),
    end: new Date(),
    title: "",
    periode: "",
    display: "background",
    editable: false,
    idcomhps1: "",
  };

  user: any;
  loginFG: FormGroup;

  constructor(
    public globalservice: GlobalService,
    private http: HttpClient,
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.user = this.globalservice.getUser();
    this.loginFG = formBuilder.group({
      start: ["", Validators.required],
      end: ["", Validators.required],
      title: ["", Validators.required],
      periode: ["", Validators.required],
      display: ["background"],
      editable: [false],
      idcomhps1: [this.user._id],
    });
  }

  ngOnInit() {}

  submitForm(values) {
    // si periode == 0
    if (values.periode == "Matin") {
      //test si d1 == d2
      let d1 = new Date(values.start);
      let d2 = new Date(values.end);
      d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 10, 0);
      d2 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 16, 0);
      values.start = d1.toISOString();
      values.end = d2.toISOString();
    }
    // si periode == 1
    else if (values.periode == "Aprés-midi") {
      //test si d1 == d2
      let d1 = new Date(values.start);
      let d2 = new Date(values.end);
      d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 16, 0);
      d2 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 16 + 8, 0);
      values.start = d1.toISOString();
      values.end = d2.toISOString();
    }
    // si periode == 2
    else {
      let d1 = new Date(values.start);
      let d2 = new Date(values.end);
      d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 10, 0);
      d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), 16 + 8, 0);
      values.start = d1.toISOString();
      values.end = d2.toISOString();
    }

    console.log(values);

    var murl = "https://hps-crm.fr/addobj/events";
    this.http.post(murl, values).subscribe((results2) => {
      console.log(results2);
      this.router.navigate(["/scheduler"]);
    });
  }
}
