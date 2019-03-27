import { Component } from '@angular/core';
import { BookmarkService } from '../../app/bookmark.service'
import { MTDService } from '../../app/mtd.service'
import { DictionaryData } from '../../app/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html'
})

export class Browse {

  currentEntries$: BehaviorSubject<DictionaryData[]>;
  currentTen$: Observable<DictionaryData[]>;
  displayCategories$: Observable<any>;
  displayLetters$: Observable<string[]>;
  letters: string[];
  initialLetters: string[];
  selectedCategory: string = "words";
  selectedLetter: string;
  startIndex: number = 0;

  // currentBrowsingLetter: String = this.letters[this.currentBrowsingEntries[0].sorting_form[0]];
  letterSelectOptions: Object = { header: "Select a Letter" };
  categorySelectOptions: Object = { header: "Select a Category" };

  constructor(public bookmarkService: BookmarkService, private mtdService: MTDService) {
    this.displayCategories$ = this.mtdService.category_keys$
    this.currentEntries$ = new BehaviorSubject<DictionaryData[]>(this.mtdService.dataDict_value);
    // this.letters = this.mtdService.config_value.L1.lettersInLanguage;
    this.mtdService.dataDict$.subscribe((x) => {
      this.currentEntries$.next(x);
      this.initializeEntries();
    })
    this.currentTen$ = this.getTenFrom(0)
    this.initializeEntries();
  }

  getTenFrom(i) {
    return this.currentEntries$.asObservable().pipe(
      map((x) => x.slice(i, 10))
    )
  }

  initializeEntries() {
    // Add letter index to first words of that letter in entries
    this.letterInit()
  }

  // Determine whether letter occurs word-initially
  letterInit() {
    this.letters = this.mtdService.config_value.L1.lettersInLanguage;
    this.displayLetters$ = this.currentEntries$.pipe(
      map((entries) => {
        let newLetters = [];
        for (let letter of this.letters) {
          let ind = this.letters.indexOf(letter)
          for (let entry of entries) {
            if (entry.sorting_form[0] === ind) {
              entry.firstWordIndex = ind;
              newLetters.push(letter)
              break;
            }
          }
        }
        return newLetters;
      })
    )

  }
  // Scroll to previous 10 entries
  prev10() {
    if (this.startIndex - 10 > 0) {
      this.startIndex -= 10
    } else {
      this.startIndex = 0
    }
    this.currentTen$ = this.getTenFrom(this.startIndex)
  }

  // Scroll to next 10 entries
  next10() {
    if (this.startIndex + 10 < this.currentEntries$.getValue().length) {
      this.startIndex += 10
      this.currentTen$ = this.getTenFrom(this.startIndex)
    } else {
      this.startIndex = this.currentEntries$.getValue().length - 10
      this.currentTen$ = this.getTenFrom(this.startIndex)
    }
  }

  // Scroll to letter
  // Still needed: change selected letter dynamically
  scrollTo(letter: string) {
    let letterIndex = this.letters.indexOf(letter)
    for (let entry of this.currentEntries$.getValue()) {
      if (entry.firstWordIndex === letterIndex) {
        this.startIndex = this.currentEntries$.getValue().indexOf(entry)
        this.currentTen$ = this.getTenFrom(this.startIndex)
        break;
      }
    }
  }

  selectCategory(category: string) {
    this.currentEntries$.next(this.mtdService.categories$[category]);
    this.currentTen$ = this.getTenFrom(0)
    this.letterInit()
  }
}