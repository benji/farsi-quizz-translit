if (process.argv.length < 5) {
  console.log(process.argv)
  console.log('Args: <quizz_type> <dict> <farsi2english true/false>')
  return
}

var fs = require('fs');
var readline = require('readline');

var quizz_type = process.argv[2]
var quizz_dict = process.argv[3]
var quizz_far2en = process.argv[4]
console.log('Quizz: ' + quizz_type)

var quizz = require('./src/quizz_' + quizz_type)

var data = fs.readFileSync('dicts/' + quizz_dict + '.txt').toString()

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var items = quizz.loadData(data)
//console.log(items)

console.log('Initialization complete.')
console.log('Please press enter to start...')
console.log('')

var questionOrAnswer = true
rl.on('line', function () {
  questionOrAnswer ?
    process.stdout.write(quizz.question(items, quizz_far2en == 'true').join(' ; ')) : console.log(quizz.answer().join(' ; '))
  questionOrAnswer = !questionOrAnswer
})