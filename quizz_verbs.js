function loadData(verbsFileContent) {
  console.log('Loading verbs...')
  var lines = verbsFileContent.split("\n");
  lines.shift() // remove header

  var verbs = []
  for (i in lines) {
    var parts = lines[i].split(',')
    var verb = {
      eng: parts[0]
    }
    verbs.push(verb)

    if (parts.length == 2) {
      verb.compound = true
      verb.infinitive = parts[1]
      var compound_parts = parts[1].split(' ')
      if (compound_parts.length != 2) throw 'Invalid compound [' + lines[i] + ']'
      verb.compound_prefix = compound_parts[0]
      verb.compound_main_verb_infinitive = compound_parts[1]
      //console.log(verb.infinitive)
    } else if (parts.length == 4) {
      verb.compound = true
      verb.past_root = parts[1]
      verb.pres_root = parts[2]
      verb.subj_prefix = parts[3]
      //console.log(verb.past_root + 'an')
    } else throw 'Invalid line [' + line + ']'
  }

  console.log('Resolution of compound verbs...')
  for (var i in verbs) {
    if (verbs[i].compound) {
      var compound_verb = verbs[i]
      for (var j in verbs) {
        if (compound_verb.compound_main_verb_infinitive == verbs[j].past_root + 'an') {
          compound_verb.past_root = verbs[j].past_root
          compound_verb.pres_root = verbs[j].pres_root
          compound_verb.subj_prefix = verbs[j].subj_prefix
        }
      }
      if (!compound_verb.past_root) throw 'Compound verb ' + compound_verb + ' couldn\'t find its main verb ' + compound_verb.compound_main_verb_infinitive
    }
  }

  return verbs
}

function conjugate(root, personIdx) {
  if (personIdx == 0) return root + 'am'
  else if (personIdx == 1) return root + 'i'
  else if (personIdx == 2) return root + '(ad)'
  else if (personIdx == 3) return root + 'im'
  else if (personIdx == 4) return root + 'id'
  else if (personIdx == 5) return root + 'and'
  else throw 'Invalid conjugation person idx ' + personIdx
}

function get_tense_root(from, std_prefix) {
  if (from[0] == '*') return from.substring(1, from.length)
  return std_prefix + from
}

function person_answer(personIdx) {
  if (personIdx == 0) return 'singular 1st (I)'
  else if (personIdx == 1) return 'singular 2nd (you)'
  else if (personIdx == 2) return 'singular 3rd (he/she)'
  else if (personIdx == 3) return 'plural 1st (we)'
  else if (personIdx == 4) return 'plural 2nd (you)'
  else if (personIdx == 5) return 'plural 3rd (they)'
  else throw 'Invalid person idx ' + personIdx
}

var currentAnswer

function question(verbs) {
  // pick verb
  var verbIdx = Math.floor(Math.random() * Math.floor(verbs.length));
  var currentVerb = verbs[verbIdx]
  var q = ''
  var compound_prefix_str = currentVerb.compound_prefix ? currentVerb.compound_prefix + ' ' : ''

  // pick conjugation
  var choices = {
    0: 'infinitive',
    1: 'past',
    2: 'present',
    3: 'subjonctive',
    4: 'continuous',
    5: 'future'
  }
  var nchoices = 0
  for (var c in choices) nchoices++
  var conjIdx = Math.floor(Math.random() * Math.floor(nchoices));
  var personIdx = Math.floor(Math.random() * Math.floor(6));

  currentAnswer = [currentVerb.eng + ' (' + compound_prefix_str + currentVerb.past_root + 'an)', choices[conjIdx]]
  if (conjIdx != 0) currentAnswer.push(person_answer(personIdx))

  if (conjIdx == 0) {
    q = compound_prefix_str + currentVerb.past_root + 'an'
  } else if (conjIdx == 1) {
    q += compound_prefix_str + conjugate(get_tense_root(currentVerb.past_root, ''), personIdx)
  } else if (conjIdx == 2) {
    q += compound_prefix_str + conjugate(get_tense_root(currentVerb.pres_root, 'mi'), personIdx)
  } else if (conjIdx == 3) {
    q += compound_prefix_str + conjugate(get_tense_root(currentVerb.pres_root, currentVerb.subj_prefix), personIdx)
  } else if (conjIdx == 4) {
    q += conjugate('dâr', personIdx) + ' ' + compound_prefix_str + conjugate(get_tense_root(currentVerb.pres_root, 'mi'), personIdx)
  } else if (conjIdx == 5) {
    q += conjugate('khâh', personIdx) + ' ' + compound_prefix_str + currentVerb.past_root
  } else throw 'Invalid conjugation choice'

  return q
}

function answer() {
  return currentAnswer
}

if (typeof module != 'undefined') { // nodejs compatibility
  module.exports.loadData = loadData
  module.exports.question = question
  module.exports.answer = answer
}