// Mother Tongues UI
// Copyright (C) 2016  Aidan Pine
'use strict';

if (typeof (String.prototype.trim) === "undefined") {
    String.prototype.trim = function () {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}


function makeLinkSafe(entryID) {
    return entryID.replace(" ", "+");
}

var allEntries = [];

function getAllEntries() {
    if (allEntries.length > 0) {
        return allEntries;
    } else {
        allEntries = dataDict
        return allEntries;
    }
}

function getAllEntriesByValue() {
    var allEntriesValues = allEntries.slice(0);
    if (allEntriesValues.length > 0) {
        return allEntriesValues;
    } else {
        allEntriesValues = dataDict
        return allEntriesValues;
    }
}

var allWords = []

function getAllWords() {
    if (allWords.length > 0) {
        return allWords;
    }
    Array.prototype.forEach.call(dataDict, function (entry) {
        if (entry["source"] === 'words') {
            allWords.push(entry);
        }
    });
    return allWords;
}

var audioEntries = [];


function getAllAudioEntries() {
    if (audioEntries.length > 0) {
        return audioEntries;
    }
    Array.prototype.forEach.call(dataDict, function (entry) {
        if (entry["audio"]) {
            audioEntries.push(entry);
        }
    });
    return audioEntries;
}