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
'use strict';



// get the distances

var l1SearchAlg = null;

function searchL1(query_value) {
    if (l1SearchAlg === null) {
        l1SearchAlg = distanceCalculator(getAllEntries());
    }
    query_value = query_value.toLowerCase();
    // Case for multi-word query
    if (query_value.indexOf(' ') >= 0) {
        var query_array = query_value.split(" ");
        var result_container = []
        for (var i = 0; i < query_array.length; i++) {
            var needle = mtd.convertQuery(query_array[i], "L1", "compare")
            result_container = result_container.concat(l1SearchAlg(needle))
        }
        return result_container
        // Case for single-word query
    } else {
        var needle = mtd.convertQuery(query_value, "L1", "compare");
        return l1SearchAlg(needle);
    }
}

function shuffle(array) {
    var tmp, current, top = array.length;

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
    var entries = shuffle(getAllEntries()); // shuffle entries
    return entries.slice(0, 10);
}

function get10(entries, startIndex) {
    return entries.slice(startIndex, startIndex + 10);
}

function get1(entries, startIndex) {
    return entries.slice(startIndex, startIndex + 1);
}

