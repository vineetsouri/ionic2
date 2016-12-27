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

  gaming: string = "n64";
  gender: string = "f";
  os: string;
  music: string;
  month: string;
  year: number;
  userProjects: Array<{}> = [];
  selectedProject: Object;

  musicAlertOpts: { title: string, subTitle: string };

  constructor(public navCtrl: NavController, private fb: FireBaseService) {
    this.musicAlertOpts = {
      title: '1994 Music',
      subTitle: 'Select your favorite'
    };

    // this.projects = this.fb.fetchUserProjects();
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
  }

  stpSelect() {
    console.log('STP selected');
  }
}