var fs = require('fs');
var readline = require('readline');

var quizz_type = process.argv[2]
console.log('Quizz: ' + quizz_type)

var quizz = require('./quizz_' + quizz_type)

var data = fs.readFileSync(quizz_type + '.txt').toString()

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var items = quizz.loadData(data)
console.log(items)

console.log('Initialization complete.')
console.log('Please press enter to start...')
console.log('')

var questionOrAnswer = true
rl.on('line', function () {
  questionOrAnswer ?
    process.stdout.write(quizz.question(items)) : console.log(quizz.answer().join(' ; '))
  questionOrAnswer = !questionOrAnswer
})