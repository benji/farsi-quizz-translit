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
  return words
}

wordquizz.currentAnswer

wordquizz.question = function (words) {
  // pick word
  var wordIdx = Math.floor(Math.random() * Math.floor(words.length));
  var word = words[wordIdx]
  wordquizz.currentAnswer = word.eng
  return word.farsi
}

wordquizz.answer = function () {
  return [wordquizz.currentAnswer]
}

if (typeof module != 'undefined') { // nodejs compatibility
  module.exports = wordquizz
}