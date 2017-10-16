import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { CardSet, InGameCard,  CardService } from "../../services/cardSet.service";

@Component({
  selector: 'page-play-game',
  templateUrl: 'play-game.html',
})
export class PlayGamePage {

  @ViewChild(Slides) slides: Slides;

  cardSet : CardSet = new CardSet();
  cards   : InGameCard[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private cardService: CardService) {
  }


  ionViewDidLoad() {

    this.cardSet = this.navParams.get("CardSet");
    this.cardService.readShuffledInGameCardsByCardSet(this.cardSet, this.cards);

    // reference, so that cards is accessible in paginationBulletRender
    let cards:InGameCard[]  = this.cards;
    
    // bullets present state of cards
    this.slides.paginationBulletRender = function (index, className) {

      if (cards.length === 0) {
        return "";
      }

      return    '<button class="' 
        + className + ' ' 
        + ['','card-correct-answer','card-wrong-answer'][cards[index].state] 
        + '" aria-label="Go to slide '+ index 
        + '" data-slide-index="'+ index 
        +'"></button>';
    }
  }
  
  answerChanged(event) {
    console.log("answer changed", event);

    // loose focus
    event.target.blur();

    // update slide color
    this.slides.update();

  }

}
