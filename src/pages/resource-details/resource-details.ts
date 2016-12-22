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
  masterActivityList: any;
  masterResourceList: any;
  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fb: FireBaseService) {
    this.selectedResource = navParams.get('item');
    this.fb.masterActivities$.subscribe(res => {
      this.masterActivityList = res;
    });
    this.fb.masterResources$.subscribe(res => {
      this.masterResourceList = res;
    });
  }

  ionViewDidLoad() {
    this.fb.fetchProjectActivities$(this.selectedResource.$key).subscribe(res => {
      res.forEach(data => {
        this.masterActivityList.forEach(activity => {
          if(data.masterActivityId == activity.$key){
            data["masterActivityName"] = activity.name;
            this.fb.fetchActivityResources$(data.$key).subscribe(res1 => {
              res1.forEach(data1 => {
                this.masterResourceList.forEach(resource => {
                  if(data1.masterResourceId == resource.$key) {
                    data1["masterResourceName"] = resource.name;
                    data["resourceDetails"] = data1;
                  }
                })
              })
            })
          }
        })
      })
      console.log(res);
      this.activityDetails = res;
    })
  }
}
