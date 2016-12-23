import { Component } from '@angular/core';
import { ResourceDetailsPage } from '../resource-details/resource-details.ts'
import { FireBaseService } from '../../providers/firebase.service';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Resource {

  projects: Array<{}> = [];

  constructor(public navCtrl: NavController, private fb: FireBaseService) {

    this.fb.fetchProjects$().subscribe(res => {
      res.forEach(project => {
        this.fb.userProjects[0].projects.forEach(data => {
          if(project.$key === data){
            this.projects.push(project);
          }
        })
      })
    })
  }

  ionViewDidLoad() {
    
  }

  itemTapped(event, project) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ResourceDetailsPage, {
      item: project
    });
  }
}
