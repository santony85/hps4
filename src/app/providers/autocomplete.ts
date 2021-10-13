
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';
import { Adresse } from '../providers/adresse';

@Injectable()
export class Autocomplete  {
  labelAttribute = "name";
  formValueAttribute = "";
  cmplist: any = [];
  
  constructor(private http: HttpClient) {}

  getReverse(lat,lng,callback) {    
    let ports = [];
    this.http.get("https://api-adresse.data.gouv.fr/reverse/?lon="+lng+"&lat="+lat).subscribe((results:any) => {
      let lst: any = [];
      let mmap = results.features;
      mmap.forEach(element => {
        //console.log(element);
        let adr:Adresse = {
          id: "",
          label: "",
          num: "",
          rue: "",
          cp: "",
          ville: "",
          lat: 0.0,
          lng: 0.0
        }
    
        adr.label = element.properties.label;
        adr.cp = element.properties.postcode;  
        adr.ville = element.properties.city;
        adr.rue = element.properties.street;
        adr.id = element.properties.id;
        adr.num = element.properties.housenumber;
        adr.lat = element.geometry.coordinates[1];
        adr.lng = element.geometry.coordinates[0];
        ports.push(adr);

      })
      return callback(ports);
    })
  }

  getAdresse(text,callback) {    
    let ports = [];
    this.http.get("https://api-adresse.data.gouv.fr/search/?q=" + text +"?autocomplete=1").subscribe((results:any) => {
      let lst: any = [];
      let mmap = results.features;
      mmap.forEach(element => {
        //console.log(element);
        let adr:Adresse = {
          id: "",
          label: "",
          num: "",
          rue: "",
          cp: "",
          ville: "",
          lat: 0.0,
          lng: 0.0
        }
    
        adr.label = element.properties.label;
        adr.cp = element.properties.postcode;  
        adr.ville = element.properties.city;
        adr.rue = element.properties.street;
        adr.id = element.properties.id;
        adr.num = element.properties.housenumber;
        adr.lat = element.geometry.coordinates[1];
        adr.lng = element.geometry.coordinates[0];
        ports.push(adr);

      })
      return callback(ports);
    }) 
  }

}
