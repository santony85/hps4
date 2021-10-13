import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Api } from '../providers/api';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-modalproduit',
  templateUrl: './modalproduit.page.html',
  styleUrls: ['./modalproduit.page.scss'],
})
export class ModalproduitPage implements OnInit {

  familles=[];
  produits=[];
  selectedItem:any=null;
  qte="1";

  constructor(private modalCtrl:ModalController,private api: Api, private globalservice :GlobalService) { }

  ngOnInit() {
    let env=this;
    this.globalservice.getFamille(function(data){
      env.familles = data;
      //console.log(data)
    })
  }

  changeFam(ev){
    //console.log(ev.detail.value);
    let env=this;
    this.selectedItem=null;
    env.produits = [];
    this.globalservice.getProduit(ev.detail.value,function(data){
      data.map(obj => {
        obj.checked=false;
      });
      env.produits = data;
      //console.log(data)
    })
  }

  
  setProd(item){
    let data = this.produits;
    data.map(obj => {
      if(obj._id !== item._id)obj.checked=false;
      else {
        obj.checked=true;
        this.selectedItem=obj;
      }
    });
    this.produits = data;
  }
  
  async dismiss() {
    await this.modalCtrl.dismiss({
      prod:null
    });
  }

  async close() {
    if(this.selectedItem !== null){
      await this.modalCtrl.dismiss({
       prod:this.selectedItem,
       qte:this.qte
      });
    }
  }




}
