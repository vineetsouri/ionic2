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
import { FireBaseService } from '../../providers/firebase.service';
/*
  Generated class for the ResourceDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ResourceDetailsPage = (function () {
    function ResourceDetailsPage(navCtrl, navParams, fb) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.today = new Date();
        this.selectedProject = navParams.get('item');
        this.fb.masterActivities$.subscribe(function (res) {
            _this.masterActivityList = res;
        });
        this.fb.masterResources$.subscribe(function (res) {
            _this.masterResourceList = res;
        });
        this.event = {
            month: this.today.getFullYear().toString() + "-" + (this.today.getMonth() + 1).toString() + "-" + this.today.getDate().toString()
        };
    }
    ResourceDetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.fb.fetchProjectActivities$(this.selectedProject.$key).subscribe(function (res) {
            res.forEach(function (data) {
                _this.masterActivityList.forEach(function (activity) {
                    if (data.masterActivityId == activity.$key) {
                        data["masterActivityName"] = activity.name;
                        _this.fb.fetchActivityResources$(data.$key).subscribe(function (res1) {
                            res1.forEach(function (data1) {
                                _this.masterResourceList.forEach(function (resource) {
                                    if (data1.masterResourceId == resource.$key) {
                                        data1["masterResourceName"] = resource.name;
                                        data["resourceDetails"] = data1;
                                    }
                                });
                            });
                        });
                    }
                });
            });
            _this.activityDetails = res;
            _this.showActivities(_this.event.month);
        });
    };
    ResourceDetailsPage.prototype.showActivities = function (date) {
        this.selectedDateActivityDetails = this.activityDetails.filter(function (activity) {
            return activity.date == date;
        });
    };
    ResourceDetailsPage.prototype.dateChange = function (e) {
        var seletedDate = e.year.text + "-" + e.month.value.toString() + "-" + e.day.text;
        this.showActivities(seletedDate);
    };
    return ResourceDetailsPage;
}());
ResourceDetailsPage = __decorate([
    Component({
        selector: 'page-resource-details',
        templateUrl: 'resource-details.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        FireBaseService])
], ResourceDetailsPage);
export { ResourceDetailsPage };
//# sourceMappingURL=resource-details.js.map