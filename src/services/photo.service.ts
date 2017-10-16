import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';
import { ActionSheetController} from 'ionic-angular';
import { storage } from "firebase";

//
// Good intro into pictures with Ionic2
//
// https://devdactic.com/ionic-2-images/
// 
// Attention: unfortunately is native/file not supported by Ionic Viewer

export interface PhotoId {
  id  : string;
  uri : string;
}

@Injectable()
export class PhotoService {

  constructor(private camera:Camera, private actionSheetController: ActionSheetController, private toastController: ToastController) {
  }

  public takePhoto(anId: PhotoId) {

    const options: CameraOptions = {
      sourceType      : 0, // 0 - Album , 1 - Camera, 2 - anderes Album ;)
      targetWidth     : 640,
      targetHeight    : 480,
      destinationType : this.camera.DestinationType.DATA_URL,
      allowEdit       : true,
      encodingType    : this.camera.EncodingType.JPEG,
      mediaType       : this.camera.MediaType.PICTURE
    }

    let actionSheet = this.actionSheetController.create({
      title: 'Foto für Deine Karte',
      buttons: [
        {
          text: 'Foto löschen',
          role: 'destructive',
          handler: () => {

            this.removePhotoById(anId);
            
          }
        },
        {
          text: 'Kamera',
          handler: () => {
            console.log('Kamera');

            // Camera
            options.sourceType = 1;

            this.camera.getPicture(options).then((imageData) => {

              this.savePhotoById(imageData, anId);

            }, (err) => {
              this.showLongTop(err.code);
            // Handle error
            });

          }
        },
        {
          text: 'Fotomediathek',
          handler: () => {
            console.log('Fotomediathek');

            // Album
            options.sourceType = 2;

            this.camera.getPicture(options).then((imageData) => {

              this.savePhotoById(imageData, anId);

            }, (err) => {
              this.showLongTop(err.code);
              // Handle error
            });

          }
        },
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            console.log('Abbrechen');
          }
        }
      ]
    });

    actionSheet.present();
  }

  private removePhotoById(anId: PhotoId) {
    anId.uri = 'http://via.placeholder.com/640x480';
  }

  private savePhotoById(someImageData, anId: PhotoId) {

    var storageRef = storage().ref('images/' + anId.id + '.jpg' );
    var metadata = {
      contentType: 'image/jpeg'
    };

    this.showLongTop("Putting Photo");
    
    storageRef.put( this.dataURItoUint8Array(someImageData), metadata ).
      then(snapshot => {
        anId.uri = snapshot.downloadURL;
        this.showLongTop("Download URL:" + snapshot.downloadURL);
      }).
      catch( err => {
        this.showLongTop(JSON.stringify(err));
      }
    );

  }

  // https://gist.github.com/fupslot/5015897
  // https://jsperf.com/base64-to-uint8array
  private dataURItoUint8Array(someBase64data): Uint8Array {

    var byteString = atob(someBase64data);

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    
    return ia;
  }

  private showLongTop(aMessage: string){
    const toast = this.toastController.create({
      message: aMessage,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}