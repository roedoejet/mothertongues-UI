webpackJsonp([0],{

/***/ 169:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 169;

/***/ }),

/***/ 216:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 216;

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(406));
__export(__webpack_require__(685));
__export(__webpack_require__(688));
__export(__webpack_require__(689));
__export(__webpack_require__(352));
__export(__webpack_require__(690));
__export(__webpack_require__(691));
__export(__webpack_require__(692));
__export(__webpack_require__(353));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(23);
const bookmark_service_1 = __webpack_require__(43);
const file_1 = __webpack_require__(142);
const native_audio_1 = __webpack_require__(140);
const file_transfer_1 = __webpack_require__(143);
let Flashcard = class Flashcard {
    constructor(alertCtrl, navCtrl, navParams, bookmarkService, viewCtrl, file, plt, transfer, nativeAudio) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.bookmarkService = bookmarkService;
        this.viewCtrl = viewCtrl;
        this.file = file;
        this.plt = plt;
        this.transfer = transfer;
        this.nativeAudio = nativeAudio;
        this.displayImages = true; //default show images, turns to false on 404
        this.startIndex = 0;
        this.audio_playing = [];
        this.fileTransfer = this.transfer.create();
        this.deck = navParams.get('deck');
        this.categories = bookmarkService.categories;
        this.card = this.categories[this.deck][this.startIndex];
        this.front = true;
        try {
            this.image = 'assets/img/' + this.card.img[0];
        }
        catch (error) {
            this.image = "";
        }
        this.style = navParams.get('style');
    }
    // Go to previous card in deck
    prev1() {
        if (this.startIndex - 1 > 0) {
            this.startIndex -= 1;
            this.card = this.categories[this.deck][this.startIndex];
            try {
                this.image = 'assets/img/' + this.card.img[0];
            }
            catch (error) {
            }
        }
        else {
            this.startIndex = 0;
            this.card = this.categories[this.deck][this.startIndex];
            try {
                this.image = 'assets/img/' + this.card.img[0];
            }
            catch (error) {
            }
        }
    }
    // Go to next card in deck
    next1() {
        if (this.startIndex + 1 < this.categories[this.deck].length) {
            this.startIndex += 1;
            this.card = this.categories[this.deck][this.startIndex];
            try {
                this.image = 'assets/img/' + this.card.img[0];
            }
            catch (error) {
            }
        }
        else {
            this.startIndex = this.categories[this.deck].length - 1;
            this.card = this.categories[this.deck][this.startIndex];
            try {
                this.image = 'assets/img/' + this.card.img[0];
            }
            catch (error) {
            }
        }
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    onSuccess(id) {
        console.log(id);
        // console.log('loaded audio ${id} with path of ${path}'); 
    }
    ;
    onError(err) {
        console.log(err);
        let alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: "We don't have audio for that entry.",
            buttons: ['OK']
        });
        alert.present();
    }
    ;
    showAlert() {
        let alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: 'There is no audio for this yet.',
            buttons: ['Dismiss']
        });
        alert.present();
    }
    ;
    stopAllAudio() {
        this.audio_playing.forEach(element => {
            element.pause();
        });
        this.audio_playing = [];
    }
    playAudioTrack(entry, track) {
        let audio_file = track.filename + ".mp3";
        let audio_url = track.filename + ".mp3";
        let id = entry.entryID;
        let path = "https://roedoejet.github.io/wmrc-ayajuthem/resources/audio/words/" + audio_url;
        let audio = new Audio(path);
        this.audio_playing.push(audio);
        audio.onended = () => this.audio_playing.pop();
        audio.play();
    }
    playAudioTrack1(entry, track) {
        track.audio_file = track.filename + ".mp3";
        track.audio_url = track.filename + ".mp3";
        if (this.plt.is('core') || this.plt.is('mobileweb')) {
            console.log('web ran');
            if (track !== undefined && track.audio_file !== undefined && track.audio_url !== undefined) {
                let id = entry.entryID;
                let path = "//roedoejet.github.io/wmrc-ayajuthem/resources/audio/words/" + track.audio_url;
                console.log(path);
                let audio = new Audio(path);
                audio.play();
                // this.nativeAudio.preloadSimple(id, path).then(this.onSuccess, (error)=>{console.log(error)});
                // this.nativeAudio.play(id).then(this.onSuccess, (error)=>{ this.onError(error) });
            }
            else {
                console.log('boo');
                this.showAlert();
            }
        }
        else if (this.plt.is('ios')) {
            let id = entry.entryID;
            let path = "assets/audio/" + track.audio_file;
            this.nativeAudio.preloadSimple(id, path).then(this.onSuccess, this.onError);
            this.nativeAudio.play(id).then(this.onSuccess, this.onError);
        }
        else if (this.plt.is('android')) {
            console.log('android ran');
            if (track != undefined) {
                let id = entry.entryID;
                let track_url = "//roedoejet.github.io/wmrc-ayajuthem/resources/audio/words/" + track.audio_url;
                let track_file = "assets/audio/" + track.audio_file;
                this.file.checkFile(this.file.dataDirectory, track_file)
                    .then(_ => {
                    this.nativeAudio.preloadSimple(id, track_file);
                    this.nativeAudio.play(id);
                }).catch(err => {
                    var targetPath = this.file.dataDirectory + track_file;
                    var trustHosts = true;
                    var options = {};
                    this.fileTransfer.download(track_url, targetPath, trustHosts, options);
                })
                    .then((track) => {
                    this.nativeAudio.preloadSimple(id, track_file);
                    this.nativeAudio.play(id);
                }, (error) => { this.onError(error); });
                ;
            }
        }
        else {
            this.showAlert();
        }
    }
    imageError() {
        this.displayImages = false;
    }
    toggleFav(entry) {
        this.bookmarkService.toggleBookmark(entry);
    }
    favourited(entry) {
        return this.bookmarkService.bookmarks.value.indexOf(entry) > -1;
    }
};
Flashcard = __decorate([
    core_1.Component({
        selector: 'flashcard-modal',template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/flashcards/flashcard-modal.component.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons left>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Flashcard Quiz\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content ng-switch="style" on-swipe-up="front = !front">\n\n  <ion-card>\n\n    <div *ngIf="displayImages">\n      <img (click)="playAudio(card)" [(src)]="image" onError="this.src=\'assets/img/default.png\'" *ngIf="card.img" />\n    </div>\n    <ion-card-content [ngSwitch]="style">\n      <div *ngSwitchCase="\'Active\'">\n        <ion-card-title *ngIf="!front">\n          {{card.word}}\n        </ion-card-title>\n        <ion-card-title class="definition" *ngIf="front">\n          {{card.definition}}\n        </ion-card-title>\n      </div>\n      <div *ngSwitchCase="\'Passive\'">\n        <ion-card-title *ngIf="!front">\n          {{card.definition}}\n        </ion-card-title>\n        <ion-card-title class="definition" *ngIf="front">\n          {{card.word}}\n        </ion-card-title>\n      </div>\n      <div *ngSwitchCase="\'Non-Written\'">\n        <ion-card-title *ngIf="!front">\n          {{card.word}} - {{card.definition}}\n        </ion-card-title>\n      </div>\n      <div *ngIf="card.optional && optional">\n        <p class="option" *ngFor="let option of checkedOptions; let i = index">\n          {{option}} - {{card.optional[option]}}\n        </p>\n      </div>\n    </ion-card-content>\n\n    <ion-row *ngIf="(card.audio | noNullObjectValues)?.length > 0">\n      <ion-card>\n        <ion-card-header>\n          Audio\n        </ion-card-header>\n\n        <ion-list>\n          <button ion-item *ngFor="let track of (card.audio | noNullObjectValues)" (click)="playAudioTrack(card, track)">\n            <ion-icon name="musical-notes" item-start></ion-icon>\n            Speaker: {{ track.speaker }}\n          </button>\n\n        </ion-list>\n      </ion-card>\n\n    </ion-row>\n\n    <ion-row *ngIf="(card.example_sentence | noNullValues)?.length > 0">\n      <ion-card>\n        <ion-card-header>\n          Sentences\n        </ion-card-header>\n\n        <ion-list *ngFor="let sentence of (card.example_sentence | noNullValues); let i = index">\n\n          <button ion-item *ngFor="let track of (card.example_sentence_audio[i] | noNullObjectValues)" (click)="playAudioTrack(card, track)">\n            <ion-icon name="musical-notes" item-start></ion-icon>\n            <h2>{{ sentence }}</h2>\n            <h4>{{ card.example_sentence_definition[i] }}</h4>\n            <h6>Speaker: {{ track.speaker }}</h6>\n          </button>\n\n        </ion-list>\n      </ion-card>\n\n    </ion-row>\n\n    <ion-row no-padding>\n      <ion-col>\n        <button ion-button clear small color="primary" icon-left (click)="toggleFav(card)">\n          <ion-icon *ngIf="favourited(card)" name="ios-bookmarks"></ion-icon>\n          <ion-icon *ngIf="!favourited(card)" name="ios-bookmarks-outline"></ion-icon>\n          Bookmark\n        </button>\n        <button ion-button clear small color="primary" icon-left (click)="front = !front">\n          <ion-icon name=\'refresh\'></ion-icon>\n          <span *ngIf="front">Flip to back</span><span *ngIf="!front">Flip to front</span>\n        </button>\n      </ion-col>\n\n    </ion-row>\n\n  </ion-card>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-buttons left class="bar-buttons bar-buttons-ios">\n      <button ion-button icon-only (click)="prev1()">\n        <ion-icon name="ios-arrow-back" class="scroll"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons end class="bar-buttons bar-buttons-ios">\n      <button ion-button icon-only (click)="next1()">\n        <ion-icon name="ios-arrow-forward" class="scroll"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/flashcards/flashcard-modal.component.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.AlertController, ionic_angular_1.NavController, ionic_angular_1.NavParams, bookmark_service_1.BookmarkService, ionic_angular_1.ViewController, file_1.File, ionic_angular_1.Platform, file_transfer_1.FileTransfer, native_audio_1.NativeAudio])
], Flashcard);
exports.Flashcard = Flashcard;
//# sourceMappingURL=flashcard-modal.component.js.map

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(23);
const file_1 = __webpack_require__(142);
const file_transfer_1 = __webpack_require__(143);
const storage_1 = __webpack_require__(78);
const native_audio_1 = __webpack_require__(140);
const bookmark_service_1 = __webpack_require__(43);
const mtd_service_1 = __webpack_require__(38);
let WordModal = class WordModal {
    constructor(navCtrl, navParams, viewCtrl, nativeAudio, alertCtrl, file, transfer, storage, plt, bookmarkService, mtdService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.nativeAudio = nativeAudio;
        this.alertCtrl = alertCtrl;
        this.file = file;
        this.transfer = transfer;
        this.storage = storage;
        this.plt = plt;
        this.bookmarkService = bookmarkService;
        this.mtdService = mtdService;
        this.displayImages = true; //default show images, turns to false on 404
        this.optional = false;
        this.objectKeys = Object.keys;
        this.default_sentence_i = 0;
        this.audio_playing = [];
        this.fileTransfer = this.transfer.create();
        // this.audio_path = this.mtdService.config_value.audio_path
        this.entry = navParams.get('entry');
        if (this.entry.optional) {
            this.optionalSelection = this.entry.optional.map(x => Object.keys(x))[0];
        }
        console.log(this.optionalSelection);
        this.checkedOptions = this.optionalSelection;
        console.log(this.checkedOptions);
        try {
            this.image = 'assets/img/' + this.entry.img;
        }
        catch (error) {
            console.log(error);
        }
    }
    showAlert() {
        let alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: 'There is no audio for this yet.',
            buttons: ['Dismiss']
        });
        alert.present();
    }
    ;
    showExpAlert() {
        let alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: 'There is no audio for this yet. Are you sure you are connected to the internet?',
            buttons: ['Dismiss']
        });
        alert.present();
    }
    ;
    stopAllAudio() {
        this.audio_playing.forEach(element => {
            try {
                element.pause();
            }
            catch (error) {
                this.nativeAudio.stop(element);
            }
        });
        this.audio_playing = [];
    }
    playAudio(track) {
        if (track !== undefined && track.filename !== undefined) {
            // get path. add config path if it's there.
            let path = track.filename;
            if (this.audio_path && this.audio_path !== undefined) {
                path = this.audio_path + track.filename;
            }
            // set ID and path to internal storage
            let internal_path = "assets/audio/" + track.filename;
            let id = track.filename;
            // if desktop or browser, run as HTML5 Audio
            if (this.plt.is('core') || this.plt.is('mobileweb')) {
                let audio = new Audio(path);
                audio.onerror = () => {
                    this.audio_playing.pop();
                    this.onError("The audio file wasn't found.");
                };
                this.audio_playing.push(audio);
                audio.onended = () => this.audio_playing.pop();
                audio.play();
                // If iOS or Android, download and store
            }
            else if (this.plt.is('android') || this.plt.is('ios')) {
                this.file.checkFile(this.file.dataDirectory, internal_path)
                    .then(_ => {
                    this.audio_playing.push(id);
                    this.nativeAudio.preloadSimple(id, internal_path);
                    this.nativeAudio.play(id, () => this.audio_playing.pop());
                }).catch(err => {
                    var targetPath = this.file.dataDirectory + internal_path;
                    var trustHosts = true;
                    var options = {};
                    this.fileTransfer.download(internal_path, targetPath, trustHosts, options);
                })
                    .then((track) => {
                    this.audio_playing.push(id);
                    this.nativeAudio.preloadSimple(id, internal_path);
                    this.nativeAudio.play(id, () => this.audio_playing.pop());
                }, (error) => { this.onError(error); });
                ;
            }
            else {
                this.showAlert();
            }
        }
        else {
            this.onError("No audio for this file.");
        }
    }
    onError(err) {
        console.log(err);
        let alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: err.toString(),
            buttons: ['OK']
        });
        alert.present();
    }
    ;
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
            options.inputs.push({ name: 'options', value: option, label: option, type: 'checkbox', checked: this.checkChecked(option) });
        }
        let alert = this.alertCtrl.create(options);
        alert.present();
    }
    checkChecked(option) {
        console.log(option);
        if (this.checkedOptions.indexOf(option) >= 0) {
            return true;
        }
        else {
            return false;
        }
    }
    imageError() {
        this.displayImages = false;
    }
    toggleFav(entry) {
        this.bookmarkService.toggleBookmark(entry);
    }
    favourited(entry) {
        return this.bookmarkService.bookmarks.value.indexOf(entry) > -1;
    }
};
WordModal = __decorate([
    core_1.Component({
        selector: 'word-modal',template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/shared/word-modal.component.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons left>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Word Info\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-card>\n    <div *ngIf="displayImages">\n      <img [(src)]="entry.img" onError="this.src=\'assets/img/default.png\'" *ngIf="entry.img" />\n    </div>\n    <ion-card-content>\n      <ion-card-title>\n        {{entry.word}}\n      </ion-card-title>\n      <p class="definition">\n        {{entry.definition}}\n      </p>\n      <div *ngIf="entry.optional && optional">\n        <div class="option" *ngFor="let optional_dict of entry.optional; let i = index">\n          <p *ngFor="let option of objectKeys(optional_dict)">\n            <span *ngIf="checkChecked(option)">{{ option }} - {{ entry.optional[i][option]}} </span>\n          </p>\n        </div>\n      </div>\n    </ion-card-content>\n\n    <ion-row *ngIf="(entry.audio | noNullObjectValues)?.length > 0">\n      <ion-card>\n        <ion-card-header>\n          Audio\n        </ion-card-header>\n\n        <ion-list>\n          <button ion-item *ngIf="audio_playing?.length > 0" (click)="stopAllAudio()">\n            Stop all audio\n            <ion-icon name="hand" item-start></ion-icon>\n          </button>\n          <button ion-item *ngFor="let track of (entry.audio | noNullObjectValues)" (click)="playAudio(track)">\n            <ion-icon name="musical-notes" item-start></ion-icon>\n            <span *ngIf="track.speaker">Speaker: {{ track.speaker }}</span>\n          </button>\n        </ion-list>\n      </ion-card>\n\n    </ion-row>\n\n    <ion-row *ngIf="(entry.example_sentence | noNullValues)?.length > 0">\n      <ion-card>\n        <ion-card-header>\n          Sentences\n        </ion-card-header>\n\n        <ion-list *ngFor="let sentence of (entry.example_sentence | noNullValues); let i = index">\n\n          <button ion-item *ngFor="let track of (entry.example_sentence_audio[i] | noNullObjectValues)"\n            (click)="playAudio(track)">\n            <ion-icon name="musical-notes" item-start></ion-icon>\n            <h2>{{ sentence }}</h2>\n            <h4>{{ entry.example_sentence_definition[i] }}</h4>\n            <h6 *ngIf="track.speaker">Speaker: {{ track.speaker }}</h6>\n          </button>\n\n        </ion-list>\n      </ion-card>\n\n    </ion-row>\n\n    <ion-row no-padding>\n      <ion-col>\n        <button ion-button clear small color="primary" icon-left (click)="toggleFav(entry)">\n          <ion-icon *ngIf="favourited(entry)" name="ios-bookmarks"></ion-icon>\n          <ion-icon *ngIf="!favourited(entry)" name="ios-bookmarks-outline"></ion-icon>\n          Bookmark\n        </button>\n      </ion-col>\n    </ion-row>\n\n  </ion-card>\n</ion-content>\n\n<ion-footer *ngIf="entry.optional">\n  <ion-toolbar>\n    <ion-item>\n      <ion-toggle checked="false" [(ngModel)]="optional"></ion-toggle>\n      <ion-label (click)="showOptions()">Show optional information</ion-label>\n    </ion-item>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/shared/word-modal.component.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        ionic_angular_1.ViewController,
        native_audio_1.NativeAudio,
        ionic_angular_1.AlertController,
        file_1.File,
        file_transfer_1.FileTransfer,
        storage_1.Storage,
        ionic_angular_1.Platform,
        bookmark_service_1.BookmarkService,
        mtd_service_1.MTDService])
], WordModal);
exports.WordModal = WordModal;
//# sourceMappingURL=word-modal.component.js.map

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_dynamic_1 = __webpack_require__(355);
const app_module_1 = __webpack_require__(359);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const platform_browser_1 = __webpack_require__(45);
const http_1 = __webpack_require__(170);
const ionic_angular_1 = __webpack_require__(23);
const native_audio_1 = __webpack_require__(140);
const storage_1 = __webpack_require__(78);
const status_bar_1 = __webpack_require__(259);
const file_1 = __webpack_require__(142);
const file_transfer_1 = __webpack_require__(143);
const splash_screen_1 = __webpack_require__(260);
const app_component_1 = __webpack_require__(405);
const pages_1 = __webpack_require__(261);
const mtd_service_1 = __webpack_require__(38);
const bookmark_service_1 = __webpack_require__(43);
const pipes_module_1 = __webpack_require__(693);
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.MyApp,
            pages_1.About,
            pages_1.Bookmarks,
            pages_1.Browse,
            pages_1.Flashcards,
            pages_1.Random,
            pages_1.Search,
            pages_1.EntryList,
            pages_1.WordModal,
            pages_1.Flashcard,
        ],
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpClientModule,
            ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp, {}, {
                links: []
            }),
            storage_1.IonicStorageModule.forRoot(),
            pipes_module_1.PipesModule
        ],
        bootstrap: [ionic_angular_1.IonicApp],
        entryComponents: [
            app_component_1.MyApp,
            pages_1.About,
            pages_1.Bookmarks,
            pages_1.Browse,
            pages_1.Flashcards,
            pages_1.Random,
            pages_1.Search,
            pages_1.EntryList,
            pages_1.WordModal,
            pages_1.Flashcard,
        ],
        providers: [{ provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler }, bookmark_service_1.BookmarkService, mtd_service_1.MTDService, file_1.File, file_transfer_1.FileTransfer, file_transfer_1.FileTransferObject, native_audio_1.NativeAudio, splash_screen_1.SplashScreen, status_bar_1.StatusBar]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const rxjs_1 = __webpack_require__(407);
