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
import { ResourceDetailsPage } from '../resource-details/resource-details.ts';
import { FireBaseService } from '../../providers/firebase.service';
import { NavController } from 'ionic-angular';
var Resource = (function () {
    function Resource(navCtrl, fb) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.projects = [];
        this.fb.fetchProjects$().subscribe(function (res) {
            debugger;
            res.forEach(function (project) {
                _this.fb.userProjects[0].projects.forEach(function (data) {
                    if (project.$key === data) {
                        _this.projects.push(project);
                    }
                });
            });
        });
    }
    Resource.prototype.ionViewDidLoad = function () {
    };
    Resource.prototype.itemTapped = function (event, project) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ResourceDetailsPage, {
            item: project
        });
    };
    return Resource;
}());
Resource = __decorate([
    Component({
        selector: 'page-page1',
        templateUrl: 'page1.html'
    }),
    __metadata("design:paramtypes", [NavController, FireBaseService])
], Resource);
export { Resource };
//# sourceMappingURL=page1.js.map