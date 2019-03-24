import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BookmarkService } from '../../app/bookmark.service'
import { DictionaryData } from '../../app/models';

@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html',
  // providers: [EntryList]
})
export class Bookmarks {

  bookmarks: DictionaryData[];
  edit: boolean = false;

  constructor(public navCtrl: NavController, public bookmarkService: BookmarkService) {
   this.bookmarkService.bookmarks.subscribe((bookmarks)=> { this.bookmarks = bookmarks });
  }

  removeEntries(bookmarks) {
    this.bookmarkService.setBookmarks(bookmarks.filter(bookmark => !bookmark.checked))
    this.toggleEdit()
  }

  toggleEdit() {
    this.edit = !this.edit
  }

}
