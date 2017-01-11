import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  myFormValidation: FormGroup;
  

  musicAlertOpts: { title: string, subTitle: string };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fb: FireBaseService, private formBuilder: FormBuilder) {
    this.selectedProject = navParams.get('selectedProject');
    this.event = {
      month: this.today.getFullYear().toString()+"-"+this.pad((this.today.getMonth()+1))+"-"+this.pad(this.today.getDate())
    };
    this.myFormValidation = this.formBuilder.group({
      activity: ['', Validators.required],
      resource: ['', Validators.required],
      quantity: ['', Validators.required],
      date: [this.event.month]
    });
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

  pad(d) {
    this.modifiedValue = (d < 10) ? '0' + d.toString() : d.toString();
    return this.modifiedValue;
  }

  addActivityToProject(){
    console.log(this.myFormValidation.value);
    this.fb.addActivityToProject$(this.selectedProject["$key"], this.myFormValidation.value).then(value => {
      this.navCtrl.pop();
    });
  }

  stpSelect() {
    console.log('STP selected');
  }
}