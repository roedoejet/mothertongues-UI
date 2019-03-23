import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DictionaryData } from '../../app/models';
import { MTDService } from '../../app/mtd.service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class Search {
  entries: DictionaryData[];
  matches: DictionaryData[];
  partMatches: DictionaryData[];
  maybeMatches: DictionaryData[];
  searchQuery: string = '';

  constructor(public navCtrl: NavController, private mtdService: MTDService) {
    this.entries = this.mtdService.dataDict_value
  }

  getL2() {
    var results = []
    var re = new RegExp(this.searchQuery, 'i')
    for (let entry of this.entries) {
      if (re.test(entry.definition)) {
        results.push(entry)
      }
    }
    let sorted_answers = results.sort(function (a, b) {
      return a["definition"].length - b["definition"].length;
    });
    return (sorted_answers.slice(0, 9))
  };

  // Get English and target results
  getResults() {
    if (this.searchQuery.length > 1) {
      let english = this.getL2();
      let target = window["searchL1"](this.searchQuery)
      let matches = [];
      let partMatches = [];
      let maybeMatches = [];
      var populateEng = function () {
        for (let result of english) {
          var entry = result
          entry.type = "L2";
          matches.push(entry);
        }
      }

      var populateTarget = function () {
        for (let result of target) {
          var entry = result[1]
          if (entry.distance === 0) {
            entry.type = "L1";
            matches.push(entry);
          }

          if (entry.distance <= 1 && entry.distance > 0) {
            entry.type = "L1";
            partMatches.push(entry);
          }

          if (entry.distance <= 2 && entry.distance > 1) {
            entry.type = "L1";
            maybeMatches.push(entry);
          }
        }
      }
      
      populateEng();
      populateTarget();
      this.matches = matches;
      this.partMatches = partMatches;
      this.maybeMatches = maybeMatches;
    }
  };

}
