webpackJsonp([0],{

/***/ 118:
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
webpackEmptyAsyncContext.id = 118;

/***/ }),

/***/ 159:
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
webpackEmptyAsyncContext.id = 159;

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__about_about__ = __webpack_require__(284);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__about_about__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bookmarks_bookmarks__ = __webpack_require__(289);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__bookmarks_bookmarks__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__browse_browse__ = __webpack_require__(291);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__browse_browse__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__flashcards_flashcards__ = __webpack_require__(292);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__flashcards_flashcards__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__flashcards_flashcard_modal_component__ = __webpack_require__(203);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__flashcards_flashcard_modal_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__random_random__ = __webpack_require__(293);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_5__random_random__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_search__ = __webpack_require__(294);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_6__search_search__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_entry_model__ = __webpack_require__(295);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_entry_list_component__ = __webpack_require__(296);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_8__shared_entry_list_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_word_modal_component__ = __webpack_require__(205);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_9__shared_word_modal_component__["a"]; });










//# sourceMappingURL=index.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Flashcard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_mtd_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_media__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_clipboard__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Flashcard = /** @class */ (function () {
    function Flashcard(clipboard, toastCtrl, audio, alertCtrl, navCtrl, navParams, mtdService, viewCtrl, file, plt, transfer) {
        this.clipboard = clipboard;
        this.toastCtrl = toastCtrl;
        this.audio = audio;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mtdService = mtdService;
        this.viewCtrl = viewCtrl;
        this.file = file;
        this.plt = plt;
        this.transfer = transfer;
        this.displayImages = true; //default show images, turns to false on 404
        this.startIndex = 0;
        this.audio_playing = [];
        this.audio_path = __WEBPACK_IMPORTED_MODULE_7__app_global__["a" /* MTDInfo */].config["audio_path"];
        this.fileTransfer = this.transfer.create();
        this.deckTitle = navParams.get("deck");
        this.categories = mtdService.categories;
        this.front = true;
        try {
            this.image = "assets/img/" + this.card.img;
        }
        catch (error) {
            this.image = "";
        }
        this.style = navParams.get("style");
        if (this.style === "audio") {
            this.deck = this.categories[this.deckTitle].filter(function (x) { return x.audio.length > 0; });
        }
        else {
            this.deck = this.categories[this.deckTitle];
        }
        this.card = this.deck[this.startIndex];
    }
    // Go to previous card in deck
    Flashcard.prototype.prev1 = function () {
        if (this.startIndex - 1 > 0) {
            this.startIndex -= 1;
            this.card = this.deck[this.startIndex];
            try {
                this.image = "assets/img/" + this.card.img;
            }
            catch (error) { }
        }
        else {
            this.startIndex = 0;
            this.card = this.deck[this.startIndex];
            try {
                this.image = "assets/img/" + this.card.img;
            }
            catch (error) { }
        }
    };
    // Go to next card in deck
    Flashcard.prototype.next1 = function () {
        if (this.startIndex + 1 < this.deck.length) {
            this.startIndex += 1;
            this.card = this.deck[this.startIndex];
            try {
                this.image = "assets/img/" + this.card.img;
            }
            catch (error) { }
        }
        else {
            this.startIndex = this.deck.length - 1;
            this.card = this.deck[this.startIndex];
            try {
                this.image = "assets/img/" + this.card.img;
            }
            catch (error) { }
        }
    };
    Flashcard.prototype.dismiss = function () {
        this.stopAllAudio();
        this.viewCtrl.dismiss();
    };
    Flashcard.prototype.onSuccess = function (id) { };
    Flashcard.prototype.onError = function (err) {
        if (err === void 0) { err = "Something went wrong with the audio for this file."; }
        var alert = this.alertCtrl.create({
            title: "Sorry",
            subTitle: err,
            buttons: ["OK"]
        });
        alert.present();
    };
    Flashcard.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: "Sorry",
            subTitle: "We couldn't find the audio for this. Are you sure you are connected to the internet?",
            buttons: ["Dismiss"]
        });
        alert.present();
    };
    Flashcard.prototype.stopAllAudio = function () {
        this.audio_playing.forEach(function (element) {
            element.pause();
        });
        this.audio_playing = [];
    };
    Flashcard.prototype.mediaPlay = function (path) {
        var _this = this;
        var audio = this.audio.create(path);
        audio.onError.subscribe(function () {
            _this.audio_playing.pop();
        });
        audio.onStatusUpdate.subscribe(function (status) {
            if (status === 1 || status === 2) {
                _this.audio_playing.push(audio);
            }
            if (status === 4) {
                _this.audio_playing.pop();
            }
        });
        audio.play();
    };
    Flashcard.prototype.htmlAudioPlay = function (path) {
        var _this = this;
        var audio = new Audio(path);
        audio.onerror = function () {
            _this.audio_playing.pop();
        };
        audio.onended = function () {
            _this.audio_playing.pop();
        };
        this.audio_playing.push(audio);
        audio.play();
    };
    Flashcard.prototype.playInternal = function (path) {
        var _this = this;
        this.file.resolveDirectoryUrl(this.file.dataDirectory).then(function (rootdir) {
            _this.file.getFile(rootdir, path, { create: false }).then(function (entryFile) {
                _this.mediaPlay(entryFile.toInternalURL());
            });
        });
    };
    Flashcard.prototype.copyToast = function (clipboard) {
        var toast = this.toastCtrl.create({
            message: "Word \"" + clipboard + "\" was copied to your clipboard.",
            duration: 2000,
            position: "top"
        });
        toast.onDidDismiss(function () {
            // console.log("Dismissed toast");
        });
        toast.present();
    };
    Flashcard.prototype.copyToClipboard = function (word) {
        var _this = this;
        if (this.plt.is("core") || this.plt.is("mobileweb")) {
            var selBox = document.createElement("textarea");
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
        }
        else {
            this.clipboard.copy(word).then(function (success) {
                _this.copyToast(word);
            }, function (err) {
                console.log(err);
            });
        }
    };
    Flashcard.prototype.getBaseName = function (path) {
        return path.split(/[\\/]/).pop();
    };
    Flashcard.prototype.downloadAndPlay = function (external_path, internal_path) {
        var _this = this;
        var targetPath = this.file.dataDirectory + internal_path;
        var trustHosts = true;
        var options = {};
        this.fileTransfer
            .download(external_path, targetPath, trustHosts, options)
            .then(function (track) {
            _this.mediaPlay(track.toInternalURL());
        }, function (error) {
            _this.onError("The audio file could not be downloaded.");
        });
    };
    Flashcard.prototype.playAudio = function (track) {
        var _this = this;
        this.stopAllAudio();
        if (track !== undefined && track.filename !== undefined) {
            // get path. add config path if it's there.
            var path_1 = track.filename;
            if (this.audio_path && this.audio_path !== undefined) {
                path_1 = this.audio_path + track.filename;
            }
            // set ID and path to internal storage
            var internal_path_1 = "assets/audio/" + this.getBaseName(track.filename);
            var id = Date.now().toString();
            // if desktop or browser, run as HTML5 Audio
            if (this.plt.is("core") || this.plt.is("mobileweb")) {
                this.htmlAudioPlay(path_1);
                // If iOS or Android, download, store and play
            }
            else if (this.plt.is("android") || this.plt.is("ios")) {
                this.file
                    .checkFile(this.file.dataDirectory, internal_path_1)
                    .then(function (check) {
                    if (check) {
                        _this.playInternal(internal_path_1);
                    }
                    else {
                        _this.downloadAndPlay(path_1, internal_path_1);
                    }
                })
                    .catch(function (err) {
                    _this.downloadAndPlay(path_1, internal_path_1);
                });
            }
            else {
                this.showAlert();
            }
        }
        else {
            this.onError("There is no audio for this file.");
        }
    };
    Flashcard.prototype.imageError = function () {
        this.displayImages = false;
    };
    Flashcard.prototype.toggleFav = function (entry) {
        this.mtdService.toggleBookmark(entry);
    };
    Flashcard.prototype.favourited = function (entry) {
        return this.mtdService.bookmarks.value.indexOf(entry) > -1;
    };
    Flashcard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "flashcard-modal",template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/flashcards/flashcard-modal.component.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons left>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Flashcard Quiz\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content ng-switch="style" on-swipe-up="front = !front">\n  <ion-card>\n    <div *ngIf="displayImages && style === \'audio\'">\n      <img (click)="playAudio(card)" [(src)]="image" onError="this.src=\'assets/img/default.png\'" *ngIf="card.img" />\n    </div>\n    <ion-card-content [ngSwitch]="style">\n      <div *ngSwitchCase="\'active\'">\n        <ion-card-title *ngIf="!front">\n          {{ card.word }}\n        </ion-card-title>\n        <ion-card-title class="definition" *ngIf="front">\n          {{ card.definition }}\n        </ion-card-title>\n      </div>\n      <div *ngSwitchCase="\'passive\'">\n        <ion-card-title *ngIf="!front">\n          {{ card.definition }}\n        </ion-card-title>\n        <ion-card-title class="definition" *ngIf="front">\n          {{ card.word }}\n        </ion-card-title>\n      </div>\n      <div *ngSwitchCase="\'audio\'">\n        <ion-card-title *ngIf="!front">\n          {{ card.word }} - {{ card.definition }}\n        </ion-card-title>\n      </div>\n      <div *ngIf="card.optional && optional">\n        <p class="option" *ngFor="let option of checkedOptions; let i = index">\n          {{ option }} - {{ card.optional[option] }}\n        </p>\n      </div>\n    </ion-card-content>\n\n    <ion-row *ngIf="card.audio?.length > 0">\n      <!-- <ion-row *ngIf="(card.audio | noNullObjectValues)?.length > 0"> -->\n      <ion-card>\n        <ion-card-header>\n          Audio\n        </ion-card-header>\n\n        <ion-list>\n          <!-- <button ion-item *ngFor="let track of (card.audio | noNullObjectValues)" (click)="playAudio(track)"> -->\n          <button ion-item *ngFor="let track of card.audio" (click)="playAudio(track)">\n            <ion-icon name="musical-notes" item-start></ion-icon>\n            <span *ngIf="track.speaker">Speaker: {{ track.speaker }}</span>\n          </button>\n        </ion-list>\n      </ion-card>\n    </ion-row>\n\n    <ion-row *ngIf="(card.example_sentence | noNullValues)?.length > 0">\n      <ion-card>\n        <ion-card-header>\n          Sentences\n        </ion-card-header>\n\n        <ion-list *ngFor="\n            let sentence of card.example_sentence | noNullValues;\n            let i = index\n          ">\n          <!-- <button ion-item *ngFor="let track of (card.example_sentence_audio[i] | noNullObjectValues)" (click)="playAudio(track)"> -->\n          <button ion-item *ngFor="let track of card.audio" (click)="playAudio(track)">\n            <ion-icon name="musical-notes" item-start></ion-icon>\n            <h2>{{ sentence }}</h2>\n            <h4>{{ card.example_sentence_definition[i] }}</h4>\n            <h6 *ngIf="track.speaker">Speaker: {{ track.speaker }}</h6>\n          </button>\n        </ion-list>\n      </ion-card>\n    </ion-row>\n\n    <ion-row no-padding>\n      <ion-col>\n        <button ion-button clear small color="primary" icon-left (click)="toggleFav(card)">\n          <ion-icon *ngIf="favourited(card)" name="ios-bookmarks"></ion-icon>\n          <ion-icon *ngIf="!favourited(card)" name="ios-bookmarks-outline"></ion-icon>\n          Bookmark\n        </button>\n        <ion-col>\n          <button ion-button clear small color="primary" icon-left (click)="copyToClipboard(card.word)">\n            <ion-icon name="copy"></ion-icon>\n            Copy\n          </button>\n        </ion-col>\n        <button ion-button clear small color="primary" icon-left (click)="front = !front">\n          <ion-icon name="refresh"></ion-icon>\n          <span *ngIf="front">Flip to back</span><span *ngIf="!front">Flip to front</span>\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-buttons left class="bar-buttons bar-buttons-ios">\n      <button ion-button icon-only (click)="prev1()">\n        <ion-icon name="ios-arrow-back" class="scroll"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons end class="bar-buttons bar-buttons-ios">\n      <button ion-button icon-only (click)="next1()">\n        <ion-icon name="ios-arrow-forward" class="scroll"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/flashcards/flashcard-modal.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ionic_native_clipboard__["a" /* Clipboard */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_media__["a" /* Media */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__app_mtd_service__["a" /* MTDService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */]])
    ], Flashcard);
    return Flashcard;
}());

