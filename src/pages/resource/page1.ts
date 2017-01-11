import { Component } from '@angular/core';
import { ResourceDetailsPage } from '../resource-details/resource-details';
import { FireBaseService } from '../../providers/firebase.service';
import { FirebaseListObservable } from 'angularfire2';

import * as _ from 'lodash';


import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Resource {

  projects: Array<{}> = [];
  projectsSubscription: FirebaseListObservable<any>

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              private fb: FireBaseService) {
    this.fetchProjects();
  }

  ionViewDidLoad() {
    // this.projectsSubscription.
  }

  fetchProjects() {
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

  itemTapped(event, project) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ResourceDetailsPage, {
      item: project
    });
  }

  showPrompt(fab) {
    fab.close();
    let prompt = this.alertCtrl.create({
      title: 'Add new Project',
      message: "Enter a name and description",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'description',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.fb.addProject$(data).then(val => {
              this.fetchProjects();
            })
          }
        }
      ]
    });
    prompt.present();
  }
}


