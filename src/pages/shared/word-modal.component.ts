import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, AlertController, Platform, ItemSliding } from 'ionic-angular';

import { File } from '@ionic-native/file';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { Storage } from '@ionic/storage';

import { NativeAudio } from '@ionic-native/native-audio'

import { Entry } from './entry.model'

import { MTDService } from '../../app/mtd.service'

import { MTDInfo } from '../../app/global'

@Component({
  selector: 'word-modal',
  templateUrl: 'word-modal.component.html'
})


export class WordModal {
  checkedOptions: string[];
  displayImages: boolean = true; //default show images, turns to false on 404
  entry: Entry
  optional: boolean = false;
  optionalSelection: string[];
  objectKeys = Object.keys;
  image: string;
  default_sentence_i: number = 0;
  audio_playing = [];
  audio_path: string = MTDInfo.config['audio_path']
  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    public viewCtrl: ViewController,
    public nativeAudio: NativeAudio,
    public alertCtrl: AlertController,
    private file: File,
    private transfer: FileTransfer,
    public storage: Storage,
    public plt: Platform,
    public mtdService: MTDService) {
    this.entry = navParams.get('entry');
    if (this.entry.optional) {
      this.optionalSelection = this.entry.optional.map(x => Object.keys(x))[0]
    }
    console.log(this.optionalSelection)
    this.checkedOptions = this.optionalSelection
    console.log(this.checkedOptions)
    try {
      this.image = 'assets/img/' + this.entry.img;
    } catch (error) {
      console.log(error)
    }


  }

  fileTransfer: FileTransferObject = this.transfer.create();


  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sorry',
      subTitle: 'There is no audio for this yet.',
      buttons: ['Dismiss']
    });
    alert.present();
  };

  showExpAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sorry',
      subTitle: 'There is no audio for this yet. Are you sure you are connected to the internet?',
      buttons: ['Dismiss']
    });
    alert.present();
  };

  stopAllAudio() {
    this.audio_playing.forEach(element => {
      try {
        element.pause()
      } catch (error) {
        this.nativeAudio.stop(element)
      }
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

  onError(err) {
    console.log(err)
    let alert = this.alertCtrl.create({
      title: 'Sorry',
      subTitle: err.toString(),
      buttons: ['OK']
    });
    alert.present();
  };

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showOptions() {

    // Object with options used to create the alert
    let options = {
      title: 'Optional fields',
      message: 'Choose which optional fields to display',
      inputs: [],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            let checkedOptions = []
            for (let item of data) {
              for (let key of this.optionalSelection) {
                if (key === item) {
                  checkedOptions.push(key)
                }
              }
            }
            this.checkedOptions = checkedOptions
          }
        }
      ]
    };


    // Now we add the radio buttons
    for (let option of this.optionalSelection) {
      options.inputs.push({ name: 'options', value: option, label: option, type: 'checkbox', checked: this.checkChecked(option) });
    }
    let alert = this.alertCtrl.create(options);
    alert.present();

  }

  checkChecked(option) {
    console.log(option)
    if (this.checkedOptions.indexOf(option) >= 0) {
      return true;
    } else {
      return false;
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
