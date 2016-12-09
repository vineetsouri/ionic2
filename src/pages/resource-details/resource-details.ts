import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ResourceDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resource-details',
  templateUrl: 'resource-details.html'
})
export class ResourceDetailsPage {

  selectedResource: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedResource = navParams.get('item');
  }

  ionViewDidLoad() {
    // console.log('Hello ResourceDetailsPage Page');
  }

}