//# sourceMappingURL=flashcard-modal.component.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_clipboard__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_media__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_mtd_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var WordModal = /** @class */ (function () {
    function WordModal(toastCtrl, navCtrl, navParams, clipboard, viewCtrl, audio, alertCtrl, file, transfer, storage, plt, mtdService) {
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.clipboard = clipboard;
        this.viewCtrl = viewCtrl;
        this.audio = audio;
        this.alertCtrl = alertCtrl;
        this.file = file;
        this.transfer = transfer;
        this.storage = storage;
        this.plt = plt;
        this.mtdService = mtdService;
        this.displayImages = true; //default show images, turns to false on 404
        this.optional = false;
        this.objectKeys = Object.keys;
        this.default_sentence_i = 0;
        this.audio_playing = [];
        this.audio_path = __WEBPACK_IMPORTED_MODULE_8__app_global__["a" /* MTDInfo */].config["audio_path"];
        this.fileTransfer = this.transfer.create();
        this.entry = this.navParams.get("entry");
        if (this.entry.optional) {
            this.optionalSelection = this.entry.optional.map(function (x) { return Object.keys(x); })[0];
        }
        this.checkedOptions = this.optionalSelection;
        try {
            this.image = "assets/img/" + this.entry.img;
        }
        catch (error) { }
    }
    WordModal.prototype.checkOptionTruth = function (options) {
        if (options && options.length > 0) {
            return options.some(function (option) {
                return Object.keys(option).some(function (key) { return option[key]; });
            });
        }
        else {
            return false;
        }
    };
    WordModal.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: "Sorry",
            subTitle: "We couldn't find the audio for this.",
            buttons: ["Dismiss"]
        });
        alert.present();
    };
    WordModal.prototype.showExpAlert = function () {
        var alert = this.alertCtrl.create({
            title: "Sorry",
            subTitle: "We couldn't find the audio for this. Are you sure you are connected to the internet?",
            buttons: ["Dismiss"]
        });
        alert.present();
    };
    WordModal.prototype.stopAllAudio = function () {
        this.audio_playing.forEach(function (element) {
            try {
                element.stop();
            }
            catch (error) {
                element.pause();
            }
        });
        this.audio_playing = [];
    };
    WordModal.prototype.copyToast = function (clipboard) {
        var toast = this.toastCtrl.create({
            message: "Word \"" + clipboard + "\" was copied to your clipboard.",
            duration: 2000,
            position: "top"
        });
        toast.onDidDismiss(function () {
            // console.log("Dismissed toast");
        });
        toast.present();
    };
    WordModal.prototype.copyToClipboard = function (word) {
        var _this = this;
        if (this.plt.is("core") || this.plt.is("mobileweb")) {
            var selBox = document.createElement("textarea");
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
        }
        else {
            this.clipboard.copy(word).then(function (success) {
                _this.copyToast(word);
            }, function (err) {
                console.log(err);
            });
        }
    };
    WordModal.prototype.mediaPlay = function (path) {
        var _this = this;
        var audio = this.audio.create(path);
        audio.onError.subscribe(function (err) {
            console.log(err);
            _this.audio_playing.pop();
        });
        audio.onStatusUpdate.subscribe(function (status) {
            if (status === 1 || status === 2) {
                _this.audio_playing.push(audio);
            }
            if (status === 4) {
                _this.audio_playing.pop();
            }
        });
        audio.play();
    };
    WordModal.prototype.htmlAudioPlay = function (path) {
        var _this = this;
        var audio = new Audio(path);
        audio.onerror = function (err) {
            console.log(err);
            _this.audio_playing.pop();
        };
        audio.onended = function () {
            _this.audio_playing.pop();
        };
        this.audio_playing.push(audio);
        audio.play();
    };
    WordModal.prototype.playInternal = function (path) {
        var _this = this;
        this.file.resolveDirectoryUrl(this.file.dataDirectory).then(function (rootdir) {
            _this.file.getFile(rootdir, path, { create: false }).then(function (entryFile) {
                _this.mediaPlay(entryFile.toInternalURL());
            });
        });
    };
    WordModal.prototype.getBaseName = function (path) {
        return path.split(/[\\/]/).pop();
    };
    WordModal.prototype.downloadAndPlay = function (external_path, internal_path) {
        var _this = this;
        var targetPath = this.file.dataDirectory + internal_path;
        var trustHosts = true;
        var options = {};
        this.fileTransfer
            .download(external_path, targetPath, trustHosts, options)
            .then(function (track) {
            _this.mediaPlay(track.toInternalURL());
        }, function (error) {
            _this.onError("The audio file could not be downloaded.");
        });
    };
    WordModal.prototype.playAudio = function (track) {
        var _this = this;
        this.stopAllAudio();
        if (track !== undefined && track.filename !== undefined) {
            // get path. add config path if it's there.
            var path_1 = track.filename;
            if (this.audio_path && this.audio_path !== undefined) {
                path_1 = this.audio_path + track.filename;
            }
            // set ID and path to internal storage
            var internal_path_1 = "assets/audio/" + this.getBaseName(track.filename);
            // if desktop or browser, run as HTML5 Audio
            if (this.plt.is("core") || this.plt.is("mobileweb")) {
                this.htmlAudioPlay(path_1);
                // If iOS or Android, download, store and play
            }
            else if (this.plt.is("android") || this.plt.is("ios")) {
                this.file
                    .checkFile(this.file.dataDirectory, internal_path_1)
                    .then(function (check) {
                    if (check) {
                        _this.playInternal(internal_path_1);
                    }
                    else {
                        _this.downloadAndPlay(path_1, internal_path_1);
                    }
                })
                    .catch(function (err) {
                    _this.downloadAndPlay(path_1, internal_path_1);
                });
            }
            else {
                this.showAlert();
            }
        }
        else {
            this.onError("There is no audio for this file.");
        }
    };
    WordModal.prototype.onError = function (err) {
        if (err === void 0) { err = "Something went wrong with the audio for this file."; }
        var alert = this.alertCtrl.create({
            title: "Sorry",
            subTitle: err,
            buttons: ["OK"]
        });
        alert.present();
    };
    WordModal.prototype.dismiss = function () {
        this.stopAllAudio();
        this.viewCtrl.dismiss();
    };
    WordModal.prototype.showOptions = function () {
        var _this = this;
        // Object with options used to create the alert
        var options = {
            title: "Optional fields",
            message: "Choose which optional fields to display",
            inputs: [],
            buttons: [
                {
                    text: "Cancel",
                    role: "cancel",
                    handler: function () { }
                },
                {
                    text: "Ok",
                    handler: function (data) {
                        var checkedOptions = [];
                        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                            var item = data_1[_i];
                            for (var _a = 0, _b = _this.optionalSelection; _a < _b.length; _a++) {
                                var key = _b[_a];
                                if (key === item) {
                                    checkedOptions.push(key);
                                }
                            }
                        }
                        _this.checkedOptions = checkedOptions;
                    }
                }
            ]
        };
        // Now we add the radio buttons
        for (var _i = 0, _a = this.optionalSelection; _i < _a.length; _i++) {
            var option = _a[_i];
            options.inputs.push({
                name: "options",
                value: option,
                label: option,
                type: "checkbox",
                checked: this.checkChecked(option)
            });
        }
        var alert = this.alertCtrl.create(options);
        alert.present();
    };
    WordModal.prototype.checkChecked = function (option) {
        if (this.checkedOptions.indexOf(option) >= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    WordModal.prototype.imageError = function () {
        this.displayImages = false;
    };
    WordModal.prototype.toggleFav = function (entry) {
        this.mtdService.toggleBookmark(entry);
    };
    WordModal.prototype.favourited = function (entry) {
        return this.mtdService.bookmarks.value.indexOf(entry) > -1;
    };
    WordModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "word-modal",template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/shared/word-modal.component.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-buttons left>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Word Info\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-card>\n    <div *ngIf="displayImages">\n      <img [(src)]="entry.img" onError="this.src=\'assets/img/default.png\'" *ngIf="entry.img" />\n    </div>\n    <ion-card-content>\n      <ion-card-title>\n        {{ entry.word }}\n      </ion-card-title>\n      <p class="definition">\n        {{ entry.definition }}\n      </p>\n      <div *ngIf="entry.optional && optional && checkOptionTruth(entry.optional)">\n        <div class="option" *ngFor="let optional_dict of entry.optional; let i = index">\n          <ng-container *ngFor="let option of objectKeys(optional_dict)">\n            <p *ngIf="entry.optional[i][option]">\n              <span>{{ option }} - {{ entry.optional[i][option] }} </span>\n            </p>\n          </ng-container>\n        </div>\n      </div>\n    </ion-card-content>\n\n    <!-- <ion-row *ngIf="(entry.audio | noNullObjectValues)?.length > 0"> -->\n    <ion-row *ngIf="entry.audio?.length > 0">\n      <ion-card>\n        <ion-card-header>\n          Audio\n        </ion-card-header>\n\n        <ion-list>\n          <!-- <button ion-item *ngFor="let track of (entry.audio | noNullObjectValues)" (click)="playAudio(track)"> -->\n          <button ion-item *ngFor="let track of entry.audio" (click)="playAudio(track)">\n            <ion-icon name="musical-notes" item-start></ion-icon>\n            <span *ngIf="track.speaker">Speaker: {{ track.speaker }}</span>\n          </button>\n        </ion-list>\n      </ion-card>\n    </ion-row>\n\n    <ion-row *ngIf="(entry.example_sentence | noNullValues)?.length > 0">\n      <ion-card>\n        <ion-card-header>\n          Sentences\n        </ion-card-header>\n\n        <ion-list *ngFor="\n            let sentence of entry.example_sentence | noNullValues;\n            let i = index\n          ">\n          <!-- <button ion-item *ngFor="let track of (entry.example_sentence_audio[i] | noNullObjectValues)"\n          (click)="playAudio(track)"> -->\n          <button ion-item *ngFor="let track of entry.example_sentence_audio[i]" (click)="playAudio(track)">\n            <ion-icon name="musical-notes" item-start></ion-icon>\n            <h2>{{ sentence }}</h2>\n            <h4>{{ entry.example_sentence_definition[i] }}</h4>\n            <h6 *ngIf="track.speaker">Speaker: {{ track.speaker }}</h6>\n          </button>\n        </ion-list>\n      </ion-card>\n    </ion-row>\n\n    <ion-row no-padding>\n      <ion-col>\n        <button ion-button clear small color="primary" icon-left (click)="toggleFav(entry)">\n          <ion-icon *ngIf="favourited(entry)" name="ios-bookmarks"></ion-icon>\n          <ion-icon *ngIf="!favourited(entry)" name="ios-bookmarks-outline"></ion-icon>\n          Bookmark\n        </button>\n      </ion-col>\n      <ion-col>\n        <button ion-button clear small color="primary" icon-left (click)="copyToClipboard(entry.word)">\n          <ion-icon name="copy"></ion-icon>\n          Copy\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n</ion-content>\n\n<ion-footer *ngIf="checkOptionTruth(entry.optional)">\n  <ion-toolbar>\n    <ion-item>\n      <ion-toggle checked="false" [(ngModel)]="optional"></ion-toggle>\n      <ion-label>Show optional information</ion-label>\n    </ion-item>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/shared/word-modal.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_clipboard__["a" /* Clipboard */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_media__["a" /* Media */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__app_mtd_service__["a" /* MTDService */]])
    ], WordModal);
    return WordModal;
}());

