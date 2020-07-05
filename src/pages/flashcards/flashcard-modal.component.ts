import { Component } from "@angular/core";

import {
  NavController,
  NavParams,
  ViewController,
  Platform,
  AlertController,
  ToastController
} from "ionic-angular";

import { Entry } from "../shared/entry.model";

import { MTDService } from "../../app/mtd.service";

import { File, FileEntry } from "@ionic-native/file";

import { Media, MediaObject } from "@ionic-native/media";

import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";

import { Clipboard } from "@ionic-native/clipboard";

import { MTDInfo } from "../../app/global";

import { FlashcardStyle } from "./flashcards";

@Component({
  selector: "flashcard-modal",
  templateUrl: "flashcard-modal.component.html"
})
export class Flashcard {
  displayImages: boolean = true; //default show images, turns to false on 404
  card: Entry;
  categories: Object;
  deckTitle: string;
  deck: Entry[];
  front: Boolean;
  image: string;
  startIndex: number = 0;
  style: string;
  audio_playing = [];
  audio_path: string = MTDInfo.config["audio_path"];
  constructor(
    private clipboard: Clipboard,
    private toastCtrl: ToastController,
    public audio: Media,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private navParams: NavParams,
    private mtdService: MTDService,
    public viewCtrl: ViewController,
    private file: File,
    private plt: Platform,
    private transfer: FileTransfer
  ) {
    this.deckTitle = navParams.get("deck");
    this.categories = mtdService.categories;

    this.front = true;
    try {
      this.image = "assets/img/" + this.card.img;
    } catch (error) {
      this.image = "";
    }

    this.style = navParams.get("style");
    if (this.style === "audio") {
      this.deck = this.categories[this.deckTitle].filter(
        x => x.audio.length > 0
      );
    } else {
      this.deck = this.categories[this.deckTitle];
    }
    this.card = this.deck[this.startIndex];
  }

  fileTransfer: FileTransferObject = this.transfer.create();

  // Go to previous card in deck
  prev1() {
    if (this.startIndex - 1 > 0) {
      this.startIndex -= 1;
      this.card = this.deck[this.startIndex];
      try {
        this.image = "assets/img/" + this.card.img;
      } catch (error) {}
    } else {
      this.startIndex = 0;
      this.card = this.deck[this.startIndex];
      try {
        this.image = "assets/img/" + this.card.img;
      } catch (error) {}
    }
  }

  // Go to next card in deck
  next1() {
    if (this.startIndex + 1 < this.deck.length) {
      this.startIndex += 1;
      this.card = this.deck[this.startIndex];
      try {
        this.image = "assets/img/" + this.card.img;
      } catch (error) {}
    } else {
      this.startIndex = this.deck.length - 1;
      this.card = this.deck[this.startIndex];
      try {
        this.image = "assets/img/" + this.card.img;
      } catch (error) {}
    }
  }

  dismiss() {
    this.stopAllAudio();
    this.viewCtrl.dismiss();
  }

  onSuccess(id) {}

  onError(err = "Something went wrong with the audio for this file.") {
    let alert = this.alertCtrl.create({
      title: "Sorry",
      subTitle: err,
      buttons: ["OK"]
    });
    alert.present();
  }

  showAlert() {
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
      element.pause();
    });
    this.audio_playing = [];
  }

  mediaPlay(path) {
    let audio: MediaObject = this.audio.create(path);
    audio.onError.subscribe(() => {
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
    audio.onerror = () => {
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
      let id = Date.now().toString();
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
