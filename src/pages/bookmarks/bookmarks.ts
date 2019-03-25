import { Component } from '@angular/core';
import { BookmarkService } from '../../app/bookmark.service'
import { DictionaryData } from '../../app/models';

@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html',
  styleUrls: ['bookmarks.scss']
  // providers: [EntryList]
})
export class Bookmarks {

  bookmarks: DictionaryData[];
  edit: boolean = false;

  constructor(public bookmarkService: BookmarkService) {
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
