import { Component, OnInit, ViewChild, forwardRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CalendarOptions, Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalService } from "../global.service";
import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-scheduler",
  templateUrl: "./scheduler.page.html",
  styleUrls: ["./scheduler.page.scss"],
})
export class SchedulerPage implements OnInit {
  url: any;
  calendarOptions: CalendarOptions;
  eventsModel: any;
  @ViewChild("fullcalendar") fullcalendar: FullCalendarComponent;
  user: any;
  constructor(
    private sanitize: DomSanitizer,
    public loadingController: LoadingController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private router: Router,
    public globalservice: GlobalService
  ) {
    this.user = this.globalservice.getUser();
  }
  ngOnInit() {}

  ionViewWillEnter() {
    console.log(this.user);
    forwardRef(() => Calendar);
    this.synchro();
  }

  async synchro() {
    let env = this;
    var murl = "https://hps-crm.fr/restobj/" + this.user._id + "/rdv";
    this.http.get(murl).subscribe((results2) => {
      env.calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        expandRows: true,
        height: "100%",
        timeZone: "UTC",
        locale: "fr",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
        },
        buttonText: {
          year: "year",
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
          list: "Liste",
        },
        initialDate: new Date(),
        initialView: "timeGridWeek",
        firstDay: 1,
        editable: true,
        dayHeaders: true,
        businessHours: [
          {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday
            startTime: "8:00", // a start time (10am in this example)
            endTime: "12:00", // an end time (6pm in this example)
          },
          {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday
            startTime: "13:00", // a start time (10am in this example)
            endTime: "18:00", // an end time (6pm in this example)
          },
        ],
        events: results2["data"],
        startParam: "start_date",
        endParam: "end_date",
        slotMinTime: "08:00",
        slotMaxTime: "18:00",
        weekNumbers: true,
        hiddenDays: [0],
        droppable: true,
        eventClick: function (info) {
          console.log("clk");

          let dtn = new Date();
          let oldt = new Date(info.event._def.extendedProps.dateRdv);
          // si info.event._def.extendedProps.dateRdv < dtn

          let navigationExtras: NavigationExtras = {
            queryParams: {
              item: JSON.stringify(info.event._def.extendedProps),
              user: JSON.stringify(env.globalservice.getUser()),
              from: "/scheduler",
            },
          };
          if (info.event._def.ui.display !== "background") {
            env.router.navigate(["/formrapport"], navigationExtras);
          } else {
            console.log(info.event._def.extendedProps._id);
            env.presentAlertConfirm(info.event._def.extendedProps._id);
          }
          //fin si
        },
        eventDrop: function (info) {
          var myobj = info.event._def.extendedProps;
          // ajaxput(myobj,info,"");
        },
        eventAllow: function (dropInfo, draggedEvent) {
          if (draggedEvent._instance) {
            var todayd = new Date();
            var st = new Date(draggedEvent._instance.range.start);
            if (st < todayd) return false;
            else return true;
          } else {
            console.log("out");
            return true;
          }
        },
      };
    });
  }

  async presentAlertConfirm(id) {
    let env = this;
    const alert = await this.alertCtrl.create({
      header: "Alerte !!!",
      message: "Voulez-vous supprimer l'evenement ?",
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: "Confirmer",
          handler: () => {
            var murl = "https://hps-crm.fr/delobj/events/" + id;
            this.http
              .get(murl, { responseType: "text" })
              .subscribe((results2) => {
                //reload page
                env.synchro();
              });
          },
        },
      ],
    });

    await alert.present();
  }

  async presentCheckboxNew() {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Nouveau",
      inputs: [
        {
          name: "radio1",
          type: "radio",
          label: "Rendez-vous / Phy",
          value: "0",
          checked: true,
        },
        /*{
          name: "radio2",
          type: "radio",
          label: "Contact",
          value: "1",
        },*/
        {
          name: "radio3",
          type: "radio",
          label: "Prospect",
          value: "2",
        },
        {
          name: "radio3",
          type: "radio",
          label: "Evenement",
          value: "3",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            // console.log('Confirm Cancel');
          },
        },
        {
          text: "Ok",
          handler: (data: string) => {
            if (data == "3") {
              this.router.navigate(["/evenement"]);
            } else if (data != "2") {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  item: JSON.stringify(null),
                  user: JSON.stringify(this.globalservice.getUser()),
                  from: data,
                },
              };
              this.router.navigate(["/formrdv"], navigationExtras);
            } else {
              // this.affRdv(null);
              const navigationExtras: NavigationExtras = {
                queryParams: {
                  item: JSON.stringify(null),
                  user: JSON.stringify(this.globalservice.getUser()),
                  from: "/scheduler",
                },
              };
              this.router.navigate(["/formrapport"], navigationExtras);
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
