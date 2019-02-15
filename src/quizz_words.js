var quizzutils

if (typeof module != 'undefined') { // nodejs compatibility
  if (quizzutils) {} else quizzutils = require('./quizzutils')
}

var wordquizz = {}

wordquizz.loadData = function (wordsFileContent) {
  console.log('Loading words...')
  var lines = wordsFileContent.split("\n");
  lines.shift() // remove header

  var words = []
  for (i in lines) {
    if (!(lines[i]) || lines[i][0] == '#') continue

    var parts = lines[i].split(',')
    var word = {
      eng: parts[0],
      farsi: parts[1]
    }
    words.push(word)
  }

  words = quizzutils.shuffle(words)
  return words
}

wordquizz.currentAnswer
wordquizz.currentIdx = 0

wordquizz.question = function (words, far2eng) {
  var word = words[wordquizz.currentIdx++ % words.length]

  if (far2eng) {
    wordquizz.currentAnswer = word.eng
    return [word.farsi]
  } else {
    wordquizz.currentAnswer = word.farsi
    return [word.eng]
  }
}

wordquizz.answer = function () {
  return [wordquizz.currentAnswer]
}

if (typeof module != 'undefined') { // nodejs compatibility
  module.exports = wordquizz
}