import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { Media } from "@ionic-native/media";
import { IonicStorageModule } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
import { File } from "@ionic-native/file";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { SplashScreen } from "@ionic-native/splash-screen";
import { MyApp } from "./app.component";
import {
  About,
  Bookmarks,
  Browse,
  Flashcards,
  Random,
  Search,
  EntryList,
  WordModal,
  Flashcard
} from "../pages";
import { MTDService } from "./mtd.service";
import { PipesModule } from "../pipes/pipes.module";
import { Clipboard } from "@ionic-native/clipboard";

@NgModule({
  declarations: [
    MyApp,
    About,
    Bookmarks,
    Browse,
    Flashcards,
    Random,
    Search,
    EntryList,
    WordModal,
    Flashcard
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    About,
    Bookmarks,
    Browse,
    Flashcards,
    Random,
    Search,
    EntryList,
    WordModal,
    Flashcard
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MTDService,
    Clipboard,
    File,
    FileTransfer,
    FileTransferObject,
    Media,
    SplashScreen,
    StatusBar
  ]
})
export class AppModule {}
