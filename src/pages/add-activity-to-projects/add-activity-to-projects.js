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
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { FireBaseService } from '../../providers/firebase.service';
/*
  Generated class for the AddActivityToProjects page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var AddActivityToProjectsPage = (function () {
    function AddActivityToProjectsPage(navCtrl, navParams, fb, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.formBuilder = formBuilder;
        this.userProjects = [];
        this.today = new Date();
        this.selectedProject = navParams.get('selectedProject');
        this.event = {
            month: this.today.getFullYear().toString() + "-" + this.pad((this.today.getMonth() + 1)) + "-" + this.pad(this.today.getDate())
        };
    }
    AddActivityToProjectsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.formValidation = this.formBuilder.group({
            activity: ['', Validators.required],
            resource: ['', Validators.required],
            quantity: ['', Validators.required]
        });
        this.fb.fetchProjects$().subscribe(function (res) {
            res.forEach(function (project) {
                _this.fb.userProjects[0].projects.forEach(function (data) {
                    if (project.$key === data) {
                        _this.userProjects.push(project);
                        _this.userProjects = _.uniqBy(_this.userProjects, '$key');
                    }
                });
            });
        });
        this.fb.fetchActivitiesList$().subscribe(function (allActivities) {
            _this.masterActivities = allActivities;
        });
        this.fb.fetchResourcesList$().subscribe(function (allResources) {
            _this.masterResources = allResources;
        });
    };
    AddActivityToProjectsPage.prototype.pad = function (d) {
        this.modifiedValue = (d < 10) ? '0' + d.toString() : d.toString();
        return this.modifiedValue;
    };
    AddActivityToProjectsPage.prototype.addActivityToProject = function () {
        var _this = this;
        this.fb.addActivityToProject$(this.selectedProject["$key"], this.selectedActivity, this.selectedResource, parseInt(this.usedQuantity), this.event.month).then(function (value) {
            _this.navCtrl.pop();
        });
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
    __metadata("design:paramtypes", [NavController, NavParams,
        FireBaseService, FormBuilder])
], AddActivityToProjectsPage);
export { AddActivityToProjectsPage };
//# sourceMappingURL=add-activity-to-projects.js.map