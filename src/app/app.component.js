var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AngularFire } from 'angularfire2';
import { AddActivityToProjectsPage } from '../pages/add-activity-to-projects/add-activity-to-projects';
import { LoginPage } from '../pages/login/login';
import { Resource } from '../pages/resource/page1';
// import { Page2 } from '../pages/page2/page2';
import { FireBaseService } from '../providers/firebase.service';
var MyApp = (function () {
    function MyApp(platform, menu, fb, af) {
        this.platform = platform;
        this.menu = menu;
        this.fb = fb;
        this.af = af;
        this.initializeApp();
        // used for an example of ngFor and navigation
        // this.pages = [
        //   { title: 'Resources', component: Resource },
        //   { title: 'Page Two', component: Page2 }
        // ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            _this.af.auth.subscribe(function (res) {
                if (!!res) {
                    _this.fb.fetchUsersList$(res.uid).subscribe(function (data) {
                        _this.userName = data[0].name;
                        if (!!res && (data[0].role == "admin")) {
                            _this.rootPage = Resource;
                            _this.pages = [{ title: 'Resources', component: Resource }];
                        }
                        else if (!!res && (data[0].role == "supervisor")) {
                            _this.rootPage = Resource;
                            _this.pages = [{ title: 'Resources', component: Resource },
                                { title: 'Add Activity', component: AddActivityToProjectsPage }];
                        }
                    });
                }
                else {
                    _this.rootPage = LoginPage;
                }
            });
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.logout = function () {
        this.af.auth.logout();
        this.menu.close();
        this.nav.setRoot(LoginPage);
    };
    MyApp.prototype.ngOnDestroy = function () {
        console.log('in app component destroy');
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform,
        MenuController, FireBaseService,
        AngularFire])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map