const operators_1 = __webpack_require__(350);
const http_1 = __webpack_require__(170);
let MTDService = class MTDService {
    constructor(http) {
        this.http = http;
        this._dictionary_data$ = new rxjs_1.BehaviorSubject(window['dataDict']);
        this._config$ = new rxjs_1.BehaviorSubject(window['config']);
        this.remote_data$ = this.http.get('https://www.google.ca', { observe: 'response' });
        this.remote_config$ = this.http.get('https://www.google.ca', { observe: 'response' });
        if (true) {
            this._config$.next({ "L1": { "name": "<YourUpdatedLanguageName>", "lettersInLanguage": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] }, "L2": { "name": "English" } });
        }
        this.remote_config$.subscribe(x => {
            if (x.status === 200) {
                console.log('yay');
            }
            else {
                console.log('nay');
            }
        });
    }
    shuffle(array) {
        var tmp, current, top = array.length;
        if (top)
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        return array;
    }
    getRandom$(no_random) {
        return this._dictionary_data$.asObservable().pipe(operators_1.map((x) => this.shuffle(x).slice(0, no_random)));
    }
    get allAudioEntries$() {
        return this._dictionary_data$.asObservable().pipe(operators_1.map((arr) => arr.filter((x) => x.audio)));
    }
    get config$() {
        return this._config$.asObservable();
    }
    get dataDict$() {
        return this._dictionary_data$.asObservable();
    }
    get config_value() {
        return this._config$.getValue();
    }
    get dataDict_value() {
        return this._dictionary_data$.getValue();
    }
};
MTDService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" && _a || Object])
], MTDService);
exports.MTDService = MTDService;
var _a;
//# sourceMappingURL=mtd.service.js.map

