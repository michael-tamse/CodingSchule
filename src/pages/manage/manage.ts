import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CardSet, CardSetService, cardSetsSingleton } from "../../services/cardSet.service";
import { EditCardSetPage } from "../edit-card-set/edit-card-set";

/**
 * Generated class for the ManagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {

  cardSets: CardSet[] = cardSetsSingleton;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cardSetService: CardSetService) {
  }

  deleteCardSet(cardSet: CardSet) {
    this.cardSetService.deleteCardSet(cardSet, this.cardSets);
  }

  addCardSet() {
    this.editCardSet(this.cardSetService.createCardSet(this.cardSets));
  }

  editCardSet(cardSet: CardSet) {
    this.navCtrl.push(EditCardSetPage, {
      CardSet: cardSet
    });
  }

  ionViewDidLoad() {
    this.cardSetService.readCardSets(this.cardSets);
  }

}
