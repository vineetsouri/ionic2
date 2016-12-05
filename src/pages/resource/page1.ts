import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  resources: Array<{}>;

  constructor(public navCtrl: NavController) {
    this.resources = [{
      title: "Excavators",
      quantity: 4,
      used: 2
    },
    {
      title: "Truck",
      quantity: 35,
      used: 20
    },
    {
      title: "Tractor",
      quantity: 50,
      used: 20
    },
    {
      title: "Man Power",
      quantity: 20,
      used: 15
    }]
  }
}
