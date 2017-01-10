import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as _ from 'lodash';

import { FireBaseService } from '../../providers/firebase.service';

/*
  Generated class for the AddActivityToProjects page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-activity-to-projects',
  templateUrl: 'add-activity-to-projects.html'
})
export class AddActivityToProjectsPage {

  month: string;
  year: number;
  userProjects: Array<{}> = [];
  selectedProject: Object;
  masterActivities: Array<{}>;
  selectedActivity: String;
  masterResources: Array<{}>;
  selectedResource: String;
  usedQuantity: string;
  event: any;
  today = new Date();
  modifiedValue: string;
  

  musicAlertOpts: { title: string, subTitle: string };

  constructor(public navCtrl: NavController, private fb: FireBaseService) {
    this.event = {
      month: this.today.getFullYear().toString()+"-"+this.pad((this.today.getMonth()+1))+"-"+this.pad(this.today.getDate())
    };
  }

  ionViewDidLoad() {

    this.fb.fetchProjects$().subscribe(res => {
      res.forEach(project => {
        this.fb.userProjects[0].projects.forEach(data => {
          if(project.$key === data){
            this.userProjects.push(project);
            this.userProjects = _.uniqBy(this.userProjects, '$key')
          }
        })
      })
    })
    this.fb.fetchActivitiesList$().subscribe(allActivities => {
      this.masterActivities = allActivities;
    })

    this.fb.fetchResourcesList$().subscribe(allResources => {
      this.masterResources = allResources;
    })
  }

  projectChange(event){
  }

  pad(d) {
    this.modifiedValue = (d < 10) ? '0' + d.toString() : d.toString();
    return this.modifiedValue;
  }

  addActivityToProject(){
    this.fb.addActivityToProject$(this.selectedProject, this.selectedActivity, this.selectedResource, parseInt(this.usedQuantity), this.event.month);
  }

  stpSelect() {
    console.log('STP selected');
  }
}