//# sourceMappingURL=word-modal.component.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(229);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_media__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__mtd_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_pipes_module__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_clipboard__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["a" /* About */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["b" /* Bookmarks */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["c" /* Browse */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["f" /* Flashcards */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["g" /* Random */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["h" /* Search */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["d" /* EntryList */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["i" /* WordModal */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["e" /* Flashcard */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12__pipes_pipes_module__["a" /* PipesModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["a" /* About */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["b" /* Bookmarks */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["c" /* Browse */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["f" /* Flashcards */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["g" /* Random */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["h" /* Search */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["d" /* EntryList */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["i" /* WordModal */],
                __WEBPACK_IMPORTED_MODULE_10__pages__["e" /* Flashcard */]
            ],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__mtd_service__["a" /* MTDService */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_clipboard__["a" /* Clipboard */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_media__["a" /* Media */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MTDInfo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

var MTDInfo = Object.freeze({
    allEntries: window['getAllEntries'](),
    allAudioEntries: window['getAllAudioEntries'](),
    config: window['config'],
    dataDict: window['dataDict'],
    dataKeys: Object(__WEBPACK_IMPORTED_MODULE_0_lodash__["uniq"])(window['dataDict'].map(function (x) { return x['source']; })),
});
//# sourceMappingURL=global.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mtd_service__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, storage, mtdService) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.mtdService = mtdService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages__["h" /* Search */];
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Search', component: __WEBPACK_IMPORTED_MODULE_5__pages__["h" /* Search */] },
            { title: 'Browse', component: __WEBPACK_IMPORTED_MODULE_5__pages__["c" /* Browse */] },
            { title: 'Random', component: __WEBPACK_IMPORTED_MODULE_5__pages__["g" /* Random */] },
            { title: 'Bookmarks', component: __WEBPACK_IMPORTED_MODULE_5__pages__["b" /* Bookmarks */] },
            { title: 'Flashcards', component: __WEBPACK_IMPORTED_MODULE_5__pages__["f" /* Flashcards */] },
            { title: 'About', component: __WEBPACK_IMPORTED_MODULE_5__pages__["a" /* About */] }
        ];
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.storage.ready().then(function () {
                var language_name = __WEBPACK_IMPORTED_MODULE_6__global__["a" /* MTDInfo */].config.L1.name;
                var build_no = __WEBPACK_IMPORTED_MODULE_6__global__["a" /* MTDInfo */].config.build;
                var id = language_name + build_no;
                // retrieve favourited entries from storage and tag favourited entries
                _this.storage.get(id).then(function (val) {
                    if (val) {
                        val = JSON.parse(val);
                        var favs = [];
                        var _loop_1 = function (fav) {
                            for (var _i = 0, _a = __WEBPACK_IMPORTED_MODULE_6__global__["a" /* MTDInfo */].dataDict.filter(function (x) { return x['source'] == fav['source']; }); _i < _a.length; _i++) {
                                var entry = _a[_i];
                                if (entry.entryID === fav.entryID) {
                                    entry.favourited = true;
                                    favs.push(entry);
                                    break;
                                }
                            }
                        };
                        for (var _i = 0, val_1 = val; _i < val_1.length; _i++) {
                            var fav = val_1[_i];
                            _loop_1(fav);
                        }
                        _this.mtdService.setBookmarks(favs);
                    }
                });
            });
        });
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.isiPad = function () {
        return this.platform.is('iPad');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/app/app.html"*/'<!--<ion-split-pane [when]="isiPad">-->\n  <ion-menu [content]="content">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>Menu</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content scrollbar-y-auto on-swipe-right="menuOpen">\n      <ion-list>\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n      </ion-list>\n    </ion-content>\n\n  </ion-menu>\n\n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n<!--</ion-split-pane>-->'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_7__mtd_service__["a" /* MTDService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return About; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(287);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var About = /** @class */ (function () {
    function About(navCtrl) {
        this.navCtrl = navCtrl;
        this.version = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].versions.app;
        this.language = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* MTDInfo */].config["L1"]["name"];
        this.build = "";
        if (__WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* MTDInfo */] && __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* MTDInfo */].config && "build" in __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* MTDInfo */].config) {
            this.build = this.buildToString(__WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* MTDInfo */].config["build"]);
        }
    }
    About.prototype.buildToString = function (build) {
        var year = build.slice(0, 4);
        var month = build.slice(4, 6);
        var day = build.slice(6, 8);
        var time = build.slice(8, 10) + ":" + build.slice(10, 12);
        return "The data in this app was compiled at " + time + " on " + year + "/" + month + "/" + day;
    };
    About = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-about",template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>About</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding scrollbar-y-auto>\n  <div style="text-align: center;">\n    <img style="margin-top: 20px;" src="/assets/img/splash.png" />\n  </div>\n  <div style="text-align: center;">\n    <a href="https://www.mothertongues.org">\n      <img\n        style="width: 150px; margin-top: 30px;"\n        href="https://www.mothertongues.org"\n        src="/assets/img/logo.png"\n      />\n    </a>\n    <p>UI version {{ version }}</p>\n  </div>\n  <p style="text-align: center;">{{ build }}</p>\n</ion-content>\n'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], About);
    return About;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var packageJson = __webpack_require__(288);
