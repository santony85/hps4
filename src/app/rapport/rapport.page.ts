import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../global.service';


@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.page.html',
  styleUrls: ['./rapport.page.scss'],
})
export class RapportPage implements OnInit {
  equipe:any=[];
  rapports:any=[]
  selcom="";
  d1="";
  d2="";
  fnom="";
  maj="";
  nbrapport=0;

  constructor(public globalservice: GlobalService,) { 
    let env=this;

    this.globalservice.getEquipe(function(data){
      env.equipe = data;
      //console.log(data)
    })

    this.d1=new Date().toISOString();
    this.d2=new Date().toISOString();
  }

  ngOnInit() {
  }

  onChange(event){
    this.selcom = event.detail.value;
    //console.log(this.selcom)
  }

  getDateRapport(){
    this.fnom="";
    //console.log(new Date(this.d1).toISOString())
    //console.log(this.d2)
    this.globalservice.getDateRapportListById(new Date(this.d1).toISOString(),new Date(this.d2).toISOString(),this.selcom).then(data=>{
      //console.log(data)
      this.rapports=data;
      this.nbrapport=this.rapports.length();
      //this.nbRapport=this.rapports.length;
    })
  }

}
