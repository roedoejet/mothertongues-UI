import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { About, Bookmarks, Browse, Flashcards, Random, Search, } from '../pages'

import { BookmarkService } from './bookmark.service'
import { MTDService } from './mtd.service'
import { Config, DictionaryData } from './models'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  bookmarks: DictionaryData[];
  rootPage: any = Search;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, public storage: Storage, private bookmarkService: BookmarkService, private mtdService: MTDService) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Search', component: Search },
      { title: 'Browse', component: Browse },
      { title: 'Pick a Random Word!', component: Random },
      { title: 'Bookmarks', component: Bookmarks },
      { title: 'Flashcards', component: Flashcards },
      { title: 'About', component: About }
    ];
    this.mtdService.config$.subscribe((x)=>{
      // console.log('pre-ready updated')
  })

    this.platform.ready().then(() => {
      this.mtdService.config$.subscribe((x)=>{
        // console.log('post-ready updated')
    })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.ready().then(() => {
        this.mtdService.config$.subscribe((x)=>{
          // console.log('storage ready updated')
      })
        this.mtdService.config$.subscribe((config) => {

          let language_name = config.L1.name
          let build_no = config.build 
          let id = language_name

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
                      favs.push(entry)
                      break;
                    }
                  }
                }
                this.bookmarkService.setBookmarks(favs)
              }
            })

          })


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