var environment = {
    appName: "mothertongues-UI",
    envName: "DEV",
    production: false,
    versions: {
        app: packageJson.version
    }
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 288:
/***/ (function(module, exports) {

module.exports = {"name":"mothertongues-UI","version":"3.3.0","author":"Aidan Pine","homepage":"http://www.mothertongues.org","private":true,"scripts":{"clean":"ionic-app-scripts clean","build":"ionic-app-scripts build","ionic:build":"ionic-app-scripts build","ionic:serve":"ionic-app-scripts serve","minify":"uglifyjs src/assets/js/mtd.js src/assets/js/levenshtein.js src/assets/js/editDistance.js src/assets/js/utility.js src/assets/js/deadSearch.js -o src/assets/js/mtd-ui.min.js"},"husky":{"hooks":{"pre-commit":"pretty-quick --staged","commit-msg":"commitlint -E HUSKY_GIT_PARAMS"}},"commitlint":{"extends":["@commitlint/config-conventional"]},"dependencies":{"@angular/common":"5.0.3","@angular/compiler":"5.0.3","@angular/compiler-cli":"5.0.3","@angular/core":"5.0.3","@angular/forms":"5.0.3","@angular/http":"5.0.3","@angular/platform-browser":"5.0.3","@angular/platform-browser-dynamic":"5.0.3","@commitlint/config-conventional":"^8.3.4","@ionic-native/android-permissions":"^4.5.3","@ionic-native/clipboard":"^4.20.0","@ionic-native/core":"4.4.0","@ionic-native/file":"^4.5.3","@ionic-native/file-transfer":"^4.5.3","@ionic-native/media":"^4.20.0","@ionic-native/splash-screen":"4.4.0","@ionic-native/status-bar":"4.4.0","@ionic/pro":"^1.0.19","@ionic/storage":"2.1.3","commitlint":"^8.3.5","cordova-android":"^8.1.0","cordova-browser":"^5.0.3","cordova-clipboard":"^1.3.0","cordova-ios":"^4.5.5","cordova-plugin-device":"^2.0.3","cordova-plugin-file":"^6.0.2","cordova-plugin-file-transfer":"^1.7.1","cordova-plugin-ionic-keyboard":"^2.2.0","cordova-plugin-ionic-webview":"^4.1.0","cordova-plugin-media":"5.0.3","cordova-plugin-splashscreen":"^5.0.3","cordova-plugin-whitelist":"^1.3.4","husky":"^3.0.9","ionic":"^5.4.1","ionic-angular":"3.9.2","ionicons":"3.0.0","prettier":"^1.19.1","pretty-quick":"^2.0.1","rxjs":"5.5.2","sw-toolbox":"3.6.0","transliteration":"^2.1.11","web":"0.0.2","zone.js":"0.8.18"},"devDependencies":{"@angular/cli":"^1.7.4","@ionic/app-scripts":"^3.1.8","typescript":"2.4.2","uglify-js":"^3.4.9"},"description":"A Mother Tongues Dictionary app","cordova":{"plugins":{"cordova-plugin-whitelist":{},"cordova-plugin-device":{},"cordova-plugin-splashscreen":{},"cordova-plugin-ionic-webview":{"ANDROID_SUPPORT_ANNOTATIONS_VERSION":"27.+"},"cordova-plugin-ionic-keyboard":{},"cordova-plugin-file":{},"cordova-plugin-file-transfer":{},"cordova-plugin-media":{"KEEP_AVAUDIOSESSION_ALWAYS_ACTIVE":"NO"},"cordova-clipboard":{}},"platforms":["browser","android","ios"]}}

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bookmarks; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_mtd_service__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Bookmarks = /** @class */ (function () {
    function Bookmarks(navCtrl, mtdService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.mtdService = mtdService;
        this.edit = false;
        this.mtdService.bookmarks.subscribe(function (bookmarks) {
            _this.bookmarks = bookmarks;
        });
    }
    Bookmarks.prototype.removeEntries = function (bookmarks) {
        this.mtdService.setBookmarks(bookmarks.filter(function (bookmark) { return !bookmark.checked; }));
        this.toggleEdit();
    };
    Bookmarks.prototype.toggleEdit = function () {
        this.edit = !this.edit;
    };
    Bookmarks = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-bookmarks",template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/bookmarks/bookmarks.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bookmarks</ion-title>\n    <ion-buttons right>\n      <button ion-button (click)="edit = !edit">\n      <ion-icon name="trash" *ngIf="!edit"></ion-icon>\n      <span *ngIf="edit">cancel</span>\n    </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding scrollbar-y-auto>\n  <entry-list [entries]=\'bookmarks\' [parentEdit]="edit"></entry-list>\n  <div class=\'center\'>\n    <button ion-button color="danger" class="remove" *ngIf="edit" (click)="removeEntries(bookmarks)">Remove selected bookmarks</button>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/bookmarks/bookmarks.html"*/
            // providers: [EntryList]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__app_mtd_service__["a" /* MTDService */]])
    ], Bookmarks);
    return Bookmarks;
}());

//# sourceMappingURL=bookmarks.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MTDService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MTDService = /** @class */ (function () {
    function MTDService(storage) {
        var _this = this;
        this.storage = storage;
        this.bookmarks = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.categories = {};
        if (__WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].allAudioEntries.length > 0 &&
            __WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].allAudioEntries.length < __WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].allEntries.length * 0.5) {
            this.categories["audio"] = {};
            this.categories["audio"] = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].allAudioEntries;
        }
        var _loop_1 = function (key) {
            this_1.categories[key] = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].dataDict.filter(function (x) { return x["source"] == key; });
        };
        var this_1 = this;
        for (var _i = 0, _a = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].dataKeys; _i < _a.length; _i++) {
            var key = _a[_i];
            _loop_1(key);
        }
        var semantic_categories = {};
        __WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].allEntries.forEach(function (entry) {
            if (entry.theme) {
                var formattedTheme = _this.formatTheme(entry.theme);
                if (!(formattedTheme in semantic_categories)) {
                    semantic_categories[formattedTheme] = [];
                }
                if ("secondary_theme" in entry &&
                    entry.secondary_theme &&
                    entry.theme) {
                    var formattedSecondaryTheme = _this.formatSecondaryTheme(entry.theme, entry.secondary_theme);
                    if (semantic_categories[formattedTheme].indexOf(formattedSecondaryTheme) < 0) {
                        semantic_categories[formattedTheme].push(formattedSecondaryTheme);
                    }
                }
            }
        });
        // sort themes
        var ordered_categories = [];
        Object.keys(semantic_categories)
            .sort()
            .forEach(function (key) {
            ordered_categories.push(key);
            ordered_categories = ordered_categories.concat(semantic_categories[key].sort());
        });
        var _loop_2 = function (cat) {
            if (cat) {
                this_2.categories[cat] = __WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].allEntries.filter(function (entry) {
                    return _this.formatTheme(entry.theme) === cat ||
                        _this.formatSecondaryTheme(entry.theme, entry.secondary_theme) ===
                            cat;
                });
            }
        };
        var this_2 = this;
        for (var _b = 0, ordered_categories_1 = ordered_categories; _b < ordered_categories_1.length; _b++) {
            var cat = ordered_categories_1[_b];
            _loop_2(cat);
        }
    }
    MTDService.prototype.formatTheme = function (theme) {
        if (theme) {
            return theme.charAt(0).toUpperCase() + theme.slice(1);
        }
        else {
            return "";
        }
    };
    MTDService.prototype.formatSecondaryTheme = function (theme, secondary_theme) {
        if (theme && secondary_theme) {
            return this.formatTheme(theme) + " / " + secondary_theme.toLowerCase();
        }
        else {
            return "";
        }
    };
    MTDService.prototype.setBookmarks = function (val) {
        this.bookmarks.next(val);
        this.storage.set(__WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].config.L1.name + __WEBPACK_IMPORTED_MODULE_1__global__["a" /* MTDInfo */].config.build, JSON.stringify(val));
    };
    MTDService.prototype.toggleBookmark = function (entry) {
        var i = this.bookmarks.value.indexOf(entry);
        var bookmarks;
        if (i > -1) {
            bookmarks = this.bookmarks.value;
            bookmarks.splice(i, 1);
        }
        else if (i < 0) {
            bookmarks = this.bookmarks.value.concat([entry]);
        }
        this.setBookmarks(bookmarks);
    };
    MTDService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], MTDService);
    return MTDService;
}());

