function start_quizz() {

  const urlParams = new URLSearchParams(window.location.search);
  const quizz_type = urlParams.get('type');
  const quizz_dict = urlParams.get('dict');

  if (!quizz_type || !quizz_dict) {
    $('#content').html('<i class="far fa-sad-tear fa-2x"></div>')
  } else {
    var quizz_lib_url = 'quizz_' + quizz_type + '.js'
    console.log('Loading ' + quizz_lib_url);

    var script = document.createElement('script');
    script.onload = on_loaded_quizz_lib_func(quizz_dict)
    script.src = quizz_lib_url
    document.head.appendChild(script);
  }
}

function on_loaded_quizz_lib_func(quizz_dict) {
  console.log('1/2 - quizz lib loaded.')

  return function () {
    var quizz_data_url = quizz_type + '.txt'
    console.log('Loading ' + quizz_data_url);

    var client = new XMLHttpRequest();
    client.open('GET', quizz_data_url);

    client.onreadystatechange = function () {
      if (client.readyState == 4) {
        console.log('2/2 - quizz data loaded.')
        items = loadData(client.responseText)
        $('#content').html('Tap to start...')
      }
    }
    client.send();
  }
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