/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(23);
const status_bar_1 = __webpack_require__(259);
const splash_screen_1 = __webpack_require__(260);
const storage_1 = __webpack_require__(78);
const pages_1 = __webpack_require__(261);
const bookmark_service_1 = __webpack_require__(43);
const mtd_service_1 = __webpack_require__(38);
let MyApp = class MyApp {
    constructor(platform, statusBar, splashScreen, storage, bookmarkService, mtdService) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.bookmarkService = bookmarkService;
        this.mtdService = mtdService;
        this.rootPage = pages_1.Search;
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Search', component: pages_1.Search },
            { title: 'Browse', component: pages_1.Browse },
            { title: 'Pick a Random Word!', component: pages_1.Random },
            { title: 'Bookmarks', component: pages_1.Bookmarks },
            { title: 'Flashcards', component: pages_1.Flashcards },
            { title: 'About', component: pages_1.About }
        ];
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.storage.ready().then(() => {
                this.mtdService.config$.subscribe((config) => {
                    let language_name = config.L1.name;
                    // let build_no = config.build // TODO: Make sure build numbers are being added to config
                    let id = language_name;
                    this.mtdService.dataDict$.subscribe((dataDict) => {
                        // retrieve favourited entries from storage and tag favourited entries
                        this.storage.get(id).then((val) => {
                            if (val) {
                                val = JSON.parse(val);
                                let favs = [];
                                for (let fav of val) {
                                    for (let entry of dataDict.filter(x => x['source'] == fav['source'])) {
                                        if (entry.entryID === fav.entryID) {
                                            entry['favourited'] = true;
                                            favs.push(entry);
                                            break;
                                        }
                                    }
                                }
                                this.bookmarkService.setBookmarks(favs);
                            }
                        });
                    });
                });
            });
        });
    }
    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
    isiPad() {
        return this.platform.is('iPad');
    }
};
__decorate([
    core_1.ViewChild(ionic_angular_1.Nav),
    __metadata("design:type", ionic_angular_1.Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    core_1.Component({template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/app/app.html"*/'<!--<ion-split-pane [when]="isiPad">-->\n  <ion-menu [content]="content">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>Menu</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content scrollbar-y-auto on-swipe-right="menuOpen">\n      <ion-list>\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n      </ion-list>\n    </ion-content>\n\n  </ion-menu>\n\n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n<!--</ion-split-pane>-->'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Platform, status_bar_1.StatusBar, splash_screen_1.SplashScreen, storage_1.Storage, bookmark_service_1.BookmarkService, mtd_service_1.MTDService])
], MyApp);
exports.MyApp = MyApp;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 406:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(23);
const mtd_service_1 = __webpack_require__(38);
let About = class About {
    constructor(navCtrl, mtdService) {
        this.navCtrl = navCtrl;
        this.mtdService = mtdService;
        this.language = this.mtdService.config_value.L1.name;
        console.log(this.language);
    }
};
About = __decorate([
    core_1.Component({
        selector: 'page-about',template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>About</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding scrollbar-y-auto>\n  <p>Welcome to the {{ language }} Mother Tongues Dictionary!\n  </p>\n</ion-content>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/about/about.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, mtd_service_1.MTDService])
], About);
exports.About = About;
//# sourceMappingURL=about.js.map

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const global_1 = __webpack_require__(686);
const BehaviorSubject_1 = __webpack_require__(154);
const storage_1 = __webpack_require__(78);
const mtd_service_1 = __webpack_require__(38);
const lodash_1 = __webpack_require__(351);
let BookmarkService = class BookmarkService {
    constructor(storage, mtdService) {
        this.storage = storage;
        this.mtdService = mtdService;
        this.bookmarks = new BehaviorSubject_1.BehaviorSubject([]);
        this.categories = {};
        this.config = this.mtdService.config_value;
        this.mtdService.allAudioEntries$.subscribe((allAudioEntries) => {
            if (allAudioEntries.length > 0 && allAudioEntries.length < (mtdService.dataDict_value.length * .5)) {
                this.categories["audio"] = {};
                this.categories["audio"] = allAudioEntries;
            }
        });
        this.mtdService.dataDict$.subscribe((allEntries) => {
            for (let key of global_1.MTDInfo.dataKeys) {
                this.categories[key] = allEntries.filter(x => x['source'] == key);
            }
            let semantic_categories = lodash_1.uniq(allEntries.map(entry => {
                if (entry.theme) {
                    entry.theme = entry.theme.toLowerCase();
                }
                return entry.theme;
            })).sort();
            for (let cat of semantic_categories) {
                if (cat) {
                    this.categories[cat] = allEntries.filter(entry => entry.theme === cat);
                }
            }
            console.log(this.categories);
        });
    }
    setBookmarks(val) {
        this.bookmarks.next(val);
        this.storage.set(this.config.L1.name, JSON.stringify(val));
        // this.storage.set(this.config.L1.name + this.config.build, JSON.stringify(val));
    }
    toggleBookmark(entry) {
        let i = this.bookmarks.value.indexOf(entry);
        let bookmarks;
        if (i > -1) {
            bookmarks = this.bookmarks.value;
            bookmarks.splice(i, 1);
        }
        else if (i < 0) {
            bookmarks = this.bookmarks.value.concat([entry]);
        }
        this.setBookmarks(bookmarks);
    }
};
BookmarkService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [storage_1.Storage, mtd_service_1.MTDService])
], BookmarkService);
exports.BookmarkService = BookmarkService;
//# sourceMappingURL=bookmark.service.js.map

