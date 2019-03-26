import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { MTDService } from './mtd.service'
import { Config, DictionaryData } from './models'

import { uniq } from 'lodash';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
    public bookmarks = new BehaviorSubject<DictionaryData[]>([]);
    config: Config;
    constructor(public storage: Storage, private mtdService: MTDService) {
  
        this.config = this.mtdService.config_value

    }

    setBookmarks(val) {
        this.bookmarks.next(val)
        this.storage.set(this.config.L1.name, JSON.stringify(val));
        // this.storage.set(this.config.L1.name + this.config.build, JSON.stringify(val));
    }

    toggleBookmark(entry) {
        let i = this.bookmarks.value.indexOf(entry)
        let bookmarks;
        if (i > -1) {
            bookmarks = this.bookmarks.value
            bookmarks.splice(i, 1)
        } else if (i < 0) {
            bookmarks = this.bookmarks.value.concat([entry])
        }
        this.setBookmarks(bookmarks)
    }

}