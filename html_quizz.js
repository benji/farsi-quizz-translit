function start_quizz(quizz_type) {
  var client = new XMLHttpRequest();
  client.open('GET', quizz_type + '.txt');
  client.onreadystatechange = function () {
    if (client.readyState == 4) {
      items = loadData(client.responseText)
      console.log('Loaded ' + quizz_type + '.')
    }
  }
  client.send();
}

var items

var currentQuestion, questionOrAnswer = true

function next() {
  var display
  if (questionOrAnswer) {
    currentQuestion = question(items)
    display = '<span class="question">' + currentQuestion + '</span>'
  } else {
    display = '<span class="question">' + currentQuestion + '</span>'
    display += '<span class="answer">' + answer().join('<br/>') + '</span>'
  }
  document.getElementById('content').innerHTML = display
  questionOrAnswer = !questionOrAnswer
}