//# sourceMappingURL=mtd.service.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Browse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_mtd_service__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Browse = /** @class */ (function () {
    function Browse(navCtrl, mtdService) {
        this.navCtrl = navCtrl;
        this.mtdService = mtdService;
        this.currentEntries = window["dataDict"];
        this.currentTen = window["get10"](window["dataDict"], 0);
        this.letters = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* MTDInfo */].config.L1.lettersInLanguage;
        this.selectedCategory = "words";
        this.startIndex = 0;
        // currentBrowsingLetter: String = this.letters[this.currentBrowsingEntries[0].sorting_form[0]];
        this.letterSelectOptions = { title: "Select a Letter" };
        this.categorySelectOptions = { title: "Select a Category" };
        this.initializeEntries(mtdService);
    }
    Browse.prototype.initializeEntries = function (mtdService) {
        this.displayCategories = Object.keys(mtdService.categories);
        // Add letter index to first words of that letter in entries
        this.letterInit();
    };
    // Determine whether letter occurs word-initially
    Browse.prototype.letterInit = function () {
        var letters = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* MTDInfo */].config.L1.lettersInLanguage;
        var newLetters = [];
        for (var _i = 0, letters_1 = letters; _i < letters_1.length; _i++) {
            var letter = letters_1[_i];
            var ind = letters.indexOf(letter);
            for (var _a = 0, _b = this.currentEntries; _a < _b.length; _a++) {
                var entry = _b[_a];
                if (entry.sorting_form[0] === ind) {
                    entry.firstWordIndex = ind;
                    newLetters.push(letter);
                    break;
                }
            }
        }
        this.displayLetters = newLetters;
    };
    // Scroll to previous 10 entries
    Browse.prototype.prev10 = function () {
        if (this.startIndex - 10 > 0) {
            this.startIndex -= 10;
            this.currentTen = window["get10"](this.currentEntries, this.startIndex);
        }
        else {
            this.startIndex = 0;
            this.currentTen = window["get10"](this.currentEntries, this.startIndex);
        }
    };
    // Scroll to next 10 entries
    Browse.prototype.next10 = function () {
        if (this.startIndex + 10 < this.currentEntries.length) {
            this.startIndex += 10;
            this.currentTen = window["get10"](this.currentEntries, this.startIndex);
        }
        else {
            this.startIndex = this.currentEntries.length - 10;
            this.currentTen = window["get10"](this.currentEntries, this.startIndex);
        }
    };
    Browse.prototype.secondary = function (cat) {
        return cat.charAt(0) === "-";
    };
    // Scroll to letter
    // Still needed: change selected letter dynamically
    Browse.prototype.scrollTo = function (letter) {
        var letterIndex = this.letters.indexOf(letter);
        for (var _i = 0, _a = this.currentEntries; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.firstWordIndex === letterIndex) {
                this.startIndex = this.currentEntries.indexOf(entry);
                this.currentTen = window["get10"](this.currentEntries, this.startIndex);
                break;
            }
        }
    };
    Browse.prototype.selectCategory = function (category) {
        this.currentEntries = this.mtdService.categories[category];
        this.currentTen = window["get10"](this.currentEntries, 0);
        this.letterInit();
    };
    Browse = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-browse",template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/browse/browse.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Browse</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content scrollbar-y-auto>\n\n  <ion-list mode="ios">\n    <ion-item mode="ios">\n      <ion-label class="label-left" mode="ios">Select a Category</ion-label>\n      <ion-select mode="ios" [(ngModel)]="selectedCategory" (ngModelChange)="selectCategory(selectedCategory)" [selectOptions]="categorySelectOptions">\n        <ion-option *ngFor=\'let category of displayCategories\'>{{category}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item mode="ios">\n      <ion-label class="label-left" mode="ios">Select a Letter</ion-label>\n      <ion-select mode="ios" [(ngModel)]="selectedLetter" (ngModelChange)="scrollTo($event)" [selectOptions]="letterSelectOptions">\n        <ion-option *ngFor=\'let letter of displayLetters\'>{{letter}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n  <div class="entry-container">\n    <entry-list [entries]=\'currentTen\'></entry-list>\n  </div>\n \n\n</ion-content>\n\n <ion-footer>\n    <ion-toolbar>\n      <ion-buttons left class="bar-buttons bar-buttons-ios">\n        <button ion-button icon-only (click)="prev10()">\n        <ion-icon name="ios-arrow-back" class="scroll"></ion-icon>\n      </button>\n      </ion-buttons>\n      <ion-buttons end class="bar-buttons bar-buttons-ios">\n        <button ion-button icon-only (click)="next10()">\n        <ion-icon name="ios-arrow-forward" class="scroll"></ion-icon>\n      </button>\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-footer>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/browse/browse.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__app_mtd_service__["a" /* MTDService */]])
    ], Browse);
    return Browse;
}());

