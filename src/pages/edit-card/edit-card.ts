import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Card, CardSet, CardService } from "../../services/cardSet.service";
import { PhotoService } from "../../services/photo.service";

/**
 * MiT: Beispiel für Formulare in Ionic 2
 * https://forum.ionicframework.com/t/forms-just-can-find-a-working-example/63453/13
 * https://www.joshmorony.com/advanced-forms-validation-in-ionic-2/
 */

@Component({
  selector: 'page-edit-card',
  templateUrl: 'edit-card.html',
})
export class EditCardPage {

  card: Card = new Card();
  cardSet: CardSet = new CardSet();

  constructor(public navCtrl: NavController, public navParams: NavParams, private cardService: CardService, private photoService:PhotoService) {
  }

  ionViewDidLoad() {
    this.card = this.navParams.get("Card");
    this.cardSet = this.navParams.get("CardSet");
  }

  ionViewWillLeave() {
    this.cardService.updateCard(this.card);    
  }

  takePhoto() {
    this.photoService.takePhoto(this.card);
  }
  
}
