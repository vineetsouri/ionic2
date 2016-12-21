import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
// import * as _ from 'lodash';

@Injectable()
export class FireBaseService {

  public usersList$: Observable<any>;
  constructor(private af: AngularFire) {
    console.log('In AF constructor');
  }


  fetchActivitiesList$(): FirebaseListObservable<any> {
    return this.af.database.list('/activitiesList') as FirebaseListObservable<any>;
  }

  fetchResourcesList$(): FirebaseListObservable<any> {
    return this.af.database.list('/resourcesList') as FirebaseListObservable<any>;
  }

  fetchProjects$(): FirebaseListObservable<any> {
    return this.af.database.list('/projects') as FirebaseListObservable<any>;
  }

  fetchProjectActivities$(projectId): FirebaseListObservable<any> {
    return this.af.database.list('/activities', {
      query: {
        orderByChild: 'projectId',
        equalTo: projectId
      }
    }) as FirebaseListObservable<any>;
  }



  logout(){
    this.af.auth.logout();
  }

}