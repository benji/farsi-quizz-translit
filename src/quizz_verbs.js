var quizzutils;

if (typeof module != "undefined") {
  // nodejs compatibility
  if (quizzutils) {
  } else quizzutils = require("./quizzutils");
}

var verbquizz = {
  currentIdx: 0
};

verbquizz.loadData = function(verbsFileContent) {
  console.log("Loading verbs...");
  var lines = verbsFileContent.split("\n");
  lines.shift(); // remove header

  var verbs = [];
  for (i in lines) {
    if (!lines[i] || lines[i][0] == "#") continue;

    var parts = lines[i].split(",");
    var verb = {
      eng: parts[0]
    };
    verbs.push(verb);

    if (parts.length == 2) {
      verb.compound = true;
      verb.infinitive = parts[1];
      var compound_parts = parts[1].split(" ");

      verb.compound_main_verb_infinitive =
        compound_parts[compound_parts.length - 1];
      verb.compound_prefix = parts[1].replace(
        " " + verb.compound_main_verb_infinitive,
        ""
      );
    } else if (parts.length == 4) {
      verb.compound = true;
      verb.past_root = parts[1];
      verb.pres_root = parts[2];
      verb.subj_prefix = parts[3];
      //console.log(verb.past_root + 'an')
    } else throw "Invalid line [" + line + "]";
  }

  console.log("Resolution of compound verbs...");
  for (var i in verbs) {
    if (verbs[i].compound) {
      var compound_verb = verbs[i];
      for (var j in verbs) {
        if (
          compound_verb.compound_main_verb_infinitive ==
          verbs[j].past_root + "an"
        ) {
          compound_verb.past_root = verbs[j].past_root;
          compound_verb.pres_root = verbs[j].pres_root;
          compound_verb.subj_prefix = verbs[j].subj_prefix;
        }
      }
      if (!compound_verb.past_root)
        throw "Compound verb " +
          JSON.stringify(compound_verb) +
          " couldn't find its main verb " +
          compound_verb.compound_main_verb_infinitive;
    }
  }

  verbs = quizzutils.shuffle(verbs);
  return verbs;
};

verbquizz.conjugate = function(conjIdx, conjPrefix, root, personIdx) {
  if (conjPrefix[0] == "*") root = conjPrefix.substring(1, conjPrefix.length);
  else {
    if (root[0] == "*") root = root.substring(1, root.length);
    //if (conjIdx != 2)
    else root = conjPrefix + root;
  }

  if (personIdx == 0) return root + "am";
  else if (personIdx == 1) {
    if (conjIdx == 6) {
      if (root[root.length - 1] == "y")
        return root.substring(0, root.length - 1);
      return root;
    }
    return root + "i";
  } else if (personIdx == 2) {
    if (conjIdx == 1) return root; // past 3rd sing no ending
    return root + "(ad)";
  } else if (personIdx == 3) return root + "im";
  else if (personIdx == 4) return root + "id";
  else if (personIdx == 5) return root + "and";
  else throw "Invalid conjugation person idx " + personIdx;
};

verbquizz.person_answer = function(personIdx) {
  if (personIdx == 0) return "singular 1st (I)";
  else if (personIdx == 1) return "singular 2nd (you)";
  else if (personIdx == 2) return "singular 3rd (he/she)";
  else if (personIdx == 3) return "plural 1st (we)";
  else if (personIdx == 4) return "plural 2nd (you)";
  else if (personIdx == 5) return "plural 3rd (they)";
  else throw "Invalid person idx " + personIdx;
};

verbquizz.randInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var choices = {
  0: "infinitive",
  1: "past",
  2: "present",
  3: "subjonctive present",
  4: "continuous present",
  5: "future",
  6: "imperative"
};

verbquizz.question = function(verbs, far2eng) {
  var currentVerb = verbs[verbquizz.currentIdx++ % verbs.length];

  // pick conjugation
  var nchoices = 0;
  for (var c in choices) nchoices++;
  var conjIdx = Math.floor(Math.random() * Math.floor(nchoices));

  // pick person
  var personIdx = verbquizz.get_rand_person_for_tense(conjIdx);

  return verbquizz.question_for_tense(currentVerb, conjIdx, personIdx, far2eng);
};

verbquizz.get_rand_person_for_tense = function(conjIdx) {
  if (conjIdx == 0) return -1;
  if (conjIdx == 6) {
    var possible_persons_imperative = [1, 3, 4];
    return possible_persons_imperative[
      verbquizz.randInt(possible_persons_imperative.length)
    ];
  }
  return verbquizz.randInt(6);
};

verbquizz.question_for_tense = function(
  currentVerb,
  conjIdx,
  personIdx,
  far2eng
) {
  var compound_prefix_str = currentVerb.compound_prefix
    ? currentVerb.compound_prefix + " "
    : "";

  var far = "";

  if (conjIdx == 0) {
    far = compound_prefix_str + currentVerb.past_root + "an";
  } else if (conjIdx == 1) {
    far +=
      compound_prefix_str +
      verbquizz.conjugate(conjIdx, "", currentVerb.past_root, personIdx);
  } else if (conjIdx == 2) {
    far +=
      compound_prefix_str +
      verbquizz.conjugate(conjIdx, "mi", currentVerb.pres_root, personIdx);
  } else if (conjIdx == 3) {
    far +=
      compound_prefix_str +
      verbquizz.conjugate(
        conjIdx,
        currentVerb.subj_prefix,
        currentVerb.pres_root,
        personIdx
      );
  } else if (conjIdx == 4) {
    far +=
      verbquizz.conjugate(conjIdx, "", "dâr", personIdx) +
      " " +
      compound_prefix_str +
      verbquizz.conjugate(conjIdx, "mi", currentVerb.pres_root, personIdx);
  } else if (conjIdx == 5) {
    far +=
      compound_prefix_str +
      verbquizz.conjugate(conjIdx, "", "khâh", personIdx) +
      " " +
      currentVerb.past_root;
  } else if (conjIdx == 6) {
    far +=
      compound_prefix_str +
      verbquizz.conjugate(
        conjIdx,
        currentVerb.subj_prefix,
        currentVerb.pres_root,
        personIdx
      ) +
      "!";
  } else throw "Invalid conjugation choice";

  var infinitive = compound_prefix_str + currentVerb.past_root + "an";

  if (far2eng) {
    verbquizz.currentAnswer = [
      currentVerb.eng + " (" + infinitive + ")",
      choices[conjIdx]
    ];
    if (personIdx >= 0)
      verbquizz.currentAnswer.push(verbquizz.person_answer(personIdx));
    return [far];
  } else {
    verbquizz.currentAnswer = [far];
    if (personIdx >= 0) verbquizz.currentAnswer.push("[" + infinitive + "]");
    eng = [currentVerb.eng, choices[conjIdx]];
    if (personIdx >= 0) eng.push(verbquizz.person_answer(personIdx));
    return eng;
  }
};

verbquizz.answer = function() {
  return verbquizz.currentAnswer;
};

verbquizz.find_verb = function(verbs, eng) {
  for (var i in verbs) {
    if (verbs[i].eng == eng) return verbs[i];
  }
  throw "Could not find verb: " + eng;
};

if (typeof module != "undefined") {
  // nodejs compatibility
  module.exports = verbquizz;
}
