var fs = require('fs');
var readline = require('readline');
var quizz = require('./quizz')

var verbsFileContent = fs.readFileSync('verbs.txt').toString()

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var verbs = quizz.loadVerbs(verbsFileContent)

console.log('Initialization complete.')
console.log('Please press enter to start...')
console.log('')

var questionOrAnswer = true
rl.on('line', function () {
  questionOrAnswer ?
    process.stdout.write(quizz.question(verbs)) : console.log(quizz.answer().join(' ; '))
  questionOrAnswer = !questionOrAnswer
})