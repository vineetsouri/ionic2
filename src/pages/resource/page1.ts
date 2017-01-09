import { Component } from '@angular/core';
import { ResourceDetailsPage } from '../resource-details/resource-details';
import { AddActivityToProjectsPage } from '../add-activity-to-projects/add-activity-to-projects';
import { FireBaseService } from '../../providers/firebase.service';
import { FirebaseListObservable } from 'angularfire2';

import * as _ from 'lodash';


import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Resource {

  projects: Array<{}> = [];
  projectsSubscription: FirebaseListObservable<any>

  constructor(public navCtrl: NavController, private fb: FireBaseService) {
    this.projectsSubscription = this.fb.fetchProjects$();
    this.projectsSubscription.subscribe(res => {
      res.forEach(project => {
        this.fb.userProjects[0].projects.forEach(data => {
          if(project.$key === data){
            this.projects.push(project);
            this.projects = _.uniqBy(this.projects, '$key');
          }
        })
      })
    })
  }

  ionViewDidLoad() {
    // this.projectsSubscription.
  }

  itemTapped(event, project) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ResourceDetailsPage, {
      item: project
    });
  }

  openPage(fab){
    fab.close();
    this.navCtrl.push(AddActivityToProjectsPage, {});
  }
}
