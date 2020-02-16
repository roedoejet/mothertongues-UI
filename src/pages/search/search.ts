import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { EntryList } from '../shared/entry-list.component';

import { Entry } from '../shared/entry.model';

import { MTDInfo } from '../../app/global';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class Search {
  entries: Entry[] = MTDInfo.allEntries;
  matches: Entry[];
  partMatches: Entry[];
  maybeMatches: Entry[];
  searchQuery: string = '';

  constructor(public navCtrl: NavController) {
  }

  getRegex(key = 'definition') {
    var results = []
    var re = new RegExp(this.searchQuery, 'i')
    for (let entry of this.entries) {
      if (re.test(entry[key])) {
        results.push(entry)
      }
    }
    let sorted_answers = results.sort(function (a, b) {
      return a[key].length - b[key].length;
    });
    return (sorted_answers.slice(0, 9))
  };

  // Get English and target results
  getResults() {
    if (this.searchQuery.length > 1) {
      let english = this.getRegex();
      let exact = this.getRegex('word')
      let target = window["searchL1"](this.searchQuery)
      let allMatches = [];
      let matches = [];
      let partMatches = [];
      let maybeMatches = [];
      var populateEng = function () {
        for (let result of english) {
          var entry = result
          entry.type = "L2";
          entry.distance = 0;
          allMatches.push(entry);
        }
      }

      var populateExact = function () {
        for (let result of exact) {
          var entry = result;
          entry.type = "L1";
          entry.distance = 0;
          allMatches.push(entry)
        }
      }

      var populateTarget = function () {
        for (let result of target) {
          var entry = result[1]
          entry.type = "L1";
          if (allMatches.findIndex(match => match.word === entry.word && match.definition === match.definition) === -1) {
            allMatches.push(entry)
          }
        }
      }

      var mergeMatches = function () {
        for (let entry of allMatches) {
          if ('distance' in entry) {
            if (entry.distance === 0) {
              matches.push(entry);
            } else if ('distance' in entry && entry.distance <= 1 && entry.distance > 0) {
              partMatches.push(entry);
            } else if (entry.distance <= 2 && entry.distance > 1) {
              maybeMatches.push(entry);
            }
          } else {
            matches.push(entry)
          }
        }
      }

      populateExact();
      populateEng();
      populateTarget();
      allMatches = allMatches.filter((match, index, self) => self.findIndex(t => t.word === match.word && t.definition === match.definition) === index)
      mergeMatches();
      this.matches = matches;
      this.partMatches = partMatches;
      this.maybeMatches = maybeMatches;
    }
  };

}