/***/ }),

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(23);
const bookmark_service_1 = __webpack_require__(43);
let Bookmarks = class Bookmarks {
    constructor(navCtrl, bookmarkService) {
        this.navCtrl = navCtrl;
        this.bookmarkService = bookmarkService;
        this.edit = false;
        this.bookmarkService.bookmarks.subscribe((bookmarks) => { this.bookmarks = bookmarks; });
    }
    removeEntries(bookmarks) {
        this.bookmarkService.setBookmarks(bookmarks.filter(bookmark => !bookmark.checked));
        this.toggleEdit();
    }
    toggleEdit() {
        this.edit = !this.edit;
    }
};
Bookmarks = __decorate([
    core_1.Component({
        selector: 'page-bookmarks',template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/bookmarks/bookmarks.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bookmarks</ion-title>\n    <ion-buttons right>\n      <button ion-button (click)="edit = !edit">\n      <ion-icon name="trash" *ngIf="!edit"></ion-icon>\n      <span *ngIf="edit">cancel</span>\n    </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding scrollbar-y-auto>\n  <entry-list [entries]=\'bookmarks\' [parentEdit]="edit"></entry-list>\n  <div class=\'center\'>\n    <button ion-button color="danger" class="remove" *ngIf="edit" (click)="removeEntries(bookmarks)">Remove selected bookmarks</button>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/bookmarks/bookmarks.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, bookmark_service_1.BookmarkService])
], Bookmarks);
exports.Bookmarks = Bookmarks;
//# sourceMappingURL=bookmarks.js.map

/***/ }),

