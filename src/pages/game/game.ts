import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CardSet, CardSetService, cardSetsSingleton } from '../../services/cardSet.service';
import { PlayGamePage } from "../play-game/play-game";


/**
 * Generated class for the GamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  cardSets: CardSet[] = cardSetsSingleton;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cardSetService: CardSetService) {
  }

  playGame(aCardSet: CardSet) {
    this.navCtrl.push(PlayGamePage, {
      CardSet: aCardSet
    });
  }

  ionViewDidLoad() {
    this.cardSetService.readCardSets(this.cardSets);
  }

}
