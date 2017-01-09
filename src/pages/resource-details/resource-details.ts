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
  modifiedValue: string;
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
      month: this.today.getFullYear().toString()+"-"+this.pad((this.today.getMonth()+1))+"-"+this.pad(this.today.getDate())
    };
  }

  ionViewCanEnter() {
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

  pad(d) {
    this.modifiedValue = (d < 10) ? '0' + d.toString() : d.toString();
    return this.modifiedValue;
  }

  dateChange(e){
    var selectedDate = e.year.text+"-"+this.pad(e.month.value)+"-"+e.day.text;
    this.showActivities(selectedDate);
  }
}
