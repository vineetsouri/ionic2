import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase.service'

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
  activityDetails: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fb: FireBaseService) {
    this.selectedResource = navParams.get('item');
  }

  ionViewDidLoad() {
    this.fb.fetchProjectActivities$(this.selectedResource.$key).subscribe(res => {
      this.activityDetails = res;
    })
    // console.log('Hello ResourceDetailsPage Page');
  }

}
