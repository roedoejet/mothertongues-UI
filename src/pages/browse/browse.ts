import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookmarkService } from '../../app/bookmark.service'
import { MTDService } from '../../app/mtd.service'
import { DictionaryData } from '../../app/models';

@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html'
})

export class Browse {

  currentEntries: DictionaryData[] = window['dataDict'];
  currentTen: DictionaryData[] = window['get10'](window['dataDict'], 0);
  displayCategories: string[];
  displayLetters: string[];
  letters: string[];
  initialLetters: string[];
  selectedCategory: string = "words";
  selectedLetter: string;
  startIndex: number = 0;

  // currentBrowsingLetter: String = this.letters[this.currentBrowsingEntries[0].sorting_form[0]];
  letterSelectOptions: Object = { title: "Select a Letter" };
  categorySelectOptions: Object = { title: "Select a Category" };

  constructor(public navCtrl: NavController, public bookmarkService: BookmarkService, private mtdService: MTDService) {
    this.letters = this.mtdService.config_value.L1.lettersInLanguage;
    this.initializeEntries(bookmarkService);
  }

  initializeEntries(bookmarkService) {
    console.log(bookmarkService.categories)
    this.displayCategories = Object.keys(bookmarkService.categories);

    // Add letter index to first words of that letter in entries
    this.letterInit()
  }

  // Determine whether letter occurs word-initially
  letterInit() {
    let newLetters = [];
    for (let letter of this.letters) {
      let ind = this.letters.indexOf(letter)
      for (let entry of this.currentEntries) {
        if (entry.sorting_form[0] === ind) {
          entry.firstWordIndex = ind;
          newLetters.push(letter)
          break;
        }
      }
    }
    this.displayLetters = newLetters;
  }
  // Scroll to previous 10 entries
  prev10() {
    if (this.startIndex - 10 > 0) {
      this.startIndex -= 10
      this.currentTen = window['get10'](this.currentEntries, this.startIndex);
    } else {
      this.startIndex = 0
      this.currentTen = window['get10'](this.currentEntries, this.startIndex)
    }
  }

  // Scroll to next 10 entries
  next10() {
    if (this.startIndex + 10 < this.currentEntries.length) {
      this.startIndex += 10
      this.currentTen = window['get10'](this.currentEntries, this.startIndex)
    } else {
      this.startIndex = this.currentEntries.length - 10
      this.currentTen = window['get10'](this.currentEntries, this.startIndex)
    }
  }

  // Scroll to letter
  // Still needed: change selected letter dynamically
  scrollTo(letter: string) {
    let letterIndex = this.letters.indexOf(letter)
    for (let entry of this.currentEntries) {
      if (entry.firstWordIndex === letterIndex) {
        this.startIndex = this.currentEntries.indexOf(entry)
        this.currentTen = window['get10'](this.currentEntries, this.startIndex)
        break;
      }
    }
  }

  selectCategory(category: string) {
    this.currentEntries = this.bookmarkService.categories[category];
    this.currentTen = window['get10'](this.currentEntries, 0);
    this.letterInit()
  }
}