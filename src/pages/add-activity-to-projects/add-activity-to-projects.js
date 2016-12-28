var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase.service';
/*
  Generated class for the AddActivityToProjects page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var AddActivityToProjectsPage = (function () {
    function AddActivityToProjectsPage(navCtrl, fb) {
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.gaming = "n64";
        this.gender = "f";
        this.userProjects = [];
        this.musicAlertOpts = {
            title: '1994 Music',
            subTitle: 'Select your favorite'
        };
        // this.projects = this.fb.fetchUserProjects();
    }
    AddActivityToProjectsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.fb.fetchProjects$().subscribe(function (res) {
            console.log(res);
            res.forEach(function (project) {
                _this.fb.userProjects[0].projects.forEach(function (data) {
                    console.log(data);
                    if (project.$key === data) {
                        _this.userProjects.push(project);
                    }
                });
            });
            console.log(_this.userProjects);
        });
        console.log('Hello AddActivityToProjectsPage Page');
    };
    AddActivityToProjectsPage.prototype.stpSelect = function () {
        console.log('STP selected');
    };
    return AddActivityToProjectsPage;
}());
AddActivityToProjectsPage = __decorate([
    Component({
        selector: 'page-add-activity-to-projects',
        templateUrl: 'add-activity-to-projects.html'
    }),
    __metadata("design:paramtypes", [NavController, FireBaseService])
], AddActivityToProjectsPage);
export { AddActivityToProjectsPage };
//# sourceMappingURL=add-activity-to-projects.js.map