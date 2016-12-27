var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Resource } from '../pages/resource/page1';
import { Page2 } from '../pages/page2/page2';
import { FireBaseService } from '../providers/firebase.service';
import { LoginPage } from '../pages/login/login';
import { AddActivityToProjectsPage } from '../pages/add-activity-to-projects/add-activity-to-projects';
import { ResourceDetailsPage } from '../pages/resource-details/resource-details';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
export var firebaseConfig = {
    apiKey: 'AIzaSyB1uU4D27iEm54moCM_N1KS8vfOXTCmZbU',
    authDomain: 'ionic2-f99e1.firebaseapp.com',
    databaseURL: 'https://ionic2-f99e1.firebaseio.com',
    storageBucket: 'ionic2-f99e1.appspot.com'
};
export var firebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            LoginPage,
            Resource,
            Page2,
            ResourceDetailsPage,
            AddActivityToProjectsPage
        ],
        imports: [
            IonicModule.forRoot(MyApp),
            AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            LoginPage,
            Resource,
            Page2,
            ResourceDetailsPage,
            AddActivityToProjectsPage
        ],
        providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, FireBaseService]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map