//# sourceMappingURL=browse.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Flashcards; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__flashcard_modal_component__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_mtd_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Flashcards = /** @class */ (function () {
    function Flashcards(navCtrl, modalCtrl, mtdService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.mtdService = mtdService;
        this.alertCtrl = alertCtrl;
        this.deckSelectOptions = { title: "Select a Deck" };
        this.language = __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* MTDInfo */].config["L1"]["name"];
        this.language2 = __WEBPACK_IMPORTED_MODULE_4__app_global__["a" /* MTDInfo */].config["L2"]["name"];
        this.decks = Object.keys(mtdService.categories);
        this.flashcardStyles = [
            {
                title: "Show " + this.language,
                info: "This is the easiest method. It involves seeing the " + this.language + " word and guessing " + this.language2 + ".",
                type: "passive"
            },
            {
                title: "Show " + this.language2,
                info: "This method is designed to test your spelling of the " + this.language + " word. You are provided with the " + this.language2 + ", and have to guess the " + this.language + " word.",
                type: "active"
            },
            {
                title: "Audio Only",
                info: "This method is entirely without any written prompt. Try and guess the word in both " + this.language2 + " and " + this.language + "!",
                type: "audio"
            }
        ];
    }
    Flashcards.prototype.startFlashcards = function () {
        if (this.deck === undefined) {
            var alert_1 = this.alertCtrl.create({
                title: "Oops!",
                subTitle: "Did you select a deck?",
                buttons: ["Try again"]
            });
            alert_1.present();
        }
        else if (this.selectedFlashcardStyle === undefined) {
            var alert_2 = this.alertCtrl.create({
                title: "Oops!",
                subTitle: "Did you select a flashcard style?",
                buttons: ["Try again"]
            });
            alert_2.present();
        }
        else {
            var flashcardModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__flashcard_modal_component__["a" /* Flashcard */], {
                deck: this.deck,
                style: this.selectedFlashcardStyle
            });
            flashcardModal.present();
        }
    };
    Flashcards = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-flashcards",template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/flashcards/flashcards.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Flashcards</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding scrollbar-y-auto>\n\n  <ion-list class="deck-select">\n    <ion-list-header>\n      First, select a flashcard deck:\n    </ion-list-header>\n    <ion-item mode="ios">\n      <ion-label class="label-left" mode="ios">Select a Deck</ion-label>\n      <ion-select mode="ios" [(ngModel)]="deck" [selectOptions]="deckSelectOptions">\n        <ion-option *ngFor=\'let deck of decks\'>{{deck}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n\n  <ion-list radio-group [(ngModel)]="selectedFlashcardStyle">\n    <ion-list-header text-wrap>\n      Then, select a style of learning between the following options:\n    </ion-list-header>\n    <ion-item *ngFor="let style of flashcardStyles">\n      <ion-label>{{style.title}}</ion-label>\n      <p>{{style.info}}</p>\n      <ion-radio value="{{style.type}}"></ion-radio>\n    </ion-item>\n  </ion-list>\n\n  <div class="center"><button ion-button secondary (click)=\'startFlashcards()\'>Click here to start!</button></div>\n</ion-content>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/flashcards/flashcards.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__app_mtd_service__["a" /* MTDService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], Flashcards);
    return Flashcards;
}());

//# sourceMappingURL=flashcards.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Random; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Random = /** @class */ (function () {
    function Random(navCtrl) {
        this.navCtrl = navCtrl;
    }
    Random.prototype.getRandom = function () {
        this.entries = window['getRandom10']();
    };
    Random = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-random',template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/random/random.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Random</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding scrollbar-y-auto>\n  <div class="center"><button ion-button color="ternary" (click)=\'getRandom()\'>Click here for 10 Random words</button></div>\n  <div class="entry-container" *ngIf="entries">\n    <entry-list [entries]="entries"></entry-list>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/random/random.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], Random);
    return Random;
}());