/***/ 686:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(351);
exports.MTDInfo = Object.freeze({
    dataKeys: lodash_1.uniq(window['dataDict'].map(x => x['source'])),
});
//# sourceMappingURL=global.js.map

/***/ }),

/***/ 688:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(23);
const bookmark_service_1 = __webpack_require__(43);
const mtd_service_1 = __webpack_require__(38);
let Browse = class Browse {
    constructor(navCtrl, bookmarkService, mtdService) {
        this.navCtrl = navCtrl;
        this.bookmarkService = bookmarkService;
        this.mtdService = mtdService;
        this.currentEntries = window['dataDict'];
        this.currentTen = window['get10'](window['dataDict'], 0);
        this.selectedCategory = "words";
        this.startIndex = 0;
        // currentBrowsingLetter: String = this.letters[this.currentBrowsingEntries[0].sorting_form[0]];
        this.letterSelectOptions = { title: "Select a Letter" };
        this.categorySelectOptions = { title: "Select a Category" };
        this.letters = this.mtdService.config_value.L1.lettersInLanguage;
        this.initializeEntries(bookmarkService);
    }
    initializeEntries(bookmarkService) {
        console.log(bookmarkService.categories);
        this.displayCategories = Object.keys(bookmarkService.categories);
        // Add letter index to first words of that letter in entries
        this.letterInit();
    }
    // Determine whether letter occurs word-initially
    letterInit() {
        let newLetters = [];
        for (let letter of this.letters) {
            let ind = this.letters.indexOf(letter);
            for (let entry of this.currentEntries) {
                if (entry.sorting_form[0] === ind) {
                    entry.firstWordIndex = ind;
                    newLetters.push(letter);
                    break;
                }
            }
        }
        this.displayLetters = newLetters;
    }
    // Scroll to previous 10 entries
    prev10() {
        if (this.startIndex - 10 > 0) {
            this.startIndex -= 10;
            this.currentTen = window['get10'](this.currentEntries, this.startIndex);
        }
        else {
            this.startIndex = 0;
            this.currentTen = window['get10'](this.currentEntries, this.startIndex);
        }
    }
    // Scroll to next 10 entries
    next10() {
        if (this.startIndex + 10 < this.currentEntries.length) {
            this.startIndex += 10;
            this.currentTen = window['get10'](this.currentEntries, this.startIndex);
        }
        else {
            this.startIndex = this.currentEntries.length - 10;
            this.currentTen = window['get10'](this.currentEntries, this.startIndex);
        }
    }
    // Scroll to letter
    // Still needed: change selected letter dynamically
    scrollTo(letter) {
        let letterIndex = this.letters.indexOf(letter);
        for (let entry of this.currentEntries) {
            if (entry.firstWordIndex === letterIndex) {
                this.startIndex = this.currentEntries.indexOf(entry);
                this.currentTen = window['get10'](this.currentEntries, this.startIndex);
                break;
            }
        }
    }
    selectCategory(category) {
        this.currentEntries = this.bookmarkService.categories[category];
        this.currentTen = window['get10'](this.currentEntries, 0);
        this.letterInit();
    }
};
Browse = __decorate([
    core_1.Component({
        selector: 'page-browse',template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/browse/browse.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Browse</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content scrollbar-y-auto>\n\n  <ion-list mode="ios">\n    <ion-item mode="ios">\n      <ion-label class="label-left" mode="ios">Select a Category</ion-label>\n      <ion-select mode="ios" [(ngModel)]="selectedCategory" (ngModelChange)="selectCategory(selectedCategory)" [selectOptions]="categorySelectOptions">\n        <ion-option *ngFor=\'let category of displayCategories\'>{{category}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item mode="ios">\n      <ion-label class="label-left" mode="ios">Select a Letter</ion-label>\n      <ion-select mode="ios" [(ngModel)]="selectedLetter" (ngModelChange)="scrollTo($event)" [selectOptions]="letterSelectOptions">\n        <ion-option *ngFor=\'let letter of displayLetters\'>{{letter}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n  <div class="entry-container">\n    <entry-list [entries]=\'currentTen\'></entry-list>\n  </div>\n \n\n</ion-content>\n\n <ion-footer>\n    <ion-toolbar>\n      <ion-buttons left class="bar-buttons bar-buttons-ios">\n        <button ion-button icon-only (click)="prev10()">\n        <ion-icon name="ios-arrow-back" class="scroll"></ion-icon>\n      </button>\n      </ion-buttons>\n      <ion-buttons end class="bar-buttons bar-buttons-ios">\n        <button ion-button icon-only (click)="next10()">\n        <ion-icon name="ios-arrow-forward" class="scroll"></ion-icon>\n      </button>\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-footer>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/browse/browse.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, bookmark_service_1.BookmarkService, mtd_service_1.MTDService])
], Browse);
exports.Browse = Browse;
//# sourceMappingURL=browse.js.map

/***/ }),

