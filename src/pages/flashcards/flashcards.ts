import { Component } from "@angular/core";

import { NavController, ModalController, AlertController } from "ionic-angular";

import { Flashcard } from "./flashcard-modal.component";

import { MTDService } from "../../app/mtd.service";

import { MTDInfo } from "../../app/global";

export interface FlashcardStyle {
  title: string;
  info: string;
  type: "active" | "audio" | "passive";
}

@Component({
  selector: "page-flashcards",
  templateUrl: "flashcards.html"
})
export class Flashcards {
  flashcardStyles: FlashcardStyle[];
  deck: string;
  decks: string[];
  deckSelectOptions: Object = { title: "Select a Deck" };
  selectedFlashcardStyle: string;
  language: string = MTDInfo.config["L1"]["name"];
  language2: string = MTDInfo.config["L2"]["name"];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public mtdService: MTDService,
    private alertCtrl: AlertController
  ) {
    this.decks = Object.keys(mtdService.categories);
    this.flashcardStyles = [
      {
        title: `Show ${this.language}`,
        info: `This is the easiest method. It involves seeing the ${this.language} word and guessing ${this.language2}.`,
        type: "passive"
      },
      {
        title: `Show ${this.language2}`,
        info: `This method is designed to test your spelling of the ${this.language} word. You are provided with the ${this.language2}, and have to guess the ${this.language} word.`,
        type: "active"
      },
      {
        title: "Audio Only",
        info: `This method is entirely without any written prompt. Try and guess the word in both ${this.language2} and ${this.language}!`,
        type: "audio"
      }
    ];
  }

  startFlashcards() {
    if (this.deck === undefined) {
      let alert = this.alertCtrl.create({
        title: "Oops!",
        subTitle: "Did you select a deck?",
        buttons: ["Try again"]
      });
      alert.present();
    } else if (this.selectedFlashcardStyle === undefined) {
      let alert = this.alertCtrl.create({
        title: "Oops!",
        subTitle: "Did you select a flashcard style?",
        buttons: ["Try again"]
      });
      alert.present();
    } else {
      let flashcardModal = this.modalCtrl.create(Flashcard, {
        deck: this.deck,
        style: this.selectedFlashcardStyle
      });
      flashcardModal.present();
    }
  }
}