//# sourceMappingURL=random.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Search; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_transliteration__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_transliteration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_transliteration__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Search = /** @class */ (function () {
    function Search(navCtrl) {
        this.navCtrl = navCtrl;
        this.entries = __WEBPACK_IMPORTED_MODULE_2__app_global__["a" /* MTDInfo */].allEntries;
        this.searchQuery = "";
        this.matchThreshold = 0;
        this.partialThreshold = 1;
        this.maybeThreshold = 2;
        this.approxWeight = 1;
    }
    Search.prototype.getRegex = function (re, key) {
        if (key === void 0) { key = "definition"; }
        var results = [];
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (re.test(entry[key])) {
                results.push(entry);
            }
        }
        var sorted_answers = results.sort(function (a, b) {
            return a[key].length - b[key].length;
        });
        return sorted_answers.slice(0, 9);
    };
    Search.prototype.getRegexFromSlug = function (re, key) {
        if (key === void 0) { key = "word"; }
        var results = [];
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (re.test(Object(__WEBPACK_IMPORTED_MODULE_3_transliteration__["slugify"])(entry[key]))) {
                results.push(entry);
            }
        }
        var sorted_answers = results.sort(function (a, b) {
            return a[key].length - b[key].length;
        });
        return sorted_answers.slice(0, 9);
    };
    // Results are sourced from multiple places and ordered accordingly:
    // 1. Exact Regex match (L1 || L2)
    // 2. Partial Regex match (L1 || L2)
    // 3. Exact match on slugified form
    // 4. levenstein on display form || levenstein on compare form
    // The first two are mutually exclusive due to complementary regular expressions
    // The third must be added only if the first two have not found the matches
    Search.prototype.getResults = function () {
        var _this = this;
        if (this.searchQuery.length > 1) {
            // Normalize
            var mtd = window["mtd"];
            var searchQuery = mtd.convertQuery(this.searchQuery);
            // 1. Exact match
            var searchQueryRegex = new RegExp("(\\s|^){1}" + searchQuery + "(?=([;.?!\\s]|$))", "i");
            var l1Exact_1 = this.getRegex(searchQueryRegex, "word");
            var l2Exact_1 = this.getRegex(searchQueryRegex);
            // 2. Partial match
            var searchQueryPartialRegex = new RegExp("(\\s|^){1}(" + this.searchQuery + ")\\S|\\S(" + this.searchQuery + ")(\\s|^){1}|\\S(" + this.searchQuery + ")\\S", 'i');
            var l1Partial_1 = this.getRegex(searchQueryPartialRegex, "word");
            var l2Partial_1 = this.getRegex(searchQueryPartialRegex);
            // 3. Partial match on slugified form
            var l1PartialSlug_1 = this.getRegexFromSlug(new RegExp(searchQueryPartialRegex.source + "|" + searchQueryRegex.source, "i"));
            // 4. levenstein (includes compare form and display)
            var target_1 = window["searchL1"](searchQuery);
            // Match containers
            var allMatches_1 = [];
            var matches_1 = [];
            var partMatches_1 = [];
            var maybeMatches_1 = [];
            // Collect l1Exact matches and add to allMatches
            var populateL1Exact = function () {
                for (var _i = 0, l1Exact_2 = l1Exact_1; _i < l1Exact_2.length; _i++) {
                    var result = l1Exact_2[_i];
                    var entry = result;
                    entry.type = "L1";
                    entry.distance = _this.matchThreshold;
                    allMatches_1.push(entry);
                }
            };
            // Collect l2Exact matches and add to allMatches
            var populateL2Exact = function () {
                for (var _i = 0, l2Exact_2 = l2Exact_1; _i < l2Exact_2.length; _i++) {
                    var result = l2Exact_2[_i];
                    var entry = result;
                    entry.type = "L2";
                    entry.distance = _this.matchThreshold;
                    allMatches_1.push(entry);
                }
            };
            // Collect l1Partial matches and add to allMatches
            var populateL1Partial = function () {
                for (var _i = 0, _a = l1Partial_1.concat(l1PartialSlug_1); _i < _a.length; _i++) {
                    var result = _a[_i];
                    var entry = result;
                    entry.type = "L1";
                    entry.distance = _this.partialThreshold;
                    allMatches_1.push(entry);
                }
            };
            // Collect l2Partial matches and add to allMatches
            var populateL2Partial = function () {
                for (var _i = 0, l2Partial_2 = l2Partial_1; _i < l2Partial_2.length; _i++) {
                    var result = l2Partial_2[_i];
                    var entry = result;
                    entry.type = "L2";
                    entry.distance = _this.partialThreshold;
                    allMatches_1.push(entry);
                }
            };
            var populateTarget = function () {
                for (var _i = 0, target_2 = target_1; _i < target_2.length; _i++) {
                    var result = target_2[_i];
                    var entry = result[1];
                    entry.type = "L1";
                    var resultIndex = allMatches_1.findIndex(function (match) {
                        return match.word === entry.word && match.definition === match.definition;
                    });
                    if (resultIndex === -1) {
                        allMatches_1.push(entry);
                    }
                    else {
                        if ("distance" in allMatches_1[resultIndex] &&
                            allMatches_1[resultIndex].distance > result[0]) {
                            allMatches_1[resultIndex].distance = result[0] + _this.approxWeight;
                        }
                    }
                }
            };
            var mergeMatches = function () {
                for (var _i = 0, allMatches_2 = allMatches_1; _i < allMatches_2.length; _i++) {
                    var entry = allMatches_2[_i];
                    if ("distance" in entry) {
                        if (entry.distance === _this.matchThreshold) {
                            matches_1.push(entry);
                        }
                        else if ("distance" in entry &&
                            entry.distance <= _this.partialThreshold &&
                            entry.distance > _this.matchThreshold) {
                            partMatches_1.push(entry);
                        }
                        else if (entry.distance <= _this.maybeThreshold &&
                            entry.distance > _this.partialThreshold) {
                            maybeMatches_1.push(entry);
                        }
                    }
                    else {
                        matches_1.push(entry);
                    }
                }
            };
            populateL1Exact();
            populateL2Exact();
            populateL1Partial();
            populateL2Partial();
            populateTarget();
            allMatches_1 = allMatches_1.filter(function (match, index, self) {
                return self.findIndex(function (t) { return t.word === match.word && t.definition === match.definition; }) === index;
            });
            mergeMatches();
            this.matches = matches_1;
            this.partMatches = partMatches_1;
            this.maybeMatches = maybeMatches_1;
        }
    };
    Search = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-search",template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/search/search.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Search</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding scrollbar-y-auto>\n  <ion-searchbar\n    (ionInput)="getResults()"\n    [(ngModel)]="searchQuery"\n    autocapitalize="none"\n  ></ion-searchbar>\n  <div *ngIf="searchQuery?.length > 1">\n    <div class="result-container" *ngIf="matches?.length > 0">\n      <h4>Matches</h4>\n      <entry-list\n        [entries]="matches"\n        [searchterm]="searchQuery"\n        [threshold]="matchThreshold"\n      ></entry-list>\n    </div>\n    <div class="result-container" *ngIf="partMatches?.length > 0">\n      <h4>Partial Matches</h4>\n      <entry-list\n        [entries]="partMatches"\n        [searchterm]="searchQuery"\n        [threshold]="partialThreshold"\n      ></entry-list>\n    </div>\n    <div class="result-container" *ngIf="maybeMatches?.length > 0">\n      <h4>Maybe you meant this?</h4>\n      <entry-list\n        [entries]="maybeMatches"\n        [searchterm]="searchQuery"\n        [threshold]="maybeThreshold"\n      ></entry-list>\n    </div>\n    <div\n      class="result-container"\n      *ngIf="matches?.length === 0 && partMatches?.length === 0 && maybeMatches?.length === 0"\n    >\n      <h6>\n        Sorry, we couldn\'t find any words matching \'{{ searchQuery }}\'. Please\n        try something else.\n      </h6>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/search/search.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], Search);
    return Search;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Entry */
var Entry = /** @class */ (function () {
    function Entry() {
    }
    return Entry;
}());

