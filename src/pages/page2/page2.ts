import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase.service';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  userProjects: Array<{}> = [];
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams
            , private fb: FireBaseService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  // ionViewDidLoad() {
  //   this.fb.fetchProjectForCurrentUser$().subscribe(project => {
  //     this.userProjects.push(project);
  //     console.log(this.userProjects);
  //   })
  // }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Page2, {
      item: item
    });
  }
}
