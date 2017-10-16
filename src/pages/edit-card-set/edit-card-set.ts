import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditCardPage } from "../edit-card/edit-card";
import { CardSet, Card, CardService, CardSetService } from "../../services/cardSet.service";
import { PhotoService } from "../../services/photo.service";

@Component({
  selector: 'page-edit-card-set',
  templateUrl: 'edit-card-set.html',
})
export class EditCardSetPage {

  cardSet : CardSet = new CardSet();
  cards   : Card[] = [];

  constructor(
    public navCtrl          : NavController, 
    public navParams        : NavParams, 
    private cardService     : CardService, 
    private cardSetService  : CardSetService, 
    private photoService    : PhotoService) {
  }

  addCard() {
    this.editCard(this.cardService.createCardForCardSet(this.cardSet, this.cards));
  }

  deleteCard(aCard: Card) {
    this.cardService.deleteCard(aCard, this.cards);
  }
  
  editCard(aCard: Card) {
    this.navCtrl.push(EditCardPage, {
      Card: aCard,
      CardSet: this.cardSet
    });
  }

  ionViewDidLoad() {
    this.cardSet = this.navParams.get("CardSet");
     this.cardService.readCardsByCardSet(this.cardSet, this.cards);
  }

  ionViewWillLeave() {
    this.cardSetService.updateCardSet(this.cardSet);
  }

  takePhoto() {
    this.photoService.takePhoto(this.cardSet);
  }

}