//# sourceMappingURL=entry.model.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntryList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__word_modal_component__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_transliteration__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_transliteration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_transliteration__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var levenstein = function (string1, string2) {
    var a = string1, b = string2 + "", m = [], i, j, min = Math.min;
    if (!(a && b))
        return (b || a).length;
    for (i = 0; i <= b.length; m[i] = [i++])
        ;
    for (j = 0; j <= a.length; m[0][j] = j++)
        ;
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            m[i][j] =
                b.charAt(i - 1) == a.charAt(j - 1)
                    ? m[i - 1][j - 1]
                    : (m[i][j] = min(m[i - 1][j - 1] + 1, min(m[i][j - 1] + 1, m[i - 1][j] + 1)));
        }
    }
    return m[b.length][a.length];
};
var EntryList = /** @class */ (function () {
    function EntryList(navCtrl, viewCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.edit = false;
        this.pageName = this.viewCtrl.name;
    }
    EntryList.prototype.trackByFn = function (index, item) {
        return item.entryID;
    };
    EntryList.prototype.showModal = function (clicked_entry) {
        var wordModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__word_modal_component__["a" /* WordModal */], { entry: clicked_entry });
        wordModal.present();
    };
    EntryList.prototype.highlight = function (entry, langType) {
        // TODO: this cannot properly deal with multi-word inputs.
        var text;
        if (langType === "L1") {
            text = entry.word;
        }
        else if (langType === "L2") {
            text = entry.definition;
        }
        if (!this.searchterm) {
            return text;
        }
        if (langType === "L1") {
            // if normalized, lower case search term matches word, return that, wrapped in <span>
            // else if compare form is < 2 distance, wrap that in <span>
            var mtd_1 = window["mtd"];
            var normTransducerName_1 = "norm";
            if ("norm_composite" in mtd_1.transducers) {
                normTransducerName_1 = "norm_composite";
            }
            var compareTransducerName_1 = "compare";
            if ("compare_composite" in mtd_1.transducers) {
                compareTransducerName_1 = "compare_composite";
            }
            // initial terms
            var searchTerm_1 = mtd_1
                .transduce(this.searchterm, normTransducerName_1)
                .toLowerCase();
            var normText = mtd_1.transduce(text, normTransducerName_1).toLowerCase();
            var normSearchTermPattern = new RegExp(searchTerm_1, "gi");
            // Match norm against text
            var match = void 0;
            if (text.match(normSearchTermPattern)) {
                var highlightIndices = [];
                while ((match = normSearchTermPattern.exec(text))) {
                    highlightIndices.push([match.index, normSearchTermPattern.lastIndex]);
                }
                highlightIndices.reverse();
                var newText = text;
                for (var i = 0; i < highlightIndices.length; i++) {
                    var beforeMatch = newText.substring(0, highlightIndices[i][0]);
                    var startMatchWrapper = '<span class="langMatched">';
                    var match_1 = newText.substring(highlightIndices[i][0], highlightIndices[i][1]);
                    var endMatchWrapper = "</span>";
                    var afterMatch = newText.substring(highlightIndices[i][1], newText.length);
                    newText =
                        beforeMatch +
                            startMatchWrapper +
                            match_1 +
                            endMatchWrapper +
                            afterMatch;
                }
                return newText;
            }
            // Match norm against slugified text
            var slugText = Object(__WEBPACK_IMPORTED_MODULE_3_transliteration__["slugify"])(entry.word);
            // Match norm against slug. Lengths of text and slugText must be the same to work properly
            var slugMatch = void 0;
            if (slugText.match(normSearchTermPattern) &&
                slugText.length === text.length) {
                var highlightIndices = [];
                while ((slugMatch = normSearchTermPattern.exec(slugText))) {
                    highlightIndices.push([
                        slugMatch.index,
                        normSearchTermPattern.lastIndex
                    ]);
                }
                highlightIndices.reverse();
                var newText = text;
                for (var i = 0; i < highlightIndices.length; i++) {
                    var beforeMatch = newText.substring(0, highlightIndices[i][0]);
                    var startMatchWrapper = '<span class="langMatched">';
                    var slugMatch_1 = newText.substring(highlightIndices[i][0], highlightIndices[i][1]);
                    var endMatchWrapper = "</span>";
                    var afterMatch = newText.substring(highlightIndices[i][1], newText.length);
                    newText =
                        beforeMatch +
                            startMatchWrapper +
                            slugMatch_1 +
                            endMatchWrapper +
                            afterMatch;
                }
                return newText;
            }
            // Match norm against compare text
            var compareText = entry.word;
            if ("compare_form" in entry) {
                compareText = entry.compare_form;
            }
            compareText = compareText.toLowerCase();
            // Match lev distance between norm or compare on single word
            if (levenstein(normText, searchTerm_1) <= this.threshold ||
                levenstein(compareText, searchTerm_1) <= this.threshold ||
                levenstein(slugText, searchTerm_1) <= this.threshold) {
                return "<span class=\"langMatched\">" + text + "</span>";
            }
            // match lev distance between word and sentence matches
            if (text.indexOf(" ") !== -1 && searchTerm_1.indexOf(" ") < 0) {
                // highlight lowest distance word if search is single word and text is sentence
                var words = text.split(" ");
                var normWords = words.map(function (x) {
                    return mtd_1.transduce(x, normTransducerName_1).toLowerCase();
                });
                var normWordsDistances = normWords.map(function (x) {
                    return levenstein(x, searchTerm_1);
                });
                var normMinIndex = normWordsDistances.indexOf(Math.min.apply(Math, normWordsDistances));
                if (normWordsDistances[normMinIndex] <= this.threshold) {
                    words[normMinIndex] = "<span class=\"langMatched\">" + words[normMinIndex] + "</span>";
                    return words.join(" ");
                }
                // else look at compare
                var compareWords = words.map(function (x) {
                    return mtd_1.transduce(x, compareTransducerName_1).toLowerCase();
                });
                var compareWordsDistances = compareWords.map(function (x) {
                    return levenstein(x, searchTerm_1);
                });
                var compareMinIndex = compareWordsDistances.indexOf(Math.min.apply(Math, compareWordsDistances));
                if (compareWordsDistances[compareMinIndex] <= this.threshold) {
                    words[compareMinIndex] = "<span class=\"langMatched\">" + words[compareMinIndex] + "</span>";
                    return words.join(" ");
                }
                // else look at slugified
                var slugWords = words.map(function (x) { return Object(__WEBPACK_IMPORTED_MODULE_3_transliteration__["slugify"])(x); });
                var slugWordsDistances = slugWords.map(function (x) {
                    return levenstein(x, searchTerm_1);
                });
                var slugMinIndex = slugWordsDistances.indexOf(Math.min.apply(Math, slugWordsDistances));
                if (slugWordsDistances[slugMinIndex] <= this.threshold) {
                    words[slugMinIndex] = "<span class=\"langMatched\">" + words[slugMinIndex] + "</span>";
                    return words.join(" ");
                }
            }
            // Last resort, just highlight the whole thing if it doesn't already match L2
            var l2Pattern = new RegExp(this.searchterm, "gi");
            if (!l2Pattern.test(entry.definition)) {
                return "<span class=\"langMatched\">" + text + "</span>";
            }
            else {
                return "<span>" + text + "</span>";
            }
        }
        else if (langType === "L2") {
            return text.replace(new RegExp(this.searchterm, "gi"), '<span class="langMatched">$&</span>');
        }
        else {
            return text;
        }
    };
    EntryList.prototype.ngOnChanges = function () {
        this.edit = this.parentEdit;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], EntryList.prototype, "parentEdit", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], EntryList.prototype, "entries", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], EntryList.prototype, "searchterm", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], EntryList.prototype, "threshold", void 0);
    EntryList = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "entry-list",template:/*ion-inline-start:"/Users/pinea/mothertongues-UI/src/pages/shared/entry-list.component.html"*/'<div id="browseEntries" class="browseElements">\n  <ion-list>\n    <div>\n      <ion-item class="matchContainer" (click)="showModal(entry)" *ngFor="let entry of entries; trackBy: trackByFn"\n        text-wrap>\n        <ion-checkbox color="danger" checked="false" *ngIf="edit" [(ngModel)]="entry.checked"></ion-checkbox>\n        <ion-label>\n          <div class="matchLeftContainer">\n            <span class="response matchLeftDiv" [innerHTML]="highlight(entry, \'L1\')"></span>\n          </div>\n          <div class="matchRightContainer">\n            <span class="response matchRightDiv" [innerHTML]="highlight(entry, \'L2\')"></span>\n          </div>\n        </ion-label>\n      </ion-item>\n    </div>\n  </ion-list>\n</div>'/*ion-inline-end:"/Users/pinea/mothertongues-UI/src/pages/shared/entry-list.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]])
    ], EntryList);
    return EntryList;
}());

//# sourceMappingURL=entry-list.component.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__no_null_values_no_null_values__ = __webpack_require__(298);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__no_null_values_no_null_values__["a" /* NoNullObjectValuesPipe */], __WEBPACK_IMPORTED_MODULE_1__no_null_values_no_null_values__["b" /* NoNullValuesPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__no_null_values_no_null_values__["a" /* NoNullObjectValuesPipe */], __WEBPACK_IMPORTED_MODULE_1__no_null_values_no_null_values__["b" /* NoNullValuesPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NoNullValuesPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoNullObjectValuesPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the NoNullValuesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var NoNullValuesPipe = /** @class */ (function () {
    function NoNullValuesPipe() {
    }
    /**
     * Removes empty strings from array
     */
    NoNullValuesPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (value) {
            return value.filter(function (x) { return x !== null && x !== ''; });
        }
    };
    NoNullValuesPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'noNullValues',
        })
    ], NoNullValuesPipe);
    return NoNullValuesPipe;
}());

var NoNullObjectValuesPipe = /** @class */ (function () {
    function NoNullObjectValuesPipe() {
    }
    /**
     * Removes empty objects from array
     */
    NoNullObjectValuesPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (value) {
            return value.filter(function (x) {
                var not_empty = true;
                Object.keys(x).forEach(function (k) {
                    if (!x[k]) {
                        not_empty = false;
                        return not_empty;
                    }
                });
                return not_empty;
            });
        }
    };
    NoNullObjectValuesPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'noNullObjectValues',
        })
    ], NoNullObjectValuesPipe);
    return NoNullObjectValuesPipe;
}());

//# sourceMappingURL=no-null-values.js.map

/***/ })

},[206]);
//# sourceMappingURL=main.js.map