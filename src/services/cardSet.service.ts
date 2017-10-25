import { PhotoId } from './photo.service';

// https://forum.ionicframework.com/t/firebase-cloud-firestore/107603/5
// https://github.com/firebase/firebase-js-sdk/issues/182
import { firestore } from 'firebase/app';
import 'firebase/firestore';

/* 
Eine Möglichkeit uuids zu erzeugen. Besser ist es jedoch,
die Verwaltung der ids firestore zu überlassen.

declare function require(moduleName: string): any;
const uuidv4 = require('uuid/v4');
*/

export var cardSetsSingleton : CardSet[] = [];

export class CardSet implements PhotoId {
  id    : string;
  uri   : string;
  name  : string;
}

export class Card implements PhotoId {
  id          : string;
  uri         : string;
  cardSetId   : string
  question    : string;
  answer      : string;
}

export enum AnswerState {
  unanswered,
  correct,
  wrong
}

export class InGameCard implements PhotoId {

  answer: string = '';

  constructor(private card: Card) {
  }

  get id():string {
    return this.card.id;
  }

  get uri():string {
    return this.card.uri;
  }

  get question():string {
    return this.card.question;
  }

  get state():AnswerState {

    if (this.answer === '') {
      return AnswerState.unanswered;

    } else if (this.answer === this.card.answer) {
      return AnswerState.correct;
      
    } else {
      return AnswerState.wrong;
    }
  }

  get stateAsString():string {
    return['unbeantwortet','korrekt','falsch'][this.state];
  }

}

export class CardService {

  private createCardFromSnapshop(aCardSnapshot): Card {
    let card   = new Card();

    card.id          = aCardSnapshot.id;
    card.uri         = aCardSnapshot.data().uri;
    card.cardSetId   = aCardSnapshot.data().cardSetId;
    card.question    = aCardSnapshot.data().question;
    card.answer      = aCardSnapshot.data().answer;

    // console.log("createCardFromSnapshop:", card);

    return card;
  }

  createCardForCardSet(aCardSet: CardSet, someCards: Card[]): Card {

    // create card
    let card : Card = new Card();
    card.uri        = 'http://via.placeholder.com/640x480';
    card.cardSetId  = aCardSet.id;
    card.question   = '';
    card.answer     = '';

    // add card to local array
    someCards.push(card);

    // save card to database
    firestore().collection("cardSets").doc(aCardSet.id).collection("cards").add({
    })
    .then( docRef => {
      card.id = docRef.id;
      this.updateCard(card);
    })
    .catch( error => {
      console.error("Error adding document: ", error);
    });


      
    return card;
  }

  readCardsByCardSet(aCardSet: CardSet, someCards: Card[]) {
    someCards.splice(0,someCards.length);
    
    firestore().collection("cardSets").doc(aCardSet.id).collection("cards")
    .get()
    .then( cardSetSnapshot => {
      cardSetSnapshot.forEach( cardSnapshot => {

        someCards.push(
            this.createCardFromSnapshop(cardSnapshot) 
          );
          
        });
    })
    .catch( error => {
      console.log('readCardsByCardSet() failed:', error);
    });
  }

  readShuffledInGameCardsByCardSet(aCardSet: CardSet, someInGameCards: InGameCard[]) {
    someInGameCards.splice(0,someInGameCards.length);

    firestore().collection("cardSets").doc(aCardSet.id).collection("cards")
    .get()
    .then( cardSetSnapshot => {

      cardSetSnapshot.forEach( cardSnapshot => {

        someInGameCards.push(
          new InGameCard( this.createCardFromSnapshop(cardSnapshot) )
        );

      });

      this.shuffle(someInGameCards);
    })
    .catch( error => {
      console.log('readShuffledInGameCardsByCardSet() failed:', error);
    });
  }

  updateCard(aCard: Card) {
    firestore().collection("cardSets").doc(aCard.cardSetId).collection("cards").doc(aCard.id).set({
      uri         : aCard.uri,
      cardSetId   : aCard.cardSetId,
      question    : aCard.question,
      answer      : aCard.answer
    });
  }

  deleteCard(aCardToDelete: Card, someCards: Card[]) {

    // remove from local array
    let index = someCards.indexOf(aCardToDelete);
    if (index >=0 ) {
      someCards.splice(index, 1);
    }

    // remove from database
    firestore().collection('cardSets').doc(aCardToDelete.cardSetId).collection('cards').doc(aCardToDelete.id).delete();
  }

  private getRandom(aMin: number, aMax: number):number {
    return Math.floor(Math.random() * (aMax - aMin)) + aMin;
  }

  private shuffle(anArray: Array<InGameCard>): Array<InGameCard> {
    
    if (anArray.length <= 1) return anArray;

    for (let i = 0; i < anArray.length; i++) {
      const randomChoiceIndex = this.getRandom(i, anArray.length - 1);
      [anArray[i], anArray[randomChoiceIndex]] = [anArray[randomChoiceIndex], anArray[i]];
    }
    return anArray;
  }

}

export class CardSetService {

  private createCardSetFromSnapshop(aCardSetSnapshot): CardSet {
    let cardSet   = new CardSet();
    cardSet.id    = aCardSetSnapshot.id;
    cardSet.name  = aCardSetSnapshot.data().name;
    cardSet.uri   = aCardSetSnapshot.data().uri;

    // console.log("createCardSetFromSnapshop:", cardSet);

    return cardSet;
  }

  createCardSet(someCardSets: CardSet[]): CardSet {
    
    // create instance
    let cardSet : CardSet = new CardSet();
    cardSet.name = 'unbenannt';
    cardSet.uri = 'http://via.placeholder.com/640x480';

    // add to local array
    someCardSets.push(cardSet);
    
    // add to database
    firestore().collection("cardSets").add({
    })
    .then( docRef => {
      cardSet.id = docRef.id;
      this.updateCardSet(cardSet);
    })
    .catch( error => {
      console.error("Error adding document: ", error);
    });

    return cardSet;
  }

  readCardSets(someCardSets: CardSet[]) {
    someCardSets.splice(0,someCardSets.length);

    firestore().collection("cardSets").get()
    .then(snapshot => {
      snapshot.forEach( cardSetSnapshot => {
        someCardSets.push(this.createCardSetFromSnapshop(cardSetSnapshot));
      });
    })
    .catch( error => {
      console.log('readCardSets() failed:', error);
    });
  }

  updateCardSet(aCardSet: CardSet) {
    firestore().collection("cardSets").doc(aCardSet.id).set({
      uri   : aCardSet.uri,
      name  : aCardSet.name
    });
  }

  deleteCardSet(anCardSetToDelete: CardSet, someCardSets: CardSet[]) {

    // remove it from local array
    let index = someCardSets.indexOf(anCardSetToDelete);
    if (index >=0 ) {
        someCardSets.splice(index, 1);
    }
    
    // remove cards from database
    firestore().collection("cardSets").doc(anCardSetToDelete.id).collection('cards')
    .get()
    .then( cardsSnapshot => {
      var batch = firestore().batch();

      cardsSnapshot.docs.forEach(cardSnapshot => {
        batch.delete(cardSnapshot.ref);
      });

      batch.commit();
    });

    // remove cardSet from database
    firestore().collection("cardSets").doc(anCardSetToDelete.id).delete();
  }

}