import { Component } from "@angular/core";

import { NavController } from "ionic-angular";

import { Entry } from "../shared/entry.model";

import { MTDService } from "../../app/mtd.service";

@Component({
  selector: "page-bookmarks",
  templateUrl: "bookmarks.html"
  // providers: [EntryList]
})
export class Bookmarks {
  // @ViewChild(EntryList) child: EntryList

  bookmarks: Entry[];
  edit: boolean = false;

  constructor(public navCtrl: NavController, public mtdService: MTDService) {
    this.mtdService.bookmarks.subscribe(bookmarks => {
      this.bookmarks = bookmarks;
    });
  }

  removeEntries(bookmarks) {
    this.mtdService.setBookmarks(
      bookmarks.filter(bookmark => !bookmark.checked)
    );
    this.toggleEdit();
  }

  toggleEdit() {
    this.edit = !this.edit;
  }
}
