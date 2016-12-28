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

  selectedProject: any;
  activityDetails: any;
  selectedDateActivityDetails: any;
  masterActivityList: any;
  masterResourceList: any;
  today = new Date();
  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fb: FireBaseService) {
    this.selectedProject = navParams.get('item');
    this.fb.masterActivities$.subscribe(res => {
      this.masterActivityList = res;
    });
    this.fb.masterResources$.subscribe(res => {
      this.masterResourceList = res;
    });
    this.event = {
      month: this.today.getFullYear().toString()+"-"+(this.today.getMonth()+1).toString()+"-"+this.today.getDate().toString()
    };
  }

  ionViewDidLoad() {
    this.fb.fetchProjectActivities$(this.selectedProject.$key).subscribe(res => {
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
      this.activityDetails = res;
      this.showActivities(this.event.month);
    })
  }

  showActivities(date){
    this.selectedDateActivityDetails = this.activityDetails.filter( activity => {
      return activity.date == date;
    })  
  }

  dateChange(e){
    var seletedDate = e.year.text+"-"+e.month.value.toString()+"-"+e.day.text;
    this.showActivities(seletedDate);
  }
}
