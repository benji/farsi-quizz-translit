var quizzutils;

if (typeof module != "undefined") {
  // nodejs compatibility
  if (quizzutils) {
  } else quizzutils = require("./quizzutils");
}

var wordquizz = {};

wordquizz.loadData = function(wordsFileContent) {
  console.log("Loading words...");
  var lines = wordsFileContent.split("\n");
  lines.shift(); // remove header

  var words = [];
  for (i in lines) {
    if (!lines[i] || lines[i][0] == "#") continue;

    var parts = lines[i].split(",");
    var word = {
      eng: parts[0],
      farsi: parts[1]
    };
    words.push(word);
  }

  words = quizzutils.shuffle(words);
  return words;
};

wordquizz.currentAnswer;
wordquizz.currentIdx = 0;

var unicodeRegex = /^\\u([0-9A-Fa-f]{4})$/;
var connectchar = String.fromCharCode("1600");

function prepare(s) {
  var match = unicodeRegex.exec(s);
  while (match != null) {
    var l = String.fromCharCode(parseInt(match[1], 16));
    return [l, l + connectchar, connectchar + l + connectchar, connectchar + l];
  }
  return s.split(" - ");
}

wordquizz.question = function(words, far2eng) {
  var word = words[wordquizz.currentIdx++ % words.length];

  var isFarsiAlphabet = false;//unicodeRegex.test(word.farsi);

  var eng = prepare(word.eng);
  var farsi = prepare(word.farsi);

  if (far2eng) {
    wordquizz.currentAnswer = eng;
    return isFarsiAlphabet
      ? [farsi[Math.floor(Math.random() * farsi.length)]]
      : farsi;
  } else {
    wordquizz.currentAnswer = farsi;
    return eng;
  }
};

wordquizz.answer = function() {
  return wordquizz.currentAnswer;
};

if (typeof module != "undefined") {
  // nodejs compatibility
  module.exports = wordquizz;
}
