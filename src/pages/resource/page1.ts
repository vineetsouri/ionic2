import { Component } from '@angular/core';
import { ResourceDetailsPage } from '../resource-details/resource-details.ts'
import { FireBaseService } from '../../providers/firebase.service';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Resource {

  resources: Array<{}>;
  projects: Array<{}>;

  constructor(public navCtrl: NavController, private fb: FireBaseService) {
    this.resources = [{
      title: "Excavators",
      icon: "flask",
      quantity: 4,
      used: 2
    },
    {
      title: "Truck",
      icon: "boat",
      quantity: 35,
      used: 20
    },
    {
      title: "Tractor",
      icon: "build",
      quantity: 50,
      used: 20
    },
    {
      title: "Man Power",
      icon: "beer",
      quantity: 20,
      used: 15
    }];

    this.fb.fetchProjects$().subscribe(res => {
      this.projects = res;
      console.log(res);
    })
  }


  ionViewDidLoad() {
    this.fb.fetchActivitiesList$().subscribe(res => {
      console.log(res);
    })

    
  }

  itemTapped(event, project) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ResourceDetailsPage, {
      item: project
    });
  }


}
