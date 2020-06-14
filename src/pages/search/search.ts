import { Component } from "@angular/core";

import { NavController } from "ionic-angular";

import { EntryList } from "../shared/entry-list.component";

import { Entry } from "../shared/entry.model";

import { MTDInfo } from "../../app/global";

import { slugify } from "transliteration";

@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class Search {
  entries: Entry[] = MTDInfo.allEntries;
  matches: Entry[];
  partMatches: Entry[];
  maybeMatches: Entry[];
  searchQuery: string = "";
  matchThreshold = 0;
  partialThreshold = 1;
  maybeThreshold = 2;
  constructor(public navCtrl: NavController) {}

  getRegex(re, key = "definition") {
    var results = [];
    for (let entry of this.entries) {
      if (re.test(entry[key])) {
        results.push(entry);
      }
    }
    let sorted_answers = results.sort(function(a, b) {
      return a[key].length - b[key].length;
    });
    return sorted_answers.slice(0, 9);
  }

  getRegexFromSlug(re, key = "word") {
    var results = [];
    for (let entry of this.entries) {
      if (re.test(slugify(entry[key]))) {
        results.push(entry);
      }
    }
    let sorted_answers = results.sort(function(a, b) {
      return a[key].length - b[key].length;
    });
    return sorted_answers.slice(0, 9);
  }

  // Results are sourced from multiple places and ordered accordingly:
  // 1. Exact Regex match (L1 || L2)
  // 2. Partial Regex match (L1 || L2)
  // 3. Exact match on slugified form
  // 4. levenstein on display form || levenstein on compare form
  // The first two are mutually exclusive due to complementary regular expressions
  // The third must be added only if the first two have not found the matches
  getResults() {
    if (this.searchQuery.length > 1) {
      // Normalize
      let mtd = window["mtd"];
      let searchQuery = mtd.convertQuery(this.searchQuery);
      // 1. Exact match
      let searchQueryRegex = new RegExp(
        `(\\s|^){1}${searchQuery}(?=([;.?!\\s]|$))`,
        "i"
      );
      let l1Exact = this.getRegex(searchQueryRegex, "word");
      let l2Exact = this.getRegex(searchQueryRegex);
      // 2. Partial match
      let searchQueryPartialRegex = new RegExp(
        `(^${searchQuery}(?=[\\S])|(?<=\\S)${searchQuery}|(?<=\\s)${searchQuery}(?!\\s))`,
        "i"
      );
      let l1Partial = this.getRegex(searchQueryPartialRegex, "word");
      let l2Partial = this.getRegex(searchQueryPartialRegex);
      // 3. Partial match on slugified form
      let l1PartialSlug = this.getRegexFromSlug(
        new RegExp(
          searchQueryPartialRegex.source + "|" + searchQueryRegex.source,
          "i"
        )
      );
      // 4. levenstein (includes compare form and display)
      let target = window["searchL1"](searchQuery);
      // Match containers
      let allMatches = [];
      let matches = [];
      let partMatches = [];
      let maybeMatches = [];

      // Collect l1Exact matches and add to allMatches
      var populateL1Exact = () => {
        for (let result of l1Exact) {
          var entry = result;
          entry.type = "L1";
          entry.distance = this.matchThreshold;
          allMatches.push(entry);
        }
      };

      // Collect l2Exact matches and add to allMatches
      var populateL2Exact = () => {
        for (let result of l2Exact) {
          var entry = result;
          entry.type = "L2";
          entry.distance = this.matchThreshold;
          allMatches.push(entry);
        }
      };

      // Collect l1Partial matches and add to allMatches
      var populateL1Partial = () => {
        for (let result of l1Partial.concat(l1PartialSlug)) {
          var entry = result;
          entry.type = "L1";
          entry.distance = this.partialThreshold;
          allMatches.push(entry);
        }
      };

      // Collect l2Partial matches and add to allMatches
      var populateL2Partial = () => {
        for (let result of l2Partial) {
          var entry = result;
          entry.type = "L2";
          entry.distance = this.partialThreshold;
          allMatches.push(entry);
        }
      };

      var populateTarget = () => {
        for (let result of target) {
          var entry = result[1];
          entry.type = "L1";
          if (
            allMatches.findIndex(
              match =>
                match.word === entry.word &&
                match.definition === match.definition
            ) === -1
          ) {
            allMatches.push(entry);
          }
        }
      };

      var mergeMatches = () => {
        for (let entry of allMatches) {
          if ("distance" in entry) {
            if (entry.distance === this.matchThreshold) {
              matches.push(entry);
            } else if (
              "distance" in entry &&
              entry.distance <= this.partialThreshold &&
              entry.distance > this.matchThreshold
            ) {
              partMatches.push(entry);
            } else if (
              entry.distance <= this.matchThreshold &&
              entry.distance > this.partialThreshold
            ) {
              maybeMatches.push(entry);
            }
          } else {
            matches.push(entry);
          }
        }
      };
      populateL1Exact();
      populateL2Exact();
      populateL1Partial();
      populateL2Partial();
      populateTarget();
      allMatches = allMatches.filter(
        (match, index, self) =>
          self.findIndex(
            t => t.word === match.word && t.definition === match.definition
          ) === index
      );
      mergeMatches();
      this.matches = matches;
      this.partMatches = partMatches;
      this.maybeMatches = maybeMatches;
    }
  }
}
