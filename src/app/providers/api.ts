import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  user:any; 

  dcolor:["","#d85713bd","#a1d377bd"]
  constructor(private http: HttpClient) {}

  isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  isTomorrow = (someDate) => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  makeDate = (someDate) => {
    const sdt = new Date(someDate);
    let sdy = sdt.getFullYear();
    let tmpm = sdt.getMonth() + 1;
    let sdm = tmpm < 10 ? "0" + tmpm : tmpm;
    let sdd = sdt.getDate() < 10 ? "0" + sdt.getDate() : sdt.getDate();
    let mdate = sdd + "/" + sdm + "/" + sdy;
    return mdate;
  };

  makeDateUs = (someDate,type) => {
    var sdt = new Date(someDate);
    let sdy = sdt.getFullYear();
    let tmpm = sdt.getMonth() + 1;
    let sdm = tmpm < 10 ? "0" + tmpm : tmpm;
    let sdd = sdt.getDate() < 10 ? "0" + sdt.getDate() : sdt.getDate();
    let mdate = sdy + "-" + sdm + "-" + sdd;
    return mdate;
  };

  makeHour = (someDate) => {
    const sdt = new Date(someDate);
    let tmpm = sdt.getHours();
    let sdm = tmpm < 10 ? "0" + tmpm : tmpm;
    let sdd = sdt.getMinutes() < 10 ? "0" + sdt.getMinutes() : sdt.getMinutes();
    let mdate = sdm + ":" + sdd;
    return mdate;
  };

  makeHourp = (someDate) => {
    const sdt = new Date(someDate);
    let tmpm = sdt.getHours()+1;
    let sdm = tmpm < 10 ? "0" + tmpm : tmpm;
    let sdd = sdt.getMinutes() < 10 ? "0" + sdt.getMinutes() : sdt.getMinutes();
    let mdate = sdm + ":" + sdd;
    return mdate;
  };

  getMoisDateDF = (mode) => {
    const d = new Date()
    const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d)
    const mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d)
    const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d)
    var de = `${ye}-${mo}-${da}`;
    var ds = `${ye}-${mo}-01`;
    if(mode==0)return de;
    else if(mode==1)return ds;
    else return {date_start:ds,date_end:de}

  }

  getUser(){
    return this.user;
  }

  getPlanning(type, callback) {
    let env = this;
    let lstplan = [];
    let sdt = new Date();
    if (type == 1) sdt.setDate(sdt.getDate() + 1);
    let mdate = this.makeDateUs(sdt,0);
    var murl =  "http://51.68.125.223:91/listplanningdate/"+this.user._id+"/" + mdate;
    //console.log(murl)
    this.http.get(murl).subscribe((results) => {
      let plan: any;
      plan = results;
      let nbres = plan.length;
      if (nbres == 0) callback(lstplan);
      plan.forEach((element) => {
        env.getClient(element, function (client) {
          element.rdate = env.makeDate(element.start_date.toString().replace(" ", "T"));
          element.rheure = env.makeHour(element.start_date.toString().replace(" ", "T"));
          //console.log(element.rheure);
          element.client = client;
          lstplan.push(element);
          nbres--;
          if (nbres == 0) callback(lstplan);
        });
      });
    });
  }

  login(login,mdp,callback){
    var murl = "http://51.68.125.223:91/loginapp";
    var form ={
      email:login,
      mdp:mdp
    } 
    this.http.post(murl,form).subscribe((results) => {
      this.user=results;
      return callback(results);
    });

  }

  delUser(){
    this.user={}
  }

  getClient(mid, callback) {
    var murl = "http://51.68.125.223:91/getclient/" + mid.clients;
    //console.log(murl)
    this.http.get(murl).subscribe((results) => {
      return callback(results);
    });
  }



  getFamille(callback) {
    var murl = "http://51.68.125.223:91/list/familles/"+this.user.idclient;
    this.http.get(murl).subscribe((results) => {
      return callback(results);
    });
  }

  getProduit(val, callback) {
    let env = this;
    let data = [];
    var murl = "http://51.68.125.223:91/getprod/" + val;

    this.http.get(murl).subscribe((results) => {
      let res: any = [];
      res = results;
      res.forEach((element) => {
        element.checked = false;
        data.push(element);
      });
      return callback(data);
    });
  }

  postClient(val,user,callback){
    var client = { 
      "nom" : val.nom, 
      "prenom" : val.prenom, 
      "label" : val.adresse, 
      "lat" : val.lat.toString(), 
      "lng" : val.lng.toString(), 
      "cp" : val.cp, 
      "ville" : val.ville, 
      "num" : val.num, 
      "rue" : val.rue, 
      "idadr" : val.idadr, 
      "tel" : val.tel, 
      "email" : "", 
      "commentaire" : "", 
      "commercial" : user._id, 
      "idclient" : user.idclient
      }
      var murl = "http://51.68.125.223:91/addobj/clients/"+user.idclient;
      this.http.post(murl,client).subscribe((results) => {
        return callback(results);
      });


  }

  findClient(idadr,client,callback){
    var murl = "http://51.68.125.223:91/findclient"; 
    var form ={
      iadr:idadr,
      nom:client
    }
    this.http.post(murl,form).subscribe((results) => {
      return callback(results);
    });
  }

  postRapport(form, prod, rdv,user,locate, callback) {
    var murl = "http://51.68.125.223:91/addobj/rapports/"+this.user.idclient;
    let pdata: any;
    //console.log(form.rapport)
    pdata = form;
    pdata.produits = prod;
    pdata.rdv = rdv;
    pdata.user = user;
    pdata.mylocate = locate;

    rdv.color = form.issues.color;
    form.issues =form.issues.code;

    let env = this; 
    this.http.post(murl, pdata).subscribe((results) => {
      let res: any;
      res = results;
      let updplan = {
        _id: rdv._id,
        etat: "1",
        color: rdv.color,
        rapport:form.rapport
      };
      murl = "http://51.68.125.223:91/updaterapport";
      env.http.post(murl, updplan).subscribe((results2) => {
        let res2: any;
        res2 = results;
        //console.log(res2);
        callback(res2.ok);
      });
    });
  }

  postPlanning(rdv,callback) {
    var murl = "http://51.68.125.223:91/addtoplanning";
    this.http.post(murl,rdv).subscribe((results) => {
      //console.log(results)
      return callback(results);
    });
  }

  getRapports(dd,df,callback){
    var murl ='http://51.68.125.223:91/listrapportsdate/'+this.user._id+'/'+dd+'/'+df;
    this.http.get(murl).subscribe((results) => {
      return callback(results);
    });


  }
}
