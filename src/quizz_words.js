var quizzutils;

if (typeof module != "undefined") {
  // nodejs compatibility
  if (quizzutils) {
  } else quizzutils = require("./quizzutils");
}

var wordquizz = {};

wordquizz.loadData = function(wordsFileContent, randomize) {
  console.log("Loading words...");
  var lines = wordsFileContent.split("\n");
  lines.shift(); // remove header

  var words = [];
  for (i in lines) {
    if (!lines[i] || lines[i][0] == "#") continue;

    var parts = lines[i].split(",");
    if (parts.length<2 || parts.length>3) throw 'Invalid line '+lines[i]
    var word = {
      eng: parts[0],
      farsi: parts[1],
      p: parts.length > 2 ? parts[2] : null
    };
    words.push(word);
  }

  console.log("Randomizing: " + randomize);
  if (typeof randomize == "undefined" || randomize) {
    console.log("Randomizing...");
    words = quizzutils.shuffle(words);
  }
  return words;
};

wordquizz.currentAnswer;
wordquizz.currentIdx = 0;

var unicodeRegex = /^\\u([0-9A-Fa-f]{4})$/;
var connectchar = String.fromCharCode("1600");

function prepare(s) {
  var isFarsiAlphabet = unicodeRegex.test(s);
  if (isFarsiAlphabet) {
    var match = unicodeRegex.exec(s);
    var l = String.fromCharCode(parseInt(match[1], 16));
    
    return preparePersianLetters([
      "." + l + ".",
      l + connectchar,
      connectchar + l + connectchar,
      connectchar + l
    ]);
  }

  if (_isFarsiWord(s)) {
    return [preparePersianText(s, 0)];
  }

  return s.split(" - ");
}

function preparePersianText(t, fontid) {
  return (
    '<span class="persian-font persian-font' + fontid + '">' + t + "</span>"
  );
}

function preparePersianLetters(letters) {
  for (var i = 0; i < letters.length; i++) {
    letters[i] =
      preparePersianText(letters[i], 4) +
      preparePersianText(letters[i], 3) +
      preparePersianText(letters[i], 2) +
      preparePersianText(letters[i], 1);
  }
  return letters
}

function _isFarsiWord(w) {
  // simplified
  return w.charCodeAt(0) >= 1570;
}

wordquizz.question = function(words, far2eng) {
  var word = words[wordquizz.currentIdx++ % words.length];

  var eng = prepare(word.eng);
  var farsi = prepare(word.farsi);

  wordquizz.currentAnswer = far2eng ? eng : farsi;
  if (word.p) wordquizz.currentAnswer.push(word.p);

  return far2eng ? farsi : eng;
};

wordquizz.answer = function() {
  return wordquizz.currentAnswer;
};

if (typeof module != "undefined") {
  // nodejs compatibility
  module.exports = wordquizz;
}
