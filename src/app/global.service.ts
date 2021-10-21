import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Storage } from "@ionic/storage";

import * as moment from "moment";

@Injectable()
export class GlobalService {
  rdv: any = [];
  user: any = [];
  client: any = [];
  new: any = [];
  issue: any = [];

  couleurs = [
    "#FBC18E",
    "#A8F6BB",
    "#FAF351",
    "#51FAFA",
    "#C79FFB",
    "#FDAFAF",
    "#FC5A5A",
  ];

  constructor(private http: HttpClient, private storage: Storage) {}

  getColor(color) {
    return this.couleurs[color];
  }
  /******* API DES DATES *******/
  formatDate(initialDate: string) {
    var currentDate = new Date(initialDate).toLocaleDateString("en-GB");
    return currentDate;
  }
  formatHeure(initialDate: string) {
    //Retournes le format passé en paramètre au format DD/MM/YYYY
    var dateH = new Date(initialDate);
    var currentDate = new Date(initialDate).toLocaleDateString("en-GB");

    if (dateH.getMinutes() <= 9 && dateH.getHours() <= 9) {
      return "0" + dateH.getHours() + ":0" + dateH.getMinutes();
    } else if (dateH.getMinutes() <= 9) {
      return dateH.getHours() + ":0" + dateH.getMinutes();
    } else if (dateH.getHours() <= 9) {
      return "0" + dateH.getHours() + ":" + dateH.getMinutes();
    } else {
      return dateH.getHours() + ":" + dateH.getMinutes();
    }
  }
  formatDateHeure(initialDate: string) {
    //Retournes le format passé en paramètre au format DD/MM/YYYY
    var dateH = new Date(initialDate);
    var currentDate = new Date(initialDate).toLocaleDateString("en-GB");

    if (dateH.getMinutes() <= 9 && dateH.getHours() <= 9) {
      return (
        currentDate +
        " a " +
        ("0" + dateH.getHours() + "H0" + dateH.getMinutes())
      );
    } else if (dateH.getMinutes() <= 9) {
      return (
        currentDate + " a " + (dateH.getHours() + "H0" + dateH.getMinutes())
      );
    } else if (dateH.getHours() <= 9) {
      return (
        currentDate +
        " a " +
        ("0" + dateH.getHours() + "H" + dateH.getMinutes())
      );
    } else {
      return currentDate + " a " + dateH.getHours() + "H" + dateH.getMinutes();
    }
  }
  formatdateByNbjour(initialDate: string) {
    let date_now: any = new Date(initialDate);
    let date_future: any = new Date();

    let seconds = Math.floor((date_future - date_now) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    //let days = Math.floor(hours/24);
    let txtday = "";

    let days = this.diff_days(date_now, date_future);

    if (days == 0) txtday = "Aujourd'hui ";
    else if (days == 1) txtday = "Hier ";
    else txtday = "Il y'a " + days + " jours ";

    let txtmin = "";
    if (minutes < 60) txtmin = " (" + minutes + " min)";
    else txtmin = " (" + this.timeConvert(minutes) + ")";

    if (date_now.getMinutes() <= 9 && date_now.getHours() <= 9) {
      return (
        txtday +
        " à " +
        ("0" + date_now.getHours() + "H0" + date_now.getMinutes()) +
        txtmin
      );
    } else if (date_now.getMinutes() <= 9) {
      return (
        txtday +
        " à " +
        (date_now.getHours() + "H0" + date_now.getMinutes()) +
        txtmin
      );
    } else if (date_now.getHours() <= 9) {
      return (
        txtday +
        " à " +
        ("0" + date_now.getHours() + "H" + date_now.getMinutes()) +
        txtmin
      );
    } else {
      return (
        txtday +
        " à " +
        date_now.getHours() +
        "H" +
        date_now.getMinutes() +
        txtmin
      );
    }
  }
  diff_days(dt1, dt2) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60 * 24;
    //return Math.abs(Math.round(diff));
    ////console.log(Math.round(diff))
    return Math.round(diff);
  }
  timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " h " + rminutes + " min";
  }
  /******* /API DES DATES *******/
  /*****************************/
  /******* API DES RDV *******/
  /** EXTERNE */
  public loadRdv() {
    return new Promise((resolve) => {
      this.storage.get("user").then((user) => {
        this.user = user;
        var murl = "https://hps-crm.fr/listgrenelleapp/" + user._id + "/3";
        ////console.log(murl)
        this.http.get(murl).subscribe((results) => {
          let trdv = {
            maj: new Date(),
            data: results,
          };
          ////console.log(trdv);
          this.storage.set("rdv", trdv);
          this.rdv = trdv;
          this.loadIssues();
          this.loadFamille();
          this.loadProduit();
          resolve(trdv);
        });
      });
    });
  }
  /**************/
  public getRdv() {
    //this.updateRdvFake()
    return new Promise((resolve) => {
      this.storage.get("rdv").then((data) => {
        let tmpLst = [];
        //loop
        for (var i = 0; i < data["data"].length; i++) {
          ////console.log(data['data'][i])
          data["data"][i].dateDiff = this.diff_days(
            new Date(),
            new Date(data["data"][i].dateRdv)
          );
          if (data["data"][i].status != "rapport") data["data"][i].color = 0;
          tmpLst.push(data["data"][i]);
        }
        tmpLst = tmpLst.sort(function (a, b) {
          return a.dateDiff - b.dateDiff;
        });
        data["data"] = tmpLst;

        resolve(data);
      });
    });
  }
  /**************/
  public getNbRdv() {
    return new Promise((resolve) => {
      let lstret: any = [];
      this.getRdv().then((data) => {
        for (var i = 0; i < data["data"].length; i++) {
          if (
            data["data"][i].dateDiff == 0 &&
            data["data"][i].status == "rdv" &&
            data["data"][i].issue == ""
          ) {
            if (data["data"][i].issuerdv == "ABS") data["data"][i].color = 0;
            else if (data["data"][i].issuerdv == "CONFIRME")
              data["data"][i].color = 1;
            else if (data["data"][i].issuerdv == "REFUS")
              data["data"][i].color = 5;
            else {
              data["data"][i].issuerdv = "Non contacté";
              data["data"][i].color = 5;
            }
            lstret.push(data["data"][i]);
          }
        }
        data["data"] = lstret;
        resolve(data);
      });
    });
  }
  /**************/
  public getNbAConfirmer() {
    return new Promise((resolve) => {
      let lstret: any = [];
      this.getRdv().then((data) => {
        for (var i = 0; i < data["data"].length; i++) {
          var dtdiff = data["data"][i].dateDiff;
          if (
            dtdiff > 0 &&
            data["data"][i].status == "rdv" &&
            data["data"][i].issuerdv == ""
          ) {
            if (dtdiff == 1) data["data"][i].color = 2;
            else data["data"][i].color = 3;

            lstret.push(data["data"][i]);
          }
        }
        data["data"] = lstret;
        resolve(data);
      });
    });
  }
  /**************/
  public getNbRetard() {
    return new Promise((resolve) => {
      let lstret: any = [];
      this.getRdv().then((data) => {
        for (var i = 0; i < data["data"].length; i++) {
          var dtdiff = data["data"][i].dateDiff;
          if (dtdiff < 0 && data["data"][i].status == "rdv") {
            if (dtdiff == -1) data["data"][i].color = 5;
            else data["data"][i].color = 6;
            lstret.push(data["data"][i]);
          }
        }
        data["data"] = lstret;
        resolve(data);
      });
    });
  }
  /**************/
  public getNbContact() {
    return new Promise((resolve) => {
      let lstret: any = [];
      this.getRdv().then((data) => {
        for (var i = 0; i < data["data"].length; i++) {
          if (data["data"][i].status == "contact") {
            data["data"][i].color = 4;
            lstret.push(data["data"][i]);
          }
        }
        data["data"] = lstret;
        resolve(data);
      });
    });
  }
  /**************/
  public getNbRapports() {
    console.log("ici et la");
    return new Promise((resolve) => {
      let lstret: any = [];
      this.getRdv().then((data) => {
        for (var i = 0; i < data["data"].length; i++) {
          if (data["data"][i].status == "rapport") {
            data["data"][i].dateDiff = Math.abs(data["data"][i].dateDiff);

            /*if(data['data'][i].issue =="VENTE")data['data'][i].color=1;
              else if(data['data'][i].issue =="REFUS")data['data'][i].color=5;
              else data['data'][i].color=3;*/

            lstret.push(data["data"][i]);
          }
        }
        lstret = lstret.sort(function (a, b) {
          return a.dateDiff - b.dateDiff;
        });
        ////console.log(lstret)
        data["data"] = lstret;
        resolve(data);
      });
    });
  }
  /**************/
  public updateRdvFake() {
    this.storage.get("rdv").then((data) => {
      for (var i = 0; i < data["data"].length; i++) {
        if (data["data"][i].heureRdv)
          data["data"][i].heureRDV = data["data"][i].heureRdv;
      }
      this.storage.set("rdv", data);
    });
  }
  public updateRdvLocal(rdv, callback) {
    this.storage.get("rdv").then((data) => {
      for (var i = 0; i < data["data"].length; i++) {
        if (data["data"][i]._id === rdv._id) {
          data["data"][i] = rdv;
        }
      }
      this.storage.set("rdv", data);
      callback("ok");
    });
  }
  public updateRdv(data, callback) {
    ////console.log(data)
    var murl = "https://hps-crm.fr/updaterdvapp";
    this.http.post(murl, data).subscribe((results2) => {
      //console.log(results2);
      callback(results2);
    });
  }
  public updateRdvAll(callback) {
    this.storage.get("rdv").then((data) => {
      // Http Options

      if (data && data.data) {
        var murl = "https://hps-crm.fr/updaterdvappall";
        this.http.post(murl, data.data).subscribe((results2) => {
          //console.log(results2);
          callback(results2);
        });
      } else callback([]);
    });
  }
  public addNewRdvLocal(rdv, callback) {
    this.storage.get("rdv").then((data2) => {
      data2["data"].push(rdv);
      this.storage.set("rdv", data2).then((dataxx) => {
        //console.log(dataxx)
        callback(data2);
      });
    });
  }
  /******* /API DES RDV *******/
  public loadUser() {
    this.storage.get("user").then((user) => {
      this.user = user;
    });
  }
  /*****************************/
  public getUser() {
    //this.storage.get('rdv').then(data => {
    return this.user;
    //})
  }
  /*****************************/
  /** EXTERNE */
  public getIssues(callback) {
    this.storage.get("issues").then((user) => {
      return callback(user);
    });
  }
  /*****************************/
  public loadIssues() {
    //console.log("ici")
    var murl = "https://hps-crm.fr/list/issues";
    this.http.get(murl).subscribe((results) => {
      this.storage.set("issues", results);
    });
  }
  /*****************************/
  /*****************************/
  public getLikeListCB(col, val, field, callback) {
    var murl = "https://hps-crm.fr/likext/" + col + "/" + field + "/" + val;
    this.http.get(murl).subscribe((results) => {
      //resolve(results);
      this.client = results;
      return callback(results);
    });
  }
  /*****************************/
  public getLikeRapportList(val, field) {
    return new Promise((resolve) => {
      let lstret: any = [];
      this.storage.get("user").then((user) => {
        var murl =
          "https://hps-crm.fr/likextrapport/" +
          field +
          "/" +
          val +
          "/" +
          user._id;
        this.http.get(murl).subscribe((datas) => {
          var results: any = [];
          results = datas;
          for (var i = 0; i < results.length; i++) {
            if (results[i].status == "rapport") {
              results[i].dateDiff = Math.abs(results[i].dateDiff);
              //if (results[i].issue == "VENTE") results[i].color = 1;
              //else if (results[i].issue == "REFUS") results[i].color = 5;
              //else results[i].color = 3;
            }
          }
          results = results.sort(function (a, b) {
            return a.dateDiff - b.dateDiff;
          });
          this.client = results;
          //data["data"] = lstret;
          resolve(results);
        });
      });
    });
  }
  /*****************************/
  public getDateRapportList(d1, d2) {
    return new Promise((resolve) => {
      let lstret: any = [];
      this.storage.get("user").then((user) => {
        var murl =
          "https://hps-crm.fr/listrapportsdate/" +
          user._id +
          "/" +
          d1 +
          "/" +
          d2;
        console.log(murl);
        this.http.get(murl).subscribe((datas) => {
          var results: any = [];
          results = datas;
          for (var i = 0; i < results.length; i++) {
            if (results[i].status == "rapport") {
              results[i].dateDiff = Math.abs(results[i].dateDiff);
              //if (results[i].issue == "VENTE") results[i].color = 1;
              //else if (results[i].issue == "REFUS") results[i].color = 5;
              //else results[i].color = 3;
            }
          }
          results = results.sort(function (a, b) {
            return a.dateDiff - b.dateDiff;
          });
          this.client = results;
          resolve(results);
        });
      });
    });
  }
  /*****************************/
  public getDateRapportListById(d1, d2, idc) {
    return new Promise((resolve) => {
      let lstret: any = [];
      ///listrapportsdate/:idclient/:dated/:datef
      var murl =
        "https://hps-crm.fr/finddaterapport/" + idc + "/" + d1 + "/" + d2;
      this.http.get(murl).subscribe((datas) => {
        var results: any = [];
        results = datas;
        for (var i = 0; i < results.length; i++) {
          if (results[i].status == "rapport") {
            results[i].dateDiff = Math.abs(results[i].dateDiff);
            if (results[i].issue == "VENTE") results[i].color = 1;
            else if (results[i].issue == "REFUS") results[i].color = 5;
            else results[i].color = 3;
          }
        }
        results = results.sort(function (a, b) {
          return a.dateDiff - b.dateDiff;
        });
        this.client = results;
        resolve(results);
      });
    });
  }
  /*****************************/
  public getClientListLocCB(lat, lng, dist, callback) {
    var murl =
      "https://hps-crm.fr/clientloc/" + lat + "/" + lng + "/" + dist * 1000;
    this.http.get(murl).subscribe((results) => {
      this.client = results;
      return callback(results);
    });
  }
  /*****************************/
  public getClients() {
    return this.client;
  }
  /****************************/
  public getClientsLocal(callback) {
    this.storage.get("clients").then((data) => {
      return callback(data);
    });
  }
  /*****************************/
  public saveClients() {
    this.storage.set("clients", this.client);
  }
  /*****************************/
  /*****************************/
  /** EXTERNE */
  public loadFamille() {
    //console.log("ici")
    var murl = "https://hps-crm.fr/getfamille";
    this.http.get(murl).subscribe((results) => {
      this.storage.set("familles", results);
    });
  }
  /*****************************/
  public getFamille(callback) {
    this.storage.get("familles").then((user) => {
      return callback(user);
    });
  }
  /*****************************/
  public loadProduit() {
    var murl = "https://hps-crm.fr/list/categories";
    this.http.get(murl).subscribe((results) => {
      this.storage.set("produits", results);
    });
  }
  /*****************************/
  public getProduit(val, callback) {
    let data = [];
    this.storage.get("produits").then((res) => {
      res.forEach((element) => {
        if (element.famille == val) {
          element.checked = false;
          data.push(element);
        }
      });
      return callback(data);
    });
  }
  /*****************************/
  public getEquipe(callback) {
    this.storage.get("produits").then((user) => {
      //user._id="5cff676b69e4b6306e3c466f"

      var murl = "https://hps-crm.fr/getequipe/" + user._id + "/iscdv";
      this.http.get(murl).subscribe((results) => {
        return callback(results);
      });
    });
  }
}
