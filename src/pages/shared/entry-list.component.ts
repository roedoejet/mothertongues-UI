import { Component, Input, OnChanges } from "@angular/core";

import { NavController, ViewController, ModalController } from "ionic-angular";

import { Entry } from "./entry.model";

import { WordModal } from "./word-modal.component";

import { slugify } from "transliteration";

var levenstein = function(string1, string2) {
  var a = string1,
    b = string2 + "",
    m = [],
    i,
    j,
    min = Math.min;

  if (!(a && b)) return (b || a).length;

  for (i = 0; i <= b.length; m[i] = [i++]);
  for (j = 0; j <= a.length; m[0][j] = j++);

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      m[i][j] =
        b.charAt(i - 1) == a.charAt(j - 1)
          ? m[i - 1][j - 1]
          : (m[i][j] = min(
              m[i - 1][j - 1] + 1,
              min(m[i][j - 1] + 1, m[i - 1][j] + 1)
            ));
    }
  }

  return m[b.length][a.length];
};

@Component({
  selector: "entry-list",
  templateUrl: "entry-list.component.html"
})
export class EntryList implements OnChanges {
  pageName: string;
  edit: boolean = false;

  @Input() parentEdit: boolean;
  @Input() entries: Entry[];
  @Input() searchterm: string;
  @Input() threshold: number;
  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    public modalCtrl: ModalController
  ) {
    this.pageName = this.viewCtrl.name;
  }

  trackByFn(index, item) {
    return item.entryID;
  }

  showModal(clicked_entry) {
    let wordModal = this.modalCtrl.create(WordModal, { entry: clicked_entry });
    wordModal.present();
  }

  highlight(entry, langType) {
    // TODO: this cannot properly deal with multi-word inputs.
    let text;
    if (langType === "L1") {
      text = entry.word;
    } else if (langType === "L2") {
      text = entry.definition;
    }
    if (!this.searchterm) {
      return text;
    }
    if (langType === "L1") {
      // if normalized, lower case search term matches word, return that, wrapped in <span>
      // else if compare form is < 2 distance, wrap that in <span>
      const mtd = window["mtd"];
      let normTransducerName = "norm";
      if ("norm_composite" in mtd.transducers) {
        normTransducerName = "norm_composite";
      }
      let compareTransducerName = "compare";
      if ("compare_composite" in mtd.transducers) {
        compareTransducerName = "compare_composite";
      }
      // initial terms
      const searchTerm = mtd
        .transduce(this.searchterm, normTransducerName)
        .toLowerCase();
      const normText = mtd.transduce(text, normTransducerName).toLowerCase();
      const normSearchTermPattern = new RegExp(searchTerm, "gi");

      // Match norm against text
      let match;
      if (text.match(normSearchTermPattern)) {
        let highlightIndices = [];
        while ((match = normSearchTermPattern.exec(text))) {
          highlightIndices.push([match.index, normSearchTermPattern.lastIndex]);
        }
        highlightIndices.reverse();
        let newText = text;
        for (let i = 0; i < highlightIndices.length; i++) {
          let beforeMatch = newText.substring(0, highlightIndices[i][0]);
          let startMatchWrapper = '<span class="langMatched">';
          let match = newText.substring(
            highlightIndices[i][0],
            highlightIndices[i][1]
          );
          let endMatchWrapper = "</span>";
          let afterMatch = newText.substring(
            highlightIndices[i][1],
            newText.length
          );
          newText =
            beforeMatch +
            startMatchWrapper +
            match +
            endMatchWrapper +
            afterMatch;
        }
        return newText;
      }
      // Match norm against slugified text
      const slugText = slugify(entry.word);
      // Match norm against slug. Lengths of text and slugText must be the same to work properly
      let slugMatch;
      if (
        slugText.match(normSearchTermPattern) &&
        slugText.length === text.length
      ) {
        let highlightIndices = [];
        while ((slugMatch = normSearchTermPattern.exec(slugText))) {
          highlightIndices.push([
            slugMatch.index,
            normSearchTermPattern.lastIndex
          ]);
        }
        highlightIndices.reverse();
        let newText = text;
        for (let i = 0; i < highlightIndices.length; i++) {
          let beforeMatch = newText.substring(0, highlightIndices[i][0]);
          let startMatchWrapper = '<span class="langMatched">';
          let slugMatch = newText.substring(
            highlightIndices[i][0],
            highlightIndices[i][1]
          );
          let endMatchWrapper = "</span>";
          let afterMatch = newText.substring(
            highlightIndices[i][1],
            newText.length
          );
          newText =
            beforeMatch +
            startMatchWrapper +
            slugMatch +
            endMatchWrapper +
            afterMatch;
        }
        return newText;
      }
      // Match norm against compare text
      let compareText = entry.word;
      if ("compare_form" in entry) {
        compareText = entry.compare_form;
      }
      compareText = compareText.toLowerCase();
      // Match lev distance between norm or compare on single word
      if (
        levenstein(normText, searchTerm) <= this.threshold ||
        levenstein(compareText, searchTerm) <= this.threshold ||
        levenstein(slugText, searchTerm) <= this.threshold
      ) {
        return `<span class="langMatched">${text}</span>`;
      }

      // match lev distance between word and sentence matches
      if (text.indexOf(" ") !== -1 && searchTerm.indexOf(" ") < 0) {
        // highlight lowest distance word if search is single word and text is sentence
        const words = text.split(" ");
        const normWords = words.map(x =>
          mtd.transduce(x, normTransducerName).toLowerCase()
        );
        const normWordsDistances = normWords.map(x =>
          levenstein(x, searchTerm)
        );
        const normMinIndex = normWordsDistances.indexOf(
          Math.min(...normWordsDistances)
        );
        if (normWordsDistances[normMinIndex] <= this.threshold) {
          words[
            normMinIndex
          ] = `<span class="langMatched">${words[normMinIndex]}</span>`;
          return words.join(" ");
        }
        // else look at compare
        const compareWords = words.map(x =>
          mtd.transduce(x, compareTransducerName).toLowerCase()
        );
        const compareWordsDistances = compareWords.map(x =>
          levenstein(x, searchTerm)
        );
        const compareMinIndex = compareWordsDistances.indexOf(
          Math.min(...compareWordsDistances)
        );
        if (compareWordsDistances[compareMinIndex] <= this.threshold) {
          words[
            compareMinIndex
          ] = `<span class="langMatched">${words[compareMinIndex]}</span>`;
          return words.join(" ");
        }
        // else look at slugified
        const slugWords = words.map(x => slugify(x));
        const slugWordsDistances = slugWords.map(x =>
          levenstein(x, searchTerm)
        );
        const slugMinIndex = slugWordsDistances.indexOf(
          Math.min(...slugWordsDistances)
        );
        if (slugWordsDistances[slugMinIndex] <= this.threshold) {
          words[
            slugMinIndex
          ] = `<span class="langMatched">${words[slugMinIndex]}</span>`;
          return words.join(" ");
        }
      }
      // Last resort, just highlight the whole thing if it doesn't already match L2
      const l2Pattern = new RegExp(this.searchterm, "gi");
      if (!l2Pattern.test(entry.definition)) {
        return `<span class="langMatched">${text}</span>`;
      } else {
        return `<span>${text}</span>`;
      }
    } else if (langType === "L2") {
      return text.replace(
        new RegExp(this.searchterm, "gi"),
        '<span class="langMatched">$&</span>'
      );
    } else {
      return text;
    }
  }

  ngOnChanges() {
    this.edit = this.parentEdit;
  }
}
