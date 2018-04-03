import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


// <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script> ???
export const firebaseConfig = {
  apiKey: "AIzaSyCZItAzwCj8cDd0B1vF7pCaAykzBDSCVW4",
  authDomain: "ionic-survey.firebaseapp.com",
  databaseURL: "https://ionic-survey.firebaseio.com",
  projectId: "ionic-survey",
  storageBucket: "ionic-survey.appspot.com",
  messagingSenderId: "277842474556"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
