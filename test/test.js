var fs = require("fs");
var path = require("path");
var assert = require("assert");
var quizz = require("../src/quizz_verbs");
var word_quizz = require("../src/quizz_words");

var data = fs.readFileSync("dicts/verbs.txt").toString();
var verbs = quizz.loadData(data);

var budan = quizz.find_verb(verbs, "to be");
var dashtan = quizz.find_verb(verbs, "to have");
var raftan = quizz.find_verb(verbs, "to go (casual)");
var amadan = quizz.find_verb(verbs, "to come");
var tamasha = quizz.find_verb(verbs, "to watch");
var khastan = quizz.find_verb(verbs, "to want");
var khordan = quizz.find_verb(verbs, "to eat");
var dadan = quizz.find_verb(verbs, "to give");

describe("Verbs", function() {
  it("Infinitive", function() {
    assert.equal(quizz.question_for_tense(raftan, 0, -1, true), "raftan");
    assert.equal(quizz.question_for_tense(budan, 0, -1, true), "budan");
    assert.equal(quizz.question_for_tense(dashtan, 0, -1, true), "dâshtan");
  });

  it("Past", function() {
    assert.equal(quizz.question_for_tense(raftan, 1, 0, true), "raftam");
    assert.equal(quizz.question_for_tense(budan, 1, 0, true), "budam");
    assert.equal(quizz.question_for_tense(dashtan, 1, 0, true), "dâshtam");
  });

  it("Present", function() {
    assert.equal(quizz.question_for_tense(raftan, 2, 0, true), "miram");
    assert.equal(quizz.question_for_tense(budan, 2, 0, true), "hastam");
    assert.equal(quizz.question_for_tense(dashtan, 2, 0, true), "dâram");
  });

  it("Imperative", function() {
    assert.equal(quizz.question_for_tense(amadan, 6, 1, true), "biyâ!");
    assert.equal(
      quizz.question_for_tense(tamasha, 6, 1, true),
      "tamâshâ bokon!"
    );
    assert.equal(quizz.question_for_tense(khastan, 6, 5, true), "bekhâhand!");
    assert.equal(quizz.question_for_tense(khordan, 6, 1, true), "bokhor!");
    assert.equal(quizz.question_for_tense(dadan, 6, 1, true), "bedah!");
  });
});

function test_word_dict(dfile) {
  console.log(dfile);

  it("Check dictionnary file " + dfile, function() {
    var f = path.join(__dirname, "..", "dicts", dfile);
    var data = fs.readFileSync(f).toString();
    var items = word_quizz.loadData(data);
    console.log("Loaded " + items.length + " words");
    assert(items.length >= 2);

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (typeof item.eng == "undefined" || typeof item.farsi == "undefined") {
        throw "Invalid word eng:" + item.eng + " farsi:" + item.farsi;
      }
    }

    for (var i = 0; i < items.length; i++) {
      var ques = word_quizz.question(items, true);
      assert(typeof ques != "undefined");
      var ans = word_quizz.answer();
      assert(
        typeof ans != "undefined" && ans.length > 0,
        "answer empty for question: " + ques
      );
    }
  });
}

describe("All", function() {
  fs.readdirSync(path.join(__dirname, "..", "dicts")).forEach(dfile => {
    if (dfile.indexOf("verbs") < 0) test_word_dict(dfile);
  });
});
