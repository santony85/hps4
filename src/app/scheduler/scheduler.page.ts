import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalService } from '../global.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit {

  url: any;
  calendarOptions: CalendarOptions;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  
  constructor(private sanitize: DomSanitizer,
    public loadingController: LoadingController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private router: Router, 
    public globalservice: GlobalService,) { 

  }
  ngOnInit() {}
  ionViewDidEnter(){
    forwardRef(() => Calendar);
    let env=this;
    var murl = "https://hps-crm.fr/restobj/6033e76872167861bc7ca8c0/rdv";
    this.http.get(murl).subscribe((results2) => {
      env.calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        expandRows: true,
        height:"100%",
        timeZone: 'UTC',
        locale: 'fr',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth'
            },
        buttonText: {
              year: 'year',
              today: "Aujourd'hui",
              month: 'Mois',
              week: 'Semaine',
              day: 'Jour',
              list: 'Liste',
          },
          initialDate: new Date(),
          initialView: 'timeGridWeek',
          firstDay: 1,
          editable: true,
          events: results2['data'],
          startParam: "start_date",
          endParam: "end_date",
          slotMinTime: '08:00',
          slotMaxTime: '20:00',
          weekNumbers: true,
  
          droppable: true, 
          eventClick: function(info) {
          console.log(info);
          let navigationExtras: NavigationExtras = {
            queryParams: {
              item: JSON.stringify(info.event._def.extendedProps),
              user: JSON.stringify(env.globalservice.getUser())
            },
          };
          env.router.navigate(["/formrapport"], navigationExtras);
          },
          eventDrop: function(info) {
            var myobj = info.event._def.extendedProps;
            //ajaxput(myobj,info,"");
          },
          eventAllow: function(dropInfo, draggedEvent) {
    
          if(draggedEvent._instance){
            var todayd = new Date();
            var st = new Date(draggedEvent._instance.range.start);
            if(st < todayd)return false;
            else return true;
          }
          else {
            console.log("out")
            return true;
          }
          
  
            },
        
      };
    });



    /*this.url = this.sanitize.bypassSecurityTrustResourceUrl(
      "http://176.31.154.73:91/calendarframeapp/6033e76872167861bc7ca8c0/contact/a"
    );*/
  }

  async synchro(){
    console.log("la")
    let env=this;
    const alert = await this.alertCtrl.create({
      header: 'Synchronisation',
      message: 'Mise a jour effectuée avec succès',
      buttons: ['OK']
    });
    
    var loading = await this.loadingController.create({
      message: 'Synchronisation...'
    });
    await loading.present();
    //this.storage.set('rdv', []);
    env.globalservice.updateRdvAll(function(data){
      env.globalservice.loadRdv().then(datax=>{
        //env.segmentModel = "rdv";
        //env.affBadge=0;
        env.globalservice.getNbRdv().then(data=>{
          //env.rdv=data["data"];
          //env.maj= data["maj"];
          //env.countNbAction();
          loading.dismiss();
          alert.present();
        })
      });
    })

  }

  async presentCheckboxNew() {
    const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Nouveau',
        inputs: [
          {
            name: 'radio1',
            type: 'radio',
            label: 'Rendez-vous',
            value: '0',
            checked: true
          },
          {
            name: 'radio2',
            type: 'radio',
            label: 'Contact',
            value: '1'
          },
          {
            name: 'radio3',
            type: 'radio',
            label: 'Prospect',
            value: '2'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              //console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data:string) => {
              if(data!="2"){
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    item: JSON.stringify(null),
                    user: JSON.stringify(this.globalservice.getUser()),
                    from:data
                  },
                };
                this.router.navigate(["/formrdv"], navigationExtras);
              }

              else {
                //this.affRdv(null);
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    item: JSON.stringify(null),
                    user: JSON.stringify(this.globalservice.getUser())
                  },
                };
                this.router.navigate(["/formrapport"], navigationExtras);
              }

            }
          }
        ]
    });
    await alert.present();
  }

}
