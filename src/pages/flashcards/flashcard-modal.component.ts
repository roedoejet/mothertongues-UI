import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, AlertController } from 'ionic-angular';
import { BookmarkService } from '../../app/bookmark.service'
import { File } from '@ionic-native/file';
import { NativeAudio } from '@ionic-native/native-audio'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
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
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, private navParams: NavParams, private bookmarkService: BookmarkService, public viewCtrl: ViewController, private file: File, private plt: Platform, private transfer: FileTransfer, private nativeAudio: NativeAudio) {

    this.deck = navParams.get('deck');
    this.categories = bookmarkService.categories
    this.card = this.categories[this.deck][this.startIndex]
    this.front = true;
    try {
      this.image = 'assets/img/' + this.card.img[0];
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

  playAudioTrack(entry, track) {
    let audio_file = track.filename + ".mp3"
    let audio_url = track.filename + ".mp3"
    let id = entry.entryID
    let path = "https://roedoejet.github.io/wmrc-ayajuthem/resources/audio/words/" + audio_url
    let audio = new Audio(path)
    this.audio_playing.push(audio)
    audio.onended = () => this.audio_playing.pop();
    audio.play()
  }

  playAudioTrack1(entry, track) {
    track.audio_file = track.filename + ".mp3"
    track.audio_url = track.filename + ".mp3"
    if (this.plt.is('core') || this.plt.is('mobileweb')) {
      console.log('web ran')
      if (track !== undefined && track.audio_file !== undefined && track.audio_url !== undefined) {

        let id = entry.entryID
        let path = "//roedoejet.github.io/wmrc-ayajuthem/resources/audio/words/" + track.audio_url
        console.log(path)
        let audio = new Audio(path)
        audio.play()
        // this.nativeAudio.preloadSimple(id, path).then(this.onSuccess, (error)=>{console.log(error)});
        // this.nativeAudio.play(id).then(this.onSuccess, (error)=>{ this.onError(error) });
      } else {
        console.log('boo')
        this.showAlert()
      }
    } else if (this.plt.is('ios')) {

      let id = entry.entryID
      let path = "assets/audio/" + track.audio_file
      this.nativeAudio.preloadSimple(id, path).then(this.onSuccess, this.onError);
      this.nativeAudio.play(id).then(this.onSuccess, this.onError);

    } else if (this.plt.is('android')) {
      console.log('android ran')
      if (track != undefined) {
        let id = entry.entryID
        let track_url = "//roedoejet.github.io/wmrc-ayajuthem/resources/audio/words/" + track.audio_url
        let track_file = "assets/audio/" + track.audio_file

        this.file.checkFile(this.file.dataDirectory, track_file)
          .then(_ => {
            this.nativeAudio.preloadSimple(id, track_file);
            this.nativeAudio.play(id);
          }).catch(err => {
            var targetPath = this.file.dataDirectory + track_file;
            var trustHosts = true;
            var options = {};
            this.fileTransfer.download(track_url, targetPath, trustHosts, options)
          })
          .then((track) => {
            this.nativeAudio.preloadSimple(id, track_file);
            this.nativeAudio.play(id);
          }, (error) => { this.onError(error) });;
      }
    } else {
      this.showAlert()
    }
  }

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