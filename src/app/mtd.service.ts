import { Injectable } from "@angular/core";
import { MTDInfo } from "./global";
import { Entry } from "../pages/shared/entry.model";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Storage } from "@ionic/storage";

@Injectable()
export class MTDService {
  public bookmarks = new BehaviorSubject<Entry[]>([]);
  categories: Object = {};
  constructor(public storage: Storage) {
    if (
      MTDInfo.allAudioEntries.length > 0 &&
      MTDInfo.allAudioEntries.length < MTDInfo.allEntries.length * 0.5
    ) {
      this.categories["audio"] = {};
      this.categories["audio"] = MTDInfo.allAudioEntries;
    }

    for (let key of MTDInfo.dataKeys) {
      this.categories[key] = MTDInfo.dataDict.filter(x => x["source"] == key);
    }

    let semantic_categories = {};

    MTDInfo.allEntries.forEach(entry => {
      if (entry.theme) {
        let formattedTheme = this.formatTheme(entry.theme);
        if (!(formattedTheme in semantic_categories)) {
          semantic_categories[formattedTheme] = [];
        }
        if (
          "secondary_theme" in entry &&
          entry.secondary_theme &&
          entry.theme
        ) {
          let formattedSecondaryTheme = this.formatSecondaryTheme(
            entry.theme,
            entry.secondary_theme
          );
          if (
            semantic_categories[formattedTheme].indexOf(
              formattedSecondaryTheme
            ) < 0
          ) {
            semantic_categories[formattedTheme].push(formattedSecondaryTheme);
          }
        }
      }
    });
    // sort themes
    let ordered_categories = [];
    Object.keys(semantic_categories)
      .sort()
      .forEach(key => {
        ordered_categories.push(key);
        ordered_categories = ordered_categories.concat(
          semantic_categories[key].sort()
        );
      });
    for (let cat of ordered_categories) {
      if (cat) {
        this.categories[cat] = MTDInfo.allEntries.filter(
          entry =>
            this.formatTheme(entry.theme) === cat ||
            this.formatSecondaryTheme(entry.theme, entry.secondary_theme) ===
              cat
        );
      }
    }
  }

  formatTheme(theme) {
    if (theme) {
      return theme.charAt(0).toUpperCase() + theme.slice(1);
    } else {
      return "";
    }
  }

  formatSecondaryTheme(theme, secondary_theme) {
    if (theme && secondary_theme) {
      return this.formatTheme(theme) + " / " + secondary_theme.toLowerCase();
    } else {
      return "";
    }
  }

  setBookmarks(val) {
    this.bookmarks.next(val);
    this.storage.set(
      MTDInfo.config.L1.name + MTDInfo.config.build,
      JSON.stringify(val)
    );
  }

  toggleBookmark(entry) {
    let i = this.bookmarks.value.indexOf(entry);
    let bookmarks;
    if (i > -1) {
      bookmarks = this.bookmarks.value;
      bookmarks.splice(i, 1);
    } else if (i < 0) {
      bookmarks = this.bookmarks.value.concat([entry]);
    }
    this.setBookmarks(bookmarks);
  }
}
