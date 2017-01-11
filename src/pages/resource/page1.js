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
import { ResourceDetailsPage } from '../resource-details/resource-details';
import { FireBaseService } from '../../providers/firebase.service';
import * as _ from 'lodash';
import { NavController, AlertController } from 'ionic-angular';
var Resource = (function () {
    function Resource(navCtrl, alertCtrl, fb) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.fb = fb;
        this.projects = [];
        this.fetchProjects();
    }
    Resource.prototype.ionViewDidLoad = function () {
        // this.projectsSubscription.
    };
    Resource.prototype.fetchProjects = function () {
        var _this = this;
        this.projectsSubscription = this.fb.fetchProjects$();
        this.projectsSubscription.subscribe(function (res) {
            res.forEach(function (project) {
                _this.fb.userProjects[0].projects.forEach(function (data) {
                    if (project.$key === data) {
                        _this.projects.push(project);
                        _this.projects = _.uniqBy(_this.projects, '$key');
                    }
                });
            });
        });
    };
    Resource.prototype.itemTapped = function (event, project) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ResourceDetailsPage, {
            item: project
        });
    };
    Resource.prototype.showPrompt = function (fab) {
        var _this = this;
        fab.close();
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.fb.addProject$(data).then(function (val) {
                            _this.fetchProjects();
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    return Resource;
}());
Resource = __decorate([
    Component({
        selector: 'page-page1',
        templateUrl: 'page1.html'
    }),
    __metadata("design:paramtypes", [NavController, AlertController,
        FireBaseService])
], Resource);
export { Resource };
//# sourceMappingURL=page1.js.map