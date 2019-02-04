import { Injectable } from "@angular/core";
import { MTDInfo } from './global'
import { Entry } from '../pages/shared/entry.model'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Storage } from '@ionic/storage';

import { uniq } from 'lodash';

@Injectable()
export class MTDService {
    public bookmarks = new BehaviorSubject<Entry[]>([]);
    categories: Object = {};
    constructor(public storage: Storage) {
        if (MTDInfo.allAudioEntries.length > 0 && MTDInfo.allAudioEntries.length < (MTDInfo.allEntries.length * .5)) {
            this.categories["audio"] = {};
            this.categories["audio"] = MTDInfo.allAudioEntries;
        }

        for (let key of MTDInfo.dataKeys) {
            this.categories[key] = MTDInfo.dataDict.filter(x => x['source'] == key)
        }

        let semantic_categories = uniq(MTDInfo.allEntries.map(entry => {
            if (entry.theme) {
                entry.theme = entry.theme.toLowerCase()
            }
            return entry.theme
        })).sort()

        for (let cat of semantic_categories) {
            if (cat) {
                this.categories[cat] = MTDInfo.allEntries.filter(entry => entry.theme === cat)
            }
        }
        console.log(this.categories)
    }

    setBookmarks(val) {
        this.bookmarks.next(val)
        this.storage.set(MTDInfo.config.L1.name + MTDInfo.config.build, JSON.stringify(val));
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