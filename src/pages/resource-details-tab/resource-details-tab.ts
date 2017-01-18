import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ResourceDetailsPage } from '../resource-details/resource-details';
// import { Page2 } from '../page2/page2'

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
  activityParams: any;
  activityParams2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.activityParams = navParams.get('item');

    this.tab1Root = ResourceDetailsPage;
    this.tab2Root = ResourceDetailsPage;
  }

  ionViewDidLoad() {
  }

}
