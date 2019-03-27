import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, AlertController } from '@ionic/angular';
import { BookmarkService } from '../../app/bookmark.service'
import { DictionaryData } from '../../app/models';

@Component({
  selector: 'flashcard-modal',
  templateUrl: 'flashcard-modal.component.html'
})


export class Flashcard {
  displayImages: boolean = true; //default show images, turns to false on 404
  card: DictionaryData;
  categories: Object;
  deck: string;
  front: Boolean;
  image: string;
  startIndex: number = 0;
  style: string;
  audio_playing = [];
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, private navParams: NavParams, private bookmarkService: BookmarkService, public modalCtrl: ModalController, private plt: Platform) {

    // this.deck = this.navParams.get('deck');
    // this.categories = bookmarkService.categories
    // this.card = this.categories[this.deck][this.startIndex]
    // this.front = true;
    // try {
    //   this.image = 'assets/img/' + this.card.img[0];
    // } catch (error) {
    //   this.image = "";
    // }

    // this.style = this.navParams.get('style');
  }

  // Go to previous card in deck
  prev1() {
    if (this.startIndex - 1 > 0) {
      this.startIndex -= 1
      this.card = this.categories[this.deck][this.startIndex]
      try {
        this.image = 'assets/img/' + this.card.img[0];
      } catch (error) {

      }
    } else {
      this.startIndex = 0
      this.card = this.categories[this.deck][this.startIndex]
      try {
        this.image = 'assets/img/' + this.card.img[0];
      } catch (error) {

      }
    }
  }

  // Go to next card in deck
  next1() {
    if (this.startIndex + 1 < this.categories[this.deck].length) {
      this.startIndex += 1
      this.card = this.categories[this.deck][this.startIndex]
      try {
        this.image = 'assets/img/' + this.card.img[0];
      } catch (error) {

      }
    } else {
      this.startIndex = this.categories[this.deck].length - 1
      this.card = this.categories[this.deck][this.startIndex]
      try {
        this.image = 'assets/img/' + this.card.img[0];
      } catch (error) {

      }
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSuccess(id) {
    console.log(id)
    // console.log('loaded audio ${id} with path of ${path}'); 
  };

  async onError(err) {
    console.log(err)
    let alert = await this.alertCtrl.create({
      header: 'Sorry',
      subHeader: "We don't have audio for that entry.",
      buttons: ['OK']
    });
    await alert.present();
  };

  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Sorry',
      subHeader: 'There is no audio for this yet.',
      buttons: ['Dismiss']
    });
    await alert.present();
  };

  imageError() {
    this.displayImages = false;
  }

  toggleFav(entry) {
    this.bookmarkService.toggleBookmark(entry)
  }

  favourited(entry) {
    return this.bookmarkService.bookmarks.value.indexOf(entry) > -1
  }

}