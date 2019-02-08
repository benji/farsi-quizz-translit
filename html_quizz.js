function start_quizz() {
  console.log(window.location)
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams)
  const quizz_dict = urlParams.get('quizz_dict');
  const quizz_type = urlParams.get('quizz_type');
  console.log(quizz_type)
  console.log(quizz_dict)

  if (!quizz_type || !quizz_dict) {
    display_error('Missing type/dict in query string.')
  } else {
    var quizz_lib_url = 'quizz_' + quizz_type + '.js'
    console.log('Loading ' + quizz_lib_url);
    load_script(quizz_lib_url, on_loaded_quizz_lib_func(quizz_type))
  }
}

function display_error(msg) {
  console.log(msg)
  $('#content').html('<i class="far fa-sad-tear fa-2x"></div>')
}

function load_script_deprecated(url, onload) {
  var script = document.createElement('script');
  script.onload = onload
  script.src = url
  document.head.appendChild(script);
}

function load_script(url, onload) {
  var sNew = document.createElement("script");
  sNew.async = true;
  sNew.src = url;
  sNew.onload = onload
  var s0 = document.getElementsByTagName('script')[0];
  s0.parentNode.insertBefore(sNew, s0);
}

function on_loaded_quizz_lib_func(quizz_type) {
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