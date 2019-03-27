import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Flashcard } from './flashcard-modal.component'
import { MTDService } from '../../app/mtd.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'page-flashcards',
  templateUrl: 'flashcards.html',
  styleUrls: ['flashcards.scss']
})
export class Flashcards {
  flashcardStyles$: Observable<any>;
  deck: string;
  decks$: Observable<string[]>;
  deckSelectOptions: Object = { header: "Select a Deck" };
  selectedFlashcardStyle: string;
  name$: Observable<string>;
  constructor(public modalCtrl: ModalController, public mtdService: MTDService, private alertCtrl: AlertController) {
    this.name$ = this.mtdService.name$
    this.decks$ = this.mtdService.category_keys$
    this.flashcardStyles$ = this.name$.pipe(
      map((name) =>
        [
          { "title": "Easy", "info": `See the ${name} word and guess English.` },
          { "title": "Medium", "info": `See the English and guess ${name}` },
          { "title": "Hard", "info": `See audio/image only and try and guess the word in both English and ${name}!` }
        ]
      )
    )
  }

  async startFlashcards() {
    if (this.deck === undefined) {
      let alert = await this.alertCtrl.create({
        header: 'Oops!',
        subHeader: 'Did you select a deck?',
        buttons: ['Try again']
      });
      await alert.present();
    } else if (this.selectedFlashcardStyle === undefined) {
      let alert = await this.alertCtrl.create({
        header: 'Oops!',
        subHeader: 'Did you select a flashcard style?',
        buttons: ['Try again']
      });
      await alert.present();
    } else {
      let flashcardModal = await this.modalCtrl.create({
        component: Flashcard,
        componentProps: { deck: this.deck, style: this.selectedFlashcardStyle }
      });
      await flashcardModal.present();
    }
  }

}
