import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, latLng, tileLayer, Layer, marker } from "leaflet";
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as L from 'leaflet';

import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "@ansur/leaflet-pulse-icon";

import "leaflet.markercluster";







@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.page.html',
  styleUrls: ['./mapview.page.scss'],
})
export class MapviewPage implements OnInit {

  rdv:any=[];
  clients:any=[];
  segmentModel = "rdv";
  maj="";
  ntous=0;
  nrdv=0;
  nclient=0;

  map: L.Map;
  markerGroupServR:any;
  markerGroupServC:any;

  constructor(
    public globalservice: GlobalService,
    private geolocation: Geolocation,
    public loadingController: LoadingController,
    private alertCtrl: AlertController) { 

    

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.globalservice.getRdv().then(datax=>{
      this.ntous=datax["data"].length;
      this.globalservice.getNbRdv().then(data=>{
        this.nrdv=data["data"].length;
        this.rdv=data["data"];
        this.maj= data["maj"];
        this.leafletMap();
      })
    });
    let env = this;
    this.globalservice.getClientsLocal(function(data){
      //console.log(data)
      env.clients=data;
      env.nclient=data.length;
    })

  }

  async synchro(){

//

  }



  leafletMap() {
    this.map = new L.Map('mapId').setView([46.5, -1.7833], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(this.map);

    this.markerGroupServR = L.layerGroup();

    var pulsingIcon = (L as any).icon.pulse({
      iconSize: [20, 20],
      color: "purple"
    });

    this.geolocation.getCurrentPosition().then((resp) => {

      L.marker([resp.coords.latitude, resp.coords.longitude], { icon: pulsingIcon }).addTo(this.map);
      this.map.setView([resp.coords.latitude, resp.coords.longitude], 13);

     }).catch((error) => {
       //console.log('Error getting location', JSON.stringify(error));
     });
    
    this.rdv.forEach(element => {
      //console.log(element)
      var txt =""
      
      if(element.issuerdv=="ABS")txt="assets/icon_pin_rdv_demain.svg";
      else if(element.issuerdv=="CONFIRME")txt="assets/icon_pin_ouv.svg";
      else txt="assets/icon_pin_no.svg";
      var myIcon = L.icon({
        iconUrl: txt,
        iconSize: [50,50]
      });


      L.marker([element.lat, element.long], { icon: myIcon }).addTo(this.markerGroupServR);

    });  
    //this.markerGroupServR.addTo(this.map);
    this.map.addLayer(this.markerGroupServR);

    this.markerGroupServC = (L as any).markerClusterGroup();

    this.clients.forEach(element => {
    
      var myIcon = L.icon({
        iconUrl: "assets/icon_pin_rdv.svg",
        iconSize: [50,50]
      });
      if(element.lat && element.long){
        var marker = L.marker([element.lat, element.long], { icon: myIcon });
        this.markerGroupServC.addLayer(marker);
      }
    });
   
  }


  ionViewWillLeave() {
    this.map.remove();
  }



  segmentChanged(event){
    if(this.segmentModel=="rdv"){
      this.map.removeLayer(this.markerGroupServC);
      this.map.addLayer(this.markerGroupServR);

    }
    else if(this.segmentModel=="client"){
      this.map.addLayer(this.markerGroupServC);
      this.map.removeLayer(this.markerGroupServR);
    }
    else {
      this.map.removeLayer(this.markerGroupServC);
      this.map.removeLayer(this.markerGroupServR);
      this.map.addLayer(this.markerGroupServC);
      this.map.addLayer(this.markerGroupServR);

    }

  
  }

}
