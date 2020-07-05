import { Component } from "@angular/core";

import {
  NavController,
  NavParams,
  ViewController,
  AlertController,
  Platform,
  ToastController
} from "ionic-angular";

import { File, FileEntry } from "@ionic-native/file";

import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";

import { Clipboard } from "@ionic-native/clipboard";

import { Storage } from "@ionic/storage";

import { Media, MediaObject } from "@ionic-native/media";

import { Entry } from "./entry.model";

import { MTDService } from "../../app/mtd.service";

import { MTDInfo } from "../../app/global";

@Component({
  selector: "word-modal",
  templateUrl: "word-modal.component.html"
})
export class WordModal {
  checkedOptions: string[];
  displayImages: boolean = true; //default show images, turns to false on 404
  entry: Entry;
  optional: boolean = false;
  optionalSelection: string[];
  objectKeys = Object.keys;
  image: string;
  default_sentence_i: number = 0;
  audio_playing = [];
  audio_path: string = MTDInfo.config["audio_path"];
  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    private navParams: NavParams,
    private clipboard: Clipboard,
    public viewCtrl: ViewController,
    public audio: Media,
    public alertCtrl: AlertController,
    private file: File,
    private transfer: FileTransfer,
    public storage: Storage,
    public plt: Platform,
    public mtdService: MTDService
  ) {
    this.entry = this.navParams.get("entry");
    if (this.entry.optional) {
      this.optionalSelection = this.entry.optional.map(x => Object.keys(x))[0];
    }
    this.checkedOptions = this.optionalSelection;
    try {
      this.image = "assets/img/" + this.entry.img;
    } catch (error) {}
  }

  fileTransfer: FileTransferObject = this.transfer.create();

  checkOptionTruth(options: object[]) {
    if (options && options.length > 0) {
      return options.some(option =>
        Object.keys(option).some(key => option[key])
      );
    } else {
      return false;
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: "Sorry",
      subTitle: "We couldn't find the audio for this.",
      buttons: ["Dismiss"]
    });
    alert.present();
  }

  showExpAlert() {
    let alert = this.alertCtrl.create({
      title: "Sorry",
      subTitle:
        "We couldn't find the audio for this. Are you sure you are connected to the internet?",
      buttons: ["Dismiss"]
    });
    alert.present();
  }

  stopAllAudio() {
    this.audio_playing.forEach(element => {
      try {
        element.stop();
      } catch (error) {
        element.pause();
      }
    });
    this.audio_playing = [];
  }

  copyToast(clipboard) {
    let toast = this.toastCtrl.create({
      message: `Word "${clipboard}" was copied to your clipboard.`,
      duration: 2000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      // console.log("Dismissed toast");
    });

    toast.present();
  }

  copyToClipboard(word) {
    if (this.plt.is("core") || this.plt.is("mobileweb")) {
      const selBox = document.createElement("textarea");
      selBox.style.position = "fixed";
      selBox.style.left = "0";
      selBox.style.top = "0";
      selBox.style.opacity = "0";
      selBox.value = word;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand("copy");
      document.body.removeChild(selBox);
      this.copyToast(word);
    } else {
      this.clipboard.copy(word).then(
        success => {
          this.copyToast(word);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  mediaPlay(path) {
    let audio: MediaObject = this.audio.create(path);
    audio.onError.subscribe(err => {
      console.log(err);
      this.audio_playing.pop();
    });
    audio.onStatusUpdate.subscribe(status => {
      if (status === 1 || status === 2) {
        this.audio_playing.push(audio);
      }
      if (status === 4) {
        this.audio_playing.pop();
      }
    });
    audio.play();
  }

  htmlAudioPlay(path) {
    let audio = new Audio(path);
    audio.onerror = err => {
      console.log(err);
      this.audio_playing.pop();
    };
    audio.onended = () => {
      this.audio_playing.pop();
    };
    this.audio_playing.push(audio);
    audio.play();
  }

  playInternal(path) {
    this.file.resolveDirectoryUrl(this.file.dataDirectory).then(rootdir => {
      this.file.getFile(rootdir, path, { create: false }).then(entryFile => {
        this.mediaPlay(entryFile.toInternalURL());
      });
    });
  }

  getBaseName(path) {
    return path.split(/[\\/]/).pop();
  }

  downloadAndPlay(external_path, internal_path) {
    var targetPath = this.file.dataDirectory + internal_path;
    var trustHosts = true;
    var options = {};
    this.fileTransfer
      .download(external_path, targetPath, trustHosts, options)
      .then(
        (track: FileEntry) => {
          this.mediaPlay(track.toInternalURL());
        },
        error => {
          this.onError("The audio file could not be downloaded.");
        }
      );
  }

  playAudio(track) {
    this.stopAllAudio();
    if (track !== undefined && track.filename !== undefined) {
      // get path. add config path if it's there.
      let path = track.filename;
      if (this.audio_path && this.audio_path !== undefined) {
        path = this.audio_path + track.filename;
      }
      // set ID and path to internal storage
      let internal_path = "assets/audio/" + this.getBaseName(track.filename);
      // if desktop or browser, run as HTML5 Audio
      if (this.plt.is("core") || this.plt.is("mobileweb")) {
        this.htmlAudioPlay(path);
        // If iOS or Android, download, store and play
      } else if (this.plt.is("android") || this.plt.is("ios")) {
        this.file
          .checkFile(this.file.dataDirectory, internal_path)
          .then(check => {
            if (check) {
              this.playInternal(internal_path);
            } else {
              this.downloadAndPlay(path, internal_path);
            }
          })
          .catch(err => {
            this.downloadAndPlay(path, internal_path);
          });
      } else {
        this.showAlert();
      }
    } else {
      this.onError("There is no audio for this file.");
    }
  }

  onError(err = "Something went wrong with the audio for this file.") {
    let alert = this.alertCtrl.create({
      title: "Sorry",
      subTitle: err,
      buttons: ["OK"]
    });
    alert.present();
  }

  dismiss() {
    this.stopAllAudio();
    this.viewCtrl.dismiss();
  }

  showOptions() {
    // Object with options used to create the alert
    let options = {
      title: "Optional fields",
      message: "Choose which optional fields to display",
      inputs: [],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {}
        },
        {
          text: "Ok",
          handler: data => {
            let checkedOptions = [];
            for (let item of data) {
              for (let key of this.optionalSelection) {
                if (key === item) {
                  checkedOptions.push(key);
                }
              }
            }
            this.checkedOptions = checkedOptions;
          }
        }
      ]
    };

    // Now we add the radio buttons
    for (let option of this.optionalSelection) {
      options.inputs.push({
        name: "options",
        value: option,
        label: option,
        type: "checkbox",
        checked: this.checkChecked(option)
      });
    }
    let alert = this.alertCtrl.create(options);
    alert.present();
  }

  checkChecked(option) {
    if (this.checkedOptions.indexOf(option) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  hasKey(obj: object, key: string) {
    return obj.hasOwnProperty(key);
  }

  imageError() {
    this.displayImages = false;
  }

  toggleFav(entry) {
    this.mtdService.toggleBookmark(entry);
  }

  favourited(entry) {
    return this.mtdService.bookmarks.value.indexOf(entry) > -1;
  }
}
