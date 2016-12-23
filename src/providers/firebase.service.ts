import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
// import * as _ from 'lodash';

@Injectable()
export class FireBaseService {

  // masterActivities: Array<{}>;
  userProjects;
  public userDetails$: FirebaseListObservable<any>;
  public masterActivities$: FirebaseListObservable<any>;
  public masterResources$: FirebaseListObservable<any>;
  public projectActivities$: FirebaseListObservable<any>;
  public activityResource$: FirebaseListObservable<any>;

  public usersList$: Observable<any>;
  constructor(private af: AngularFire) {
    this.fetchAuthDetails();
    this.fetchActivitiesList$();
    this.fetchResourcesList$();
  }

  fetchAuthDetails() {
    this.af.auth.subscribe(res => {
      if(!!res){
        this.fetchUsersList$(res.uid).subscribe(data => {
          return this.userProjects = data;
        });
        // this.fetchProjectForCurrentUser$();
      }
    })
  }

  fetchProjectForCurrentUser$() {
    return this.af.auth.map(user => user.uid)
    .switchMap(userId => this.fetchUsersList$(userId))
    .switchMap(userData => Observable.from(userData[0].projects))
    .mergeMap(projectId => this.fetchProjectDetail(projectId));
    // .subscribe(x => console.log(x));
  }

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

  fetchActivitiesList$(): FirebaseListObservable<any> {
    this.masterActivities$ = this.af.database.list('/activitiesList') as FirebaseListObservable<any>;
    return this.masterActivities$;
  }

  fetchResourcesList$(): FirebaseListObservable<any> {
    this.masterResources$ = this.af.database.list('/resourcesList') as FirebaseListObservable<any>;
    return this.masterResources$;
  }

  fetchProjects$(): FirebaseListObservable<any> {
    return this.af.database.list('/projects') as FirebaseListObservable<any>;
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