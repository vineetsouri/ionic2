import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase.service'
import { AddActivityToProjectsPage } from '../add-activity-to-projects/add-activity-to-projects';

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
  isManage: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fb: FireBaseService, public alerCtrl: AlertController) {
    // this.selectedProject = navParams.get('item');

    this.selectedProject = navParams.data;

    this.isManage = false;

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
    this.getActivities();
  }

  getActivities(){
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

  ionViewDidEnter(){
    if(this.navCtrl['tabTitle'] == "Manage Activities"){
      this.isManage = true;
    }
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

  openPage(fab){
    fab.close();
    this.navCtrl.push(AddActivityToProjectsPage, {
      selectedProject: this.selectedProject
    });
  }

  deleteActivity(activity){
    let  handlerfunction = () => {
      this.fb.removeActivityFromProject(activity).then(val => {
        this.getActivities();
      });
    }
    
    let confirm = this.alerCtrl.create({
      title: 'Delete this Activity?',
      message: 'Are you sure. You want to delete this activity?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: handlerfunction
        }
      ]
    });
    confirm.present()
  }
}
