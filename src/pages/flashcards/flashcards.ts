import { Component } from '@angular/core';

import { NavController, ModalController, AlertController } from 'ionic-angular';

import { Flashcard } from './flashcard-modal.component'

import { BookmarkService } from '../../app/bookmark.service'

@Component({
  selector: 'page-flashcards',
  templateUrl: 'flashcards.html'
})
export class Flashcards {
  flashcardStyles: Object[];
  deck: string;
  decks: string[];
  deckSelectOptions: Object = { title: "Select a Deck" };
  selectedFlashcardStyle: string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public bookmarkService: BookmarkService, private alertCtrl: AlertController) {
    this.decks = Object.keys(bookmarkService.categories)
    this.flashcardStyles = [
    { "title": "Passive", "info": "This is the easiest method. It involves seeing the {{name}} word and guessing English." },
    { "title": "Active", "info": "This method is designed to test your spelling of the {{ name }} word. You are provided with the English, and have to guess the {{ name } } word." },
    { "title": "Non-Written", "info": "This method is entirely without any written prompt. Try and guess the word in both English and {{ name }}!" }
  ]
  }

  startFlashcards() {
    if (this.deck === undefined) {
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Did you select a deck?',
        buttons: ['Try again']
      });
      alert.present();
    } else if (this.selectedFlashcardStyle === undefined) {
      let alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Did you select a flashcard style?',
        buttons: ['Try again']
      });
      alert.present();
    } else {
      let flashcardModal = this.modalCtrl.create(Flashcard, { deck: this.deck, style: this.selectedFlashcardStyle });
      flashcardModal.present();
    }
  }

}