/***/ 689:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(23);
const flashcard_modal_component_1 = __webpack_require__(352);
const bookmark_service_1 = __webpack_require__(43);
let Flashcards = class Flashcards {
    constructor(navCtrl, modalCtrl, bookmarkService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.bookmarkService = bookmarkService;
        this.alertCtrl = alertCtrl;
        this.deckSelectOptions = { title: "Select a Deck" };
        this.decks = Object.keys(bookmarkService.categories);
        this.flashcardStyles = [
            { "title": "Passive", "info": "This is the easiest method. It involves seeing the {{name}} word and guessing English." },
            { "title": "Active", "info": "This method is designed to test your spelling of the {{ name }} word. You are provided with the English, and have to guess the {{ name } } word." },
            { "title": "Non-Written", "info": "This method is entirely without any written prompt. Try and guess the word in both English and {{ name }}!" }
        ];
    }
    startFlashcards() {
        if (this.deck === undefined) {
            let alert = this.alertCtrl.create({
                title: 'Oops!',
                subTitle: 'Did you select a deck?',
                buttons: ['Try again']
            });
            alert.present();
        }
        else if (this.selectedFlashcardStyle === undefined) {
            let alert = this.alertCtrl.create({
                title: 'Oops!',
                subTitle: 'Did you select a flashcard style?',
                buttons: ['Try again']
            });
            alert.present();
        }
        else {
            let flashcardModal = this.modalCtrl.create(flashcard_modal_component_1.Flashcard, { deck: this.deck, style: this.selectedFlashcardStyle });
            flashcardModal.present();
        }
    }
};
Flashcards = __decorate([
    core_1.Component({
        selector: 'page-flashcards',template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/flashcards/flashcards.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Flashcards</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding scrollbar-y-auto>\n\n  <ion-list class="deck-select">\n    <ion-list-header>\n      First, select a flashcard deck:\n    </ion-list-header>\n    <ion-item mode="ios">\n      <ion-label class="label-left" mode="ios">Select a Deck</ion-label>\n      <ion-select mode="ios" [(ngModel)]="deck" [selectOptions]="deckSelectOptions">\n        <ion-option *ngFor=\'let deck of decks\'>{{deck}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n\n  <ion-list radio-group [(ngModel)]="selectedFlashcardStyle">\n    <ion-list-header text-wrap>\n      Then, select a style of learning between the following options:\n    </ion-list-header>\n    <ion-item *ngFor="let style of flashcardStyles">\n      <ion-label>{{style.title}}</ion-label>\n      <p>{{style.info}}</p>\n      <ion-radio value="{{style.title}}"></ion-radio>\n    </ion-item>\n  </ion-list>\n\n  <div class="center"><button ion-button secondary (click)=\'startFlashcards()\'>Click here to start!</button></div>\n</ion-content>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/flashcards/flashcards.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.ModalController, bookmark_service_1.BookmarkService, ionic_angular_1.AlertController])
], Flashcards);
exports.Flashcards = Flashcards;
//# sourceMappingURL=flashcards.js.map

/***/ }),

