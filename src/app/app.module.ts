import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/resource/page1';
import { Page2 } from '../pages/page2/page2';
import { ResourceDetailsPage } from '../pages/resource-details/resource-details';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    ResourceDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
