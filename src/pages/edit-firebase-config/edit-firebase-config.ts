import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

import { Storage } from '@ionic/storage';
import { initializeApp } from "firebase";

import { firestore } from 'firebase/app';
import 'firebase/firestore';



/**
 * Generated class for the EditFirebaseConfigPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-firebase-config',
  templateUrl: 'edit-firebase-config.html',
})
export class EditFirebaseConfigPage {

  private firebaseConfig = {};


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {

    // retrieve config from local storage
    this.storage.get('firebaseConfig').then((firebaseConfig) => {

      if (firebaseConfig !== null) {
        this.firebaseConfig = firebaseConfig;
      }

      console.log('firebaseConfig: ', this.firebaseConfig);
    });

  }

  ionViewDidLeave() {

    // save config to local storage, so that credential need to be captured only once
    this.storage.set('firebaseConfig', this.firebaseConfig);
  }

  connect() {

    // initialize Firebase
    initializeApp(this.firebaseConfig);
    firestore().enablePersistence()
    .then( () => {
        console.log('Firestore Persistence enabled:', firestore());
    })
    .catch( anError => {
      console.log('Firestore Persistence failed:', anError);
    });


    this.navCtrl.setRoot(TabsPage);
  }

}
