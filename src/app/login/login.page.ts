import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Storage } from '@ionic/storage';
import { GlobalService } from '../global.service';

import {
  FormGroup,
  FormBuilder,
  Validators,

} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginFG: FormGroup;
  registerCredentials = {email: '', mdp: ''};
  ispwdok:any = false;


  constructor(
    private router: Router, 
    private http: HttpClient, 
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public globalservice: GlobalService,
    private storage: Storage) { 
    
    this.loginFG = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.storage.get('user').then(data => {
          //console.log(data)
          if(data)this.router.navigate(["/calendar"]);
        }
    );

  }

  ionViewWillEnter() {
    this.menuCtrl.swipeGesture(false);
    this.menuCtrl.enable(false);
    }

  ionViewDidLeave(): void {
      this.menuCtrl.enable(true);
    }

  ngOnInit() {
  }

  login(){
    let env =this;
    var murl = 'https://hps-crm.fr/loginapp/commerciaux/'+this.registerCredentials.email+'/'+this.registerCredentials.mdp;
    //console.log(murl)
    this.http.get(murl).subscribe(results => {
      //console.log(results)
      if(results['error']){
        //console.log("pas bon")
        this.ispwdok=true;
        setTimeout(function(){ 
          env.ispwdok = false 
        }, 3000);
      }
      else {
        //add to user local
        //console.log("ok")
        this.storage.set('user',results);
        this.globalservice.loadRdv().then(data=>{
          this.router.navigate(["/home"]);
        })
        
      }

    });




    
  }

}
