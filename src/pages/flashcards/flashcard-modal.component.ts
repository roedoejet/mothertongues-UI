import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, Platform, AlertController } from 'ionic-angular';

import { Entry } from '../shared/entry.model'

import { MTDService } from '../../app/mtd.service'

import { File, FileEntry } from '@ionic-native/file';

import { Media, MediaObject } from '@ionic-native/media';

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
  constructor(public audio: Media, private alertCtrl: AlertController, public navCtrl: NavController, private navParams: NavParams, private mtdService: MTDService, 
    public viewCtrl: ViewController, private file: File, private plt: Platform, private transfer: FileTransfer) {

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

  mediaPlay(path) {
    let audio: MediaObject = this.audio.create(path);
    audio.onError.subscribe(() => {
      this.audio_playing.pop();
      this.onError("The audio file wasn't found.");
    })
    audio.onStatusUpdate.subscribe((status) => {
      if (status === 1) {
        this.audio_playing.push(audio)
        console.log('playing')
      }
      if (status === 4) {
        this.audio_playing.pop()
        console.log('stopped')
      }
    })
    audio.play()
  }

  htmlAudioPlay(path) {
    let audio = new Audio(path);
    audio.onerror = () => {
      this.audio_playing.pop();
      this.onError("The audio file wasn't found.");
    }
    audio.onended = () => {
      this.audio_playing.pop()
    }
    this.audio_playing.push(audio)
    audio.play()
  }

  playInternal(path) {
    this.file.resolveDirectoryUrl(this.file.dataDirectory).then((rootdir) => {
      this.file.getFile(rootdir, path, { create: false }).then((entryFile) => {
        this.mediaPlay(entryFile.toInternalURL())
      })
    })
  }

  downloadAndPlay(external_path, internal_path) {
    var targetPath = this.file.dataDirectory + internal_path;
    console.log('downloading to ' + targetPath)
    var trustHosts = true;
    var options = {};
    this.fileTransfer.download(external_path, targetPath, trustHosts, options).then((track: FileEntry) => {
      this.mediaPlay(track.toInternalURL())
    }, (error) => { this.onError(error) });
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
      let id = Date.now().toString()
      // if desktop or browser, run as HTML5 Audio
      if (this.plt.is('core') || this.plt.is('mobileweb')) {
        this.htmlAudioPlay(path)
        // If iOS or Android, download, store and play
      } else if (this.plt.is('android') || this.plt.is('ios')) {
        this.file.checkFile(this.file.dataDirectory, internal_path)
          .then((check) => {
            if (check) {
              this.playInternal(internal_path);
            } else {
              this.downloadAndPlay(path, internal_path)
            }
          }).catch(err => {
            this.downloadAndPlay(path, internal_path)
          })
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