/***/ 690:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(23);
const mtd_service_1 = __webpack_require__(38);
let Random = class Random {
    constructor(navCtrl, mtdService) {
        this.navCtrl = navCtrl;
        this.mtdService = mtdService;
    }
    getRandom() {
        this.entries$ = this.mtdService.getRandom$(10);
    }
};
Random = __decorate([
    core_1.Component({
        selector: 'page-random',template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/random/random.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Random</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding scrollbar-y-auto>\n  <div class="center"><button ion-button color="ternary" (click)=\'getRandom()\'>Click here for 10 Random words</button></div>\n  <div class="entry-container" *ngIf="entries$ | async as entries">\n    <entry-list [entries]="entries"></entry-list>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/random/random.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, mtd_service_1.MTDService])
], Random);
exports.Random = Random;
//# sourceMappingURL=random.js.map

/***/ }),

/***/ 691:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(23);
const mtd_service_1 = __webpack_require__(38);
let Search = class Search {
    constructor(navCtrl, mtdService) {
        this.navCtrl = navCtrl;
        this.mtdService = mtdService;
        this.searchQuery = '';
        this.entries = this.mtdService.dataDict_value;
    }
    getL2() {
        var results = [];
        var re = new RegExp(this.searchQuery, 'i');
        for (let entry of this.entries) {
            if (re.test(entry.definition)) {
                results.push(entry);
            }
        }
        let sorted_answers = results.sort(function (a, b) {
            return a["definition"].length - b["definition"].length;
        });
        return (sorted_answers.slice(0, 9));
    }
    ;
    // Get English and target results
    getResults() {
        if (this.searchQuery.length > 1) {
            let english = this.getL2();
            let target = window["searchL1"](this.searchQuery);
            let matches = [];
            let partMatches = [];
            let maybeMatches = [];
            var populateEng = function () {
                for (let result of english) {
                    var entry = result;
                    entry.type = "L2";
                    matches.push(entry);
                }
            };
            var populateTarget = function () {
                for (let result of target) {
                    var entry = result[1];
                    if (entry.distance === 0) {
                        entry.type = "L1";
                        matches.push(entry);
                    }
                    if (entry.distance <= 1 && entry.distance > 0) {
                        entry.type = "L1";
                        partMatches.push(entry);
                    }
                    if (entry.distance <= 2 && entry.distance > 1) {
                        entry.type = "L1";
                        maybeMatches.push(entry);
                    }
                }
            };
            populateEng();
            populateTarget();
            this.matches = matches;
            this.partMatches = partMatches;
            this.maybeMatches = maybeMatches;
        }
    }
    ;
};
Search = __decorate([
    core_1.Component({
        selector: 'page-search',template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/search/search.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Search</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding scrollbar-y-auto>\n  <ion-searchbar (ionInput)="getResults()" [(ngModel)]="searchQuery" autocapitalize="none"></ion-searchbar>\n  <div *ngIf="searchQuery?.length > 1">\n    <div class="result-container" *ngIf="matches?.length > 0">\n      <h4>Matches</h4>\n      <entry-list [entries]="matches" [searchterm]="searchQuery"></entry-list>\n    </div>\n    <div class="result-container" *ngIf="partMatches?.length > 0">\n      <h4>Partial Matches</h4>\n      <entry-list [entries]="partMatches" [searchterm]="searchQuery"></entry-list>\n    </div>\n    <div class="result-container" *ngIf="maybeMatches?.length > 0">\n      <h4>Maybe you meant this?</h4>\n      <entry-list [entries]="maybeMatches" [searchterm]="searchQuery"></entry-list>\n    </div>\n    <div class="result-container" *ngIf="matches?.length === 0 && partMatches?.length === 0 && maybeMatches?.length === 0">\n      <h6>Sorry, we couldn\'t find any words matching \'{{ searchQuery }}\'. Please try something else.</h6>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/search/search.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, mtd_service_1.MTDService])
], Search);
exports.Search = Search;
//# sourceMappingURL=search.js.map

/***/ }),

