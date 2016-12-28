import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AngularFire } from 'angularfire2';
import { AddActivityToProjectsPage } from '../pages/add-activity-to-projects/add-activity-to-projects';
import { LoginPage } from '../pages/login/login';
import { Resource } from '../pages/resource/page1';
// import { Page2 } from '../pages/page2/page2';
import { FireBaseService } from '../providers/firebase.service';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  userName: String;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
    public menu: MenuController,private fb: FireBaseService,
    public af: AngularFire
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Resources', component: Resource },
    //   { title: 'Page Two', component: Page2 }
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.af.auth.subscribe(res => {
        if(!!res) {
          this.fb.fetchUsersList$(res.uid).subscribe(data => {
            this.userName = data[0].name;
            if (!!res && (data[0].role == "admin")){
              this.rootPage = Resource;
              this.pages = [{ title: 'Resources', component: Resource }]
            } else if(!!res && (data[0].role == "supervisor")){
              this.rootPage = Resource;
              this.pages = [{ title: 'Resources', component: Resource },
                            { title: 'Add Activity', component: AddActivityToProjectsPage }]
            }
          })
        }else {
          this.rootPage = LoginPage;
        }
      })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.af.auth.logout();
    this.menu.close();
    this.nav.setRoot(LoginPage);
  }

  ngOnDestroy(){
    console.log('in app component destroy');
  }
}
