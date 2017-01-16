import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResourceDetailsPage } from '../resource-details/resource-details'

/*
  Generated class for the ResourceDetailsTab page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resource-details-tab',
  templateUrl: 'resource-details-tab.html'
})
export class ResourceDetailsTabPage {

  tab1Root: any;
  tab2Root: any;

  constructor(public navCtrl: NavController) {
    this.tab1Root = ResourceDetailsPage;
    this.tab2Root = ResourceDetailsPage;
  }

  ionViewDidLoad() {
    console.log('Hello ResourceDetailsTabPage Page');
  }

}
