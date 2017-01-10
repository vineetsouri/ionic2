import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
// import * as _ from 'lodash';

@Injectable()
export class FireBaseService {

  // masterActivities: Array<{}>;
  userProjects;
  userId;
  public userDetails$: FirebaseListObservable<any>;
  public masterProjects$: FirebaseListObservable<any>;
  public masterActivities$: FirebaseListObservable<any>;
  public masterResources$: FirebaseListObservable<any>;
  public projectActivities$: FirebaseListObservable<any>;
  public activityResource$: FirebaseListObservable<any>;

  public usersList$: Observable<any>;
  constructor(private af: AngularFire) {
    this.fetchUserProjects();
    this.fetchActivitiesList$();
    this.fetchResourcesList$();
  }

  fetchUserProjects() {
    this.af.auth.subscribe(res => {
      if(!!res){
        this.userId = res.uid;
        this.fetchUsersList$(res.uid).subscribe(data => {
          console.log(data);
          this.userProjects = data
          return this.userProjects;
        });
      }
    })
  }

  // fetchProjectForCurrentUser$() {
  //   return this.af.auth.map(user => user.uid)
  //   .switchMap(userId => this.fetchUsersList$(userId))
  //   .switchMap(userData => Observable.from(userData[0].projects))
  //   .mergeMap(projectId => this.fetchProjectDetail(projectId));
  //   // .subscribe(x => console.log(x));
  // }

  fetchProjectDetail(projectId) {
    return this.af.database.object(`/projects/${projectId}`);
  }

  fetchUsersList$(userId): FirebaseListObservable<any> {
    this.userDetails$ = this.af.database.list('/users', {
      query: {
        orderByChild: 'authId',
        equalTo: userId
      }
    }) as FirebaseListObservable<any>;
    return this.userDetails$;
  }

  addActivityToProject$(selectedProject: any, selectedActivity: any, selectedResource: any, usedQuantity: number, date: any) {
    this.af.database.list('activities').push({
      date: date,
      masterActivityId: selectedActivity,
      projectId : selectedProject
    }).then(val => {
      this.af.database.list('resources').push({
        activityId: val.key,
        masterResourceId: selectedResource,
        quantity : usedQuantity
      }).then(val => {
        console.log(val);
      })
    })
  }

  addProject$(projectDetails: any) {
    return this.af.database.list('projects').push({
      description: projectDetails.description,
      name: projectDetails.title
    }).then(val => {
      // this.fetchUsersList$(this.userId).subscribe(data => {
      //   data[0].projects.push(val.key);
      // });
    });
  }

  fetchActivitiesList$(): FirebaseListObservable<any> {
    this.masterActivities$ = this.af.database.list('/activitiesList') as FirebaseListObservable<any>;
    return this.masterActivities$;
  }

  fetchResourcesList$(): FirebaseListObservable<any> {
    this.masterResources$ = this.af.database.list('/resourcesList') as FirebaseListObservable<any>;
    return this.masterResources$;
  }

  fetchProjects$(): FirebaseListObservable<any> {
    this.masterProjects$ = this.af.database.list('/projects') as FirebaseListObservable<any>;
    return this.masterProjects$
  } 

  fetchProjectActivities$(projectId): FirebaseListObservable<any> {
    this.projectActivities$ = this.af.database.list('/activities', {
      query: {
        orderByChild: 'projectId',
        equalTo: projectId
      }
    }) as FirebaseListObservable<any>;
    return this.projectActivities$;
  }

  fetchActivityResources$(activityId): FirebaseListObservable<any> {
    this.activityResource$ = this.af.database.list('/resources', {
      query: {
        orderByChild: 'activityId',
        equalTo: activityId
      }
    }) as FirebaseListObservable<any>;
    return this.activityResource$;
  }


  logout(){
    this.af.auth.logout();
  }

}