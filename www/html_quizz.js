/*
Sample URLs:
/index.html?quizz_type=verbs&quizz_dict=verbs&quizz_far2eng=false
*/

var quizz, quizz_far2eng

function start_quizz() {
  console.log(window.location)
  const quizz_dict = special_capture_param('quizz_dict');
  const quizz_type = special_capture_param('quizz_type');
  quizz_far2eng = special_capture_param('quizz_far2eng') == 'true';
  console.log('Quizz type: ' + quizz_type)
  console.log('Quizz dict: ' + quizz_dict)
  console.log('Quizz far2en: ' + quizz_far2eng)

  if (!quizz_type || !quizz_dict) {
    display_error('Missing type/dict in query string.')
    return
  }

  if (quizz_type == 'verbs') quizz = verbquizz;
  else if (quizz_type == 'words') quizz = wordquizz;
  else {
    display_error('Unknown quizz type ' + quizz_type);
    return;
  }

  var quizz_data_url = '../dicts/' + quizz_dict + '.txt'
  console.log('Loading ' + quizz_data_url);

  var client = new XMLHttpRequest();
  client.open('GET', quizz_data_url);

  client.onreadystatechange = function (a, b, c, d) {
    if (client.readyState == 4) {
      if (client.status == 200) {
        console.log('Quizz data loaded.')
        items = quizz.loadData(client.responseText)
        $('#content').html('Tap to start...')
      } else {
        display_error('Request failed.')
      }
    }
  }
  client.send();
}

// needs to be compatibe with htmlpreview.github.io
// original URL of github html file is already passed as query tring param
function special_capture_param(name) {
  var tmp = window.location.href.replace(/.*\?/, '')
  var pairs = tmp.split('&')
  for (var i in pairs) {
    var parts = pairs[i].split('=')
    if (parts[0] == name) return parts[1]
  }
}

function display_error(msg) {
  console.error(msg)
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

var items
var currentQuestion, questionOrAnswer = true

function next() {
  var display
  if (questionOrAnswer) {
    currentQuestion = quizz.question(items, quizz_far2eng).join('<br/>')
    display = '<span class="question">' + currentQuestion + '</span>'
  } else {
    display = '<span class="question">' + currentQuestion + '</span>'
    display += '<span class="answer">' + quizz.answer().join('<br/>') + '</span>'
  }
  document.getElementById('content').innerHTML = display
  questionOrAnswer = !questionOrAnswer
}