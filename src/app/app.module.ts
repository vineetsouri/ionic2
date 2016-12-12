import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/resource/page1';
import { Page2 } from '../pages/page2/page2';
import { ResourceDetailsPage } from '../pages/resource-details/resource-details';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
  apiKey: 'AIzaSyB1uU4D27iEm54moCM_N1KS8vfOXTCmZbU',
  authDomain: 'ionic2-f99e1.firebaseapp.com',
  databaseURL: 'https://ionic2-f99e1.firebaseio.com',
  storageBucket: 'ionic2-f99e1.appspot.com'
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    ResourceDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    ResourceDetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
