import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { MTDApp } from './app.component';
import { EntryList, WordModal, Flashcard } from '../pages'
import { MTDService } from './mtd.service'
import { BookmarkService } from './bookmark.service'
import { PipesModule } from '../pipes/pipes.module'
import { AppRoutingModule } from './app-routing.module';
import { EntryListModule } from '../pages/shared/entry-list.module'
import { WordModalPageModule } from '../pages/shared/word-modal.module';

@NgModule({
  declarations: [
    MTDApp,
    Flashcard,
  ],
  bootstrap: [MTDApp],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    EntryListModule,
    WordModalPageModule,
    PipesModule
  ],
  entryComponents: [
    MTDApp,
    // EntryList,
    // WordModal,
    // EntryListModule,
    Flashcard,
  ],
  providers: [BookmarkService, MTDService, SplashScreen, StatusBar, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }]
})
export class AppModule {}
