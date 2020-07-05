// Mother Tongues UI
// Copyright (C) 2016  Aidan Pine

/* Setup an "mtd" object that holds transducers. */
"use strict";

var mtd = {};

mtd.transducers = {};

if (config) {
  if ("L1" in config) {
    if ("transducers" in config.L1) {
      for (var j = 0; j < Object.keys(config.L1.transducers).length; j++) {
        var transducer_name = Object.keys(config.L1.transducers)[j];
        if (transducer_name.endsWith("composite")) {
          mtd.transducers[transducer_name] = createCompositeTransducer(
            Object.keys(config.L1.transducers[transducer_name])
          );
          for (
            var k = 0;
            k < Object.keys(config.L1.transducers[transducer_name]).length;
            k++
          ) {
            var comp_trans_name = Object.keys(
              config.L1.transducers[transducer_name]
            )[k];
            mtd.transducers[comp_trans_name] = createTransducer(
              config.L1.transducers[transducer_name][comp_trans_name]
            );
          }
        } else {
          mtd.transducers[transducer_name] = createTransducer(
            config.L1.transducers[transducer_name]
          );
        }
      }
    }
  }
}

function createCompositeTransducer(orth_names) {
  return (function () {
    var orths = orth_names;
    return function (str) {
      for (var i = 0; i < orths.length; i++) {
        var transducer = mtd.transducers[orths[i]];
        str = transducer(str);
      }
      return str;
    };
  })();
}

function createTransducer(cors) {
  if (cors.length > 0) {
    return (function () {
      var correspondences = {};
      for (var i = 0; i < cors.length; i++) {
        var key = Object.keys(cors[i])[0];
        correspondences[key] = cors[i][key];
      }
      function getKeys(x) {
        return Object.keys(x)[0];
      }
      var keys = cors.map(getKeys);
      var regex = new RegExp("(" + keys.join("|") + ")", "g");
      return function (str) {
        return str.replace(regex, function (a, b) {
          return correspondences[a];
        });
      };
    })();
  } else {
    console.warn('Warning: One of your transducers is null!')
    return (function () { return function (str) { return str } })();
  }
}

mtd.transduce = function (str, transducerName) {
  if (transducerName in mtd.transducers) {
    var transducer = mtd.transducers[transducerName];
    return transducer(str);
  } else {
    //     console.log("Transducer with name " + transducerName + " was not found.");
    return str;
  }
};

var l1NormTransducer = null;

mtd.convertQuery = function (str) {
  if (l1NormTransducer === null) {
    if ("norm_composite" in mtd.transducers) {
      l1NormTransducer = "norm_composite";
    } else if ("norm" in mtd.transducers) {
      l1NormTransducer = "norm";
    }
  }
  if (l1NormTransducer) {
    return mtd.transduce(str, l1NormTransducer);
  } else {
    return str;
  }
};
