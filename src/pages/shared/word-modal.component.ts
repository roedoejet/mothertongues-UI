import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, AlertController, Platform, ItemSliding } from 'ionic-angular';

import { File } from '@ionic-native/file';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { Storage } from '@ionic/storage';

import { NativeAudio } from '@ionic-native/native-audio'

import { Entry } from './entry.model'

import { MTDService } from '../../app/mtd.service'

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
      this.optionalSelection = this.entry.optional.map(x=> Object.keys(x))[0]
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
      element.pause()
    });
    this.audio_playing = [];
  }

  playAudioTrack(entry, track) {
    let audio_url = track.filename + ".mp3"
    let path = "https://roedoejet.github.io/wmrc-ayajuthem/resources/audio/words/" + audio_url
    let audio = new Audio(path)
    this.audio_playing.push(audio)
    audio.onended = () => this.audio_playing.pop();
    audio.play()
  }

  // on hold while other audio figured out
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
        console.log('checking ' + track_file)
        this.file.checkFile(this.file.dataDirectory, track_file)
          .then((track) => {
            console.log('trying to play')
            this.nativeAudio.preloadSimple(id, track_file);
            this.nativeAudio.play(id);
          }).catch(err => {
            console.log('couldnot play')
            var targetPath = this.file.dataDirectory + track_file;
            var trustHosts = true;
            var options = {};
            console.log('dowloading from ' + track_url)
            console.log(targetPath)
            this.fileTransfer.download(track_url, targetPath, trustHosts, options)
              .then((track) => {
                console.log('trying to play')
                this.nativeAudio.preloadSimple(id, track_file);
                this.nativeAudio.play(id);
              }, (error) => { this.onError(error) });
          })
      }
    } else {
      this.showAlert()
    }
  }


  playAudio(entry) {

    // this.stopAllAudio()
    // Create Media object from src
    // if (ionic.Platform.platform() == 'macintel') {
    if (this.plt.is('core') || this.plt.is('mobileweb')) {
      if (entry !== undefined && entry.audio_file !== undefined && entry.audio_url !== undefined) {

        let id = entry.entryID
        let path = "http://mobile.firstvoices.com/FirstVoices/" + entry.audio_url
        this.nativeAudio.preloadSimple(id, path).then(this.onSuccess, this.onError);
        this.nativeAudio.play(id).then(this.onSuccess, this.onError);

        // var audio = new Audio(srcURL)
        // audio_playing.push(audio)
        // setTimeout(function () {
        //     audio.play();
        // }, 50);
      } else {
        this.showAlert()
      }
    } else if (this.plt.is('ios')) {

      let id = entry.entryID
      let path = "assets/audio/" + entry.audio_file
      this.nativeAudio.preloadSimple(id, path).then(this.onSuccess, this.onError);
      this.nativeAudio.play(id).then(this.onSuccess, this.onError);
      // srcFN = src.replace(/\//g, '')
      // srcURL = "audio/" + srcFN
      // var audio = new Audio(srcURL);

      // Play audio
      // audio_playing.push(audio)
      // setTimeout(function () {
      //     audio.play();
      // }, 50);

    } else if (this.plt.is('android')) {
      if (entry != undefined) {
        let id = entry.entryID
        let entry_url = "http://mobile.firstvoices.com/FirstVoices/" + entry.audio_url
        let entry_file = "assets/audio/" + entry.audio_file[0]

        this.file.checkFile(this.file.dataDirectory, entry_file)
          .then(_ => {
            this.nativeAudio.preloadSimple(id, entry_file);
            this.nativeAudio.play(id);
          }).catch(err => {
            var targetPath = this.file.dataDirectory + entry_file;
            var trustHosts = true;
            var options = {};
            this.fileTransfer.download(entry_url, targetPath, trustHosts, options)
          })
          .then((entry) => {
            this.nativeAudio.preloadSimple(id, entry_file);
            this.nativeAudio.play(id);
          }, (error) => { console.log(error) });;
      }
    } else {
      this.showAlert()
    }
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
