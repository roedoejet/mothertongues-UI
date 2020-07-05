// mtd Mobile
// Copyright (C) 2016  Aidan Pine
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU Affero General Public License as published
//    by the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//        but WITHOUT ANY WARRANTY; without even the implied warranty of
//        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//        GNU Affero General Public License for more details.
//
//        You should have received a copy of the GNU Affero General Public License
//        along with this program.  If not, see //<http://www.gnu.org/licenses/>.
"use strict";

// get the distances

var l1SearchAlg = null;
var l1SearchAlgWord = null;

function searchL1(query_value) {
  if (l1SearchAlg === null || l1SearchAlgWord) {
    l1SearchAlg = distanceCalculator(getAllEntries());
    l1SearchAlgWord = distanceCalculatorWord(getAllEntries());
  }
  query_value = query_value.toLowerCase();
  // Case for multi-word query
  if (query_value.indexOf(" ") >= 0) {
    var query_array = query_value.split(" ");
    var result_container = [];
    for (var i = 0; i < query_array.length; i++) {
      var needle = mtd.convertQuery(query_array[i]);
      result_container = result_container.concat(l1SearchAlg(needle));
    }
    return result_container;
    // Case for single-word query
  } else {
    // Find lev distance on compare form
    var needle = mtd.convertQuery(query_value);
    var compare_results = l1SearchAlg(needle);
    // Weight them lower than exact word matches (weight = 0.5)
    for (var i = 0; i < compare_results.length; i++) {
      compare_results[i][1].distance += 0.5;
    }
    // Find lev distance on display form
    var word_results = l1SearchAlgWord(needle);

    var results = [];
    if (compare_results.length > 0) {
      var word_result_keys = [];
      for (var i = 0; i < word_results.length; i++) {
        word_result_keys.push(word_results[i].word);
      }
      // Add the compare result only if it doesn't exist as display form match
      for (var i = 0; i < compare_results.length; i++) {
        if (!(compare_results[i]["word"] in word_result_keys)) {
          results.push(compare_results[i]);
        }
      }
      results = results.concat(compare_results);
    } else {
      results = word_results;
    }
    return results;
  }
}

function shuffle(array) {
  var tmp,
    current,
    top = array.length;

  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

  return array;
}

function getRandom10() {
  var entries = shuffle(getAllEntriesByValue()); // shuffle entries
  return entries.slice(0, 10);
}

function get10(entries, startIndex) {
  return entries.slice(startIndex, startIndex + 10);
}

function get1(entries, startIndex) {
  return entries.slice(startIndex, startIndex + 1);
}
