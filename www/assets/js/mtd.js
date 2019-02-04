// Mother Tongues UI
// Copyright (C) 2016  Aidan Pine

/* Setup an "mtd" object that holds transducers. */
'use strict';

var mtd = {}

mtd.transducers = {};

mtd.transduce = function (str, transducerName) {
    if (transducerName in mtd.transducers) {
        var transducer = mtd.transducers[transducerName];
        return transducer(str);
    } else {
        console.log('Transducer with name ' + transducerName + " was not found.")
        return str;
    }
};

mtd.convertQuery = function (str, lang, orthType) {
    var orths = config[lang][orthType];
    return mtd.transduce(str, orths);
};