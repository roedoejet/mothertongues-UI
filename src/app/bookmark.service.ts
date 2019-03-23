import { Injectable } from "@angular/core";
import { MTDInfo } from './global'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Storage } from '@ionic/storage';
import { MTDService } from './mtd.service'
import { Config, DictionaryData } from './models'

import { uniq } from 'lodash';

@Injectable()
export class BookmarkService {
    public bookmarks = new BehaviorSubject<DictionaryData[]>([]);
    categories: Object = {};
    config: Config;
    constructor(public storage: Storage, private mtdService: MTDService) {
        this.config = this.mtdService.config_value

        this.mtdService.allAudioEntries$.subscribe(
            (allAudioEntries) => {
                if (allAudioEntries.length > 0 && allAudioEntries.length < (mtdService.dataDict_value.length * .5)) {
                    this.categories["audio"] = {};
                    this.categories["audio"] = allAudioEntries;
                }
            }
        )

        this.mtdService.dataDict$.subscribe(
            (allEntries) => {
                for (let key of MTDInfo.dataKeys) {
                    this.categories[key] = allEntries.filter(x => x['source'] == key)
                }

                let semantic_categories = uniq(allEntries.map(entry => {
                    if (entry.theme) {
                        entry.theme = entry.theme.toLowerCase()
                    }
                    return entry.theme
                })).sort()

                for (let cat of semantic_categories) {
                    if (cat) {
                        this.categories[cat] = allEntries.filter(entry => entry.theme === cat)
                    }
                }
                console.log(this.categories)

            }
        )

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