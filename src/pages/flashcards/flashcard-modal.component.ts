import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, Platform, AlertController } from 'ionic-angular';

import { Entry } from '../shared/entry.model'

import { MTDService } from '../../app/mtd.service'

import { File } from '@ionic-native/file';

import { NativeAudio } from '@ionic-native/native-audio'

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { MTDInfo } from '../../app/global'

@Component({
  selector: 'flashcard-modal',
  templateUrl: 'flashcard-modal.component.html'
})


export class Flashcard {
  displayImages: boolean = true; //default show images, turns to false on 404
  card: Entry;
  categories: Object;
  deck: string;
  front: Boolean;
  image: string;
  startIndex: number = 0;
  style: string;
  audio_playing = [];
  audio_path: string = MTDInfo.config['audio_path']
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, private navParams: NavParams, private mtdService: MTDService, public viewCtrl: ViewController, private file: File, private plt: Platform, private transfer: FileTransfer, private nativeAudio: NativeAudio) {

    this.deck = navParams.get('deck');
    this.categories = mtdService.categories
    this.card = this.categories[this.deck][this.startIndex]
    this.front = true;
    try {
      this.image = 'assets/img/' + this.card.img;
    } catch (error) {
      this.image = "";
    }

    this.style = navParams.get('style');
  }

  fileTransfer: FileTransferObject = this.transfer.create();


  // Go to previous card in deck
  prev1() {
    if (this.startIndex - 1 > 0) {
      this.startIndex -= 1
      this.card = this.categories[this.deck][this.startIndex]
      try {
        this.image = 'assets/img/' + this.card.img;
      } catch (error) {

      }
    } else {
      this.startIndex = 0
      this.card = this.categories[this.deck][this.startIndex]
      try {
        this.image = 'assets/img/' + this.card.img;
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
        this.image = 'assets/img/' + this.card.img;
      } catch (error) {

      }
    } else {
      this.startIndex = this.categories[this.deck].length - 1
      this.card = this.categories[this.deck][this.startIndex]
      try {
        this.image = 'assets/img/' + this.card.img;
      } catch (error) {

      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSuccess(id) {
    console.log(id)
    // console.log('loaded audio ${id} with path of ${path}'); 
  };

  onError(err) {
    console.log(err)
    let alert = this.alertCtrl.create({
      title: 'Sorry',
      subTitle: "We don't have audio for that entry.",
      buttons: ['OK']
    });
    alert.present();
  };

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sorry',
      subTitle: 'There is no audio for this yet.',
      buttons: ['Dismiss']
    });
    alert.present();
  };

  stopAllAudio() {
    this.audio_playing.forEach(element => {
      element.pause()
    });
    this.audio_playing = [];
  }

  playAudio(track) {
    if (track !== undefined && track.filename !== undefined) {
      // get path. add config path if it's there.
      let path = track.filename
      if (this.audio_path && this.audio_path !== undefined) {
        path = this.audio_path + track.filename
      }
      // set ID and path to internal storage
      let internal_path = "assets/audio/" + track.filename
      let id = track.filename

      // if desktop or browser, run as HTML5 Audio
      if (this.plt.is('core') || this.plt.is('mobileweb')) {

        let audio = new Audio(path)
        audio.onerror = () => {
          this.audio_playing.pop()
          this.onError("The audio file wasn't found.")
        }
        this.audio_playing.push(audio)
        audio.onended = () => this.audio_playing.pop();
        audio.play()

        // If iOS or Android, download and store
      } else if (this.plt.is('android') || this.plt.is('ios')) {

        this.file.checkFile(this.file.dataDirectory, internal_path)
          .then(_ => {
            this.audio_playing.push(id)
            this.nativeAudio.preloadSimple(id, internal_path);
            this.nativeAudio.play(id, () => this.audio_playing.pop());
          }).catch(err => {
            var targetPath = this.file.dataDirectory + internal_path;
            var trustHosts = true;
            var options = {};
            this.fileTransfer.download(internal_path, targetPath, trustHosts, options)
          })
          .then((track) => {
            this.audio_playing.push(id)
            this.nativeAudio.preloadSimple(id, internal_path);
            this.nativeAudio.play(id, () => this.audio_playing.pop());
          }, (error) => { this.onError(error) });;

      } else {
        this.showAlert()
      }
    } else {
      this.onError("No audio for this file.")
    }
  }

  imageError() {
    this.displayImages = false;
  }

  toggleFav(entry) {
    this.mtdService.toggleBookmark(entry)
  }

  favourited(entry) {
    return this.mtdService.bookmarks.value.indexOf(entry) > -1
  }

}