/***/ 692:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(23);
const word_modal_component_1 = __webpack_require__(353);
let EntryList = class EntryList {
    constructor(navCtrl, viewCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.edit = false;
        this.pageName = viewCtrl.name;
    }
    showModal(clicked_entry) {
        let wordModal = this.modalCtrl.create(word_modal_component_1.WordModal, { entry: clicked_entry });
        wordModal.present();
    }
    highlight(text) {
        if (!this.searchterm) {
            return text;
        }
        return text.replace(new RegExp(this.searchterm, 'gi'), '<span class="langMatched">$&</span>');
    }
    ngOnChanges() {
        this.edit = this.parentEdit;
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EntryList.prototype, "parentEdit", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EntryList.prototype, "entries", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EntryList.prototype, "searchterm", void 0);
EntryList = __decorate([
    core_1.Component({
        selector: 'entry-list',template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/shared/entry-list.component.html"*/'<div id="browseEntries" class="browseElements">\n  <ion-list>\n    <div>\n      <ion-item class="matchContainer" (click)="showModal(entry)" *ngFor="let entry of entries" text-wrap>\n        <ion-checkbox color="danger" checked="false" *ngIf="edit" [(ngModel)]="entry.checked"></ion-checkbox>\n        <ion-label>\n          <div class="matchLeftContainer">\n            <span class="response matchLeftDiv" [ngClass]="{\'langMatched\': entry.type === \'L1\' && pageName === \'Search\'}">{{entry.word}}</span>\n          </div>\n          <div class="matchRightContainer">\n            <span class="response matchRightDiv" [innerHTML]="highlight(entry.definition)"></span>\n          </div>\n        </ion-label>\n      </ion-item>\n    </div>\n  </ion-list>\n</div>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/shared/entry-list.component.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.ViewController, ionic_angular_1.ModalController])
], EntryList);
exports.EntryList = EntryList;
//# sourceMappingURL=entry-list.component.js.map

/***/ }),

/***/ 693:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
const no_null_values_1 = __webpack_require__(694);
let PipesModule = class PipesModule {
};
PipesModule = __decorate([
    core_1.NgModule({
        declarations: [no_null_values_1.NoNullObjectValuesPipe, no_null_values_1.NoNullValuesPipe],
        imports: [],
        exports: [no_null_values_1.NoNullObjectValuesPipe, no_null_values_1.NoNullValuesPipe]
    })
], PipesModule);
exports.PipesModule = PipesModule;
//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 694:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(1);
/**
 * Generated class for the NoNullValuesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
let NoNullValuesPipe = class NoNullValuesPipe {
    /**
     * Removes empty strings from array
     */
    transform(value, ...args) {
        if (value) {
            return value.filter(x => x !== null && x !== '');
        }
    }
};
NoNullValuesPipe = __decorate([
    core_1.Pipe({
        name: 'noNullValues',
    })
], NoNullValuesPipe);
exports.NoNullValuesPipe = NoNullValuesPipe;
let NoNullObjectValuesPipe = class NoNullObjectValuesPipe {
    /**
     * Removes empty objects from array
     */
    transform(value, ...args) {
        if (value) {
            return value.filter(x => {
                let not_empty = true;
                Object.keys(x).forEach(k => {
                    if (x[k] === null) {
                        not_empty = false;
                        return not_empty;
                    }
                });
                return not_empty;
            });
        }
    }
};
NoNullObjectValuesPipe = __decorate([
    core_1.Pipe({
        name: 'noNullObjectValues',
    })
], NoNullObjectValuesPipe);
exports.NoNullObjectValuesPipe = NoNullObjectValuesPipe;
//# sourceMappingURL=no-null-values.js.map

/***/ })

},[354]);
//# sourceMappingURL=main.js.map