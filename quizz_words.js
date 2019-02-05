function loadData(wordsFileContent) {
  console.log('Loading words...')
  var lines = wordsFileContent.split("\n");
  lines.shift() // remove header

  var words = []
  for (i in lines) {
    var parts = lines[i].split(',')
    var word = {
      eng: parts[0],
      farsi: parts[1]
    }
    words.push(word)
  }
  return words
}

var currentAnswer

function question(words) {
  // pick word
  var wordIdx = Math.floor(Math.random() * Math.floor(words.length));
  var word = words[wordIdx]
  currentAnswer = word.eng
  return word.farsi
}

function answer() {
  return [currentAnswer]
}

if (typeof module != 'undefined') { // nodejs compatibility
  module.exports.loadData = loadData
  module.exports.question = question
  module.exports.answer = answer
}