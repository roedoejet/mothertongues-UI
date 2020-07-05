import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { About, Bookmarks, Browse, Flashcards, Random, Search, } from '../pages'

import { Entry } from '../pages/shared/entry.model'

import { MTDInfo } from './global'

import { MTDService } from './mtd.service'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  bookmarks: Entry[];
  rootPage: any = Search;

  pages: Array<{ title: string, component: any }>;


  constructor(public platform: Platform, private statusBar: StatusBar,
    private splashScreen: SplashScreen, public storage: Storage, public mtdService: MTDService) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Search', component: Search },
      { title: 'Browse', component: Browse },
      { title: 'Random', component: Random },
      { title: 'Bookmarks', component: Bookmarks },
      { title: 'Flashcards', component: Flashcards },
      { title: 'About', component: About }
    ];

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.ready().then(() => {
        let language_name = MTDInfo.config.L1.name
        let build_no = MTDInfo.config.build
        let id = language_name + build_no

        // retrieve favourited entries from storage and tag favourited entries
        this.storage.get(id).then((val) => {
          if (val) {
            val = JSON.parse(val);
            let favs = [];
            for (let fav of val) {
              for (let entry of MTDInfo.dataDict.filter(x => x['source'] == fav['source'])) {
                if (entry.entryID === fav.entryID) {
                  entry.favourited = true;
                  favs.push(entry)
                  break;
                }
              }
            }
            this.mtdService.setBookmarks(favs)
          }
        })

      });
    });
  }




  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  isiPad() {
    return this.platform.is('iPad')
  }
}
