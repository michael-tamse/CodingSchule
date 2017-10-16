import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { GamePage } from '../pages/game/game';
import { PlayGamePage } from "../pages/play-game/play-game";
import { ManagePage } from '../pages/manage/manage';
import { EditCardSetPage } from "../pages/edit-card-set/edit-card-set";
import { EditCardPage } from "../pages/edit-card/edit-card";
import { EditFirebaseConfigPage } from "../pages/edit-firebase-config/edit-firebase-config";

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

import { CardSetService, CardService } from "../services/cardSet.service";
import { PhotoService } from "../services/photo.service";

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    PlayGamePage,
    ManagePage,
    EditCardSetPage,
    EditCardPage,
    EditFirebaseConfigPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    PlayGamePage,
    ManagePage,
    EditCardSetPage,
    EditCardPage,
    EditFirebaseConfigPage,
    TabsPage
  ],
  providers: [
    CardSetService,
    CardService,
    PhotoService,
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
