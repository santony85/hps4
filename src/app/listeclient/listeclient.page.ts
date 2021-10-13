import { Component } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { GlobalService } from '../global.service';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: 'app-listeclient',
  templateUrl: './listeclient.page.html',
  styleUrls: ['./listeclient.page.scss'],
})
export class ListeclientPage {

  rdv:any=[];
  slideEnable=0;
  nbClient=0;
  nbsec=0;
  loading:any;
  clients:any=[];

  scrolldir=0;
  scrolldirf=0;
  pagen=0;
  mlat=0;
  mlong=0;

  public progress: number = 0;
  public pressState: string = "released";
  // Interval function
  protected interval: any;

  constructor(
    private router: Router,
    public globalservice: GlobalService,
    public menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    public loadingController: LoadingController
  ) {
    //console.log("ici")
    this.geolocation.getCurrentPosition().then((resp) => {
      this.mlat=resp.coords.latitude;
      this.mlong=resp.coords.longitude;
    })
   }

   async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Recherche en cours...',
      //duration: 2000
    });
    await this.loading.present();
  }

   async onChangeNom(val,field){

    if(val.length > 1){
      let env =this;
      var loading = await this.loadingController.create({
        message: "Recherche...",
      });
      await loading.present();

      this.globalservice.getLikeListCB("clients",val,field,function(data){
        env.nbClient=data.length;
        var cl:any = env.globalservice.getClients();
        env.scrolldirf=0;
        env.scrolldir =0;
        env.pagen=0;
        env.rdv=[];
        var tmp=[]
        for (var i=0;i<18;i++){
          tmp.push(cl[i])
        }
        env.rdv = tmp;
        loading.dismiss();
      })
    }
   }

   async onChangeDist(val){
    if(this.slideEnable==0){
      
      this.slideEnable=1;
      let env =this;
      var loading = await this.loadingController.create({
        message: "Recherche...",
      });
      await loading.present();

        this.globalservice.getClientListLocCB(this.mlat,this.mlong,val,function(data){
          env.slideEnable=0;
          env.nbClient=data.length;
          var cl:any = env.globalservice.getClients();
          env.scrolldirf=0;
          env.scrolldir =0;
          env.pagen=0;
          env.rdv=[];
          var tmp=[]
          for (var i=0;i<18;i++){
            tmp.push(cl[i])
          }
          env.rdv = tmp;
          loading.dismiss();
        })

    } 

   }

   saverec(){
    this.globalservice.saveClients()
   }
   
   logScrolling(ev){
     if(ev.detail.scrollTop > this.scrolldir){
       this.scrolldirf=1;
       //pagen=0;
     }
     else {
       this.scrolldirf=0;
    }
     this.scrolldir = ev.detail.scrollTop;

     //numpage
     var ismod=Math.round(ev.detail.scrollTop / 250);
     if(ismod > this.pagen){
       if(ismod > 2 ){
        this.pagen=ismod;
        var cl:any = this.globalservice.getClients();
        for (var i=0;i<18;i++){
          this.rdv.push(cl[i+18]);
        }
       }



     }

   }

   onPress($event) {
    //console.log("onPress", $event);
    this.pressState = 'pressing';
    this.startInterval();
   }

  onPressUp($event) {
    //console.log("onPressUp", $event);
    this.pressState = 'released';
    this.stopInterval();
  }

  startInterval() {
    const self = this;
    this.interval = setInterval(function () {
      //console.log(self.progress + 1)
        //self.progress = self.progress + 1;
    }, 50);
}

stopInterval() {
    clearInterval(this.interval);
}




}
