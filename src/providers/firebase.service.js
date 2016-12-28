var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AngularFire } from 'angularfire2';
// import * as _ from 'lodash';
var FireBaseService = (function () {
    function FireBaseService(af) {
        this.af = af;
        this.fetchUserProjects();
        this.fetchActivitiesList$();
        this.fetchResourcesList$();
    }
    FireBaseService.prototype.fetchUserProjects = function () {
        var _this = this;
        this.af.auth.subscribe(function (res) {
            if (!!res) {
                _this.fetchUsersList$(res.uid).subscribe(function (data) {
                    console.log(data);
                    _this.userProjects = data;
                    return _this.userProjects;
                });
            }
        });
    };
    FireBaseService.prototype.fetchProjectForCurrentUser$ = function () {
        var _this = this;
        return this.af.auth.map(function (user) { return user.uid; })
            .switchMap(function (userId) { return _this.fetchUsersList$(userId); })
            .switchMap(function (userData) { return Observable.from(userData[0].projects); })
            .mergeMap(function (projectId) { return _this.fetchProjectDetail(projectId); });
        // .subscribe(x => console.log(x));
    };
    FireBaseService.prototype.fetchProjectDetail = function (projectId) {
        return this.af.database.object("/projects/" + projectId);
    };
    FireBaseService.prototype.fetchUsersList$ = function (userId) {
        this.userDetails$ = this.af.database.list('/users', {
            query: {
                orderByChild: 'authId',
                equalTo: userId
            }
        });
        return this.userDetails$;
    };
    FireBaseService.prototype.fetchActivitiesList$ = function () {
        this.masterActivities$ = this.af.database.list('/activitiesList');
        return this.masterActivities$;
    };
    FireBaseService.prototype.fetchResourcesList$ = function () {
        this.masterResources$ = this.af.database.list('/resourcesList');
        return this.masterResources$;
    };
    FireBaseService.prototype.fetchProjects$ = function () {
        return this.af.database.list('/projects');
    };
    FireBaseService.prototype.fetchProjectActivities$ = function (projectId) {
        this.projectActivities$ = this.af.database.list('/activities', {
            query: {
                orderByChild: 'projectId',
                equalTo: projectId
            }
        });
        return this.projectActivities$;
    };
    FireBaseService.prototype.fetchActivityResources$ = function (activityId) {
        this.activityResource$ = this.af.database.list('/resources', {
            query: {
                orderByChild: 'activityId',
                equalTo: activityId
            }
        });
        return this.activityResource$;
    };
    FireBaseService.prototype.logout = function () {
        this.af.auth.logout();
    };
    return FireBaseService;
}());
FireBaseService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFire])
], FireBaseService);
export { FireBaseService };
//# sourceMappingURL=firebase.service.js.map