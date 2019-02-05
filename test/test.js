var fs = require('fs');
var assert = require('assert');
var quizz = require('../quizz_verbs')

var data = fs.readFileSync('verbs.txt').toString()
var verbs = quizz.loadData(data)

var budan = quizz.find_verb(verbs, 'to be')
var dashtan = quizz.find_verb(verbs, 'to have')
var raftan = quizz.find_verb(verbs, 'to go')
var amadan = quizz.find_verb(verbs, 'to come')
var tamasha = quizz.find_verb(verbs, 'to watch')
var khastan = quizz.find_verb(verbs, 'to want')
var khordan = quizz.find_verb(verbs, 'to eat')
var dadan = quizz.find_verb(verbs, 'to give')

describe('Verbs', function () {
  it('Infinitive', function () {
    assert.equal(quizz.question_for_tense(raftan, 0, -1), 'raftan');
    assert.equal(quizz.question_for_tense(budan, 0, -1), 'budan');
    assert.equal(quizz.question_for_tense(dashtan, 0, -1), 'dâshtan');
  });

  it('Past', function () {
    assert.equal(quizz.question_for_tense(raftan, 1, 0), 'raftam');
    assert.equal(quizz.question_for_tense(budan, 1, 0), 'budam');
    assert.equal(quizz.question_for_tense(dashtan, 1, 0), 'dâshtam');
  });

  it('Present', function () {
    assert.equal(quizz.question_for_tense(raftan, 2, 0), 'miravam');
    assert.equal(quizz.question_for_tense(budan, 2, 0), 'hastam');
    assert.equal(quizz.question_for_tense(dashtan, 2, 0), 'dâram');
  });

  it('Imperative', function () {
    assert.equal(quizz.question_for_tense(amadan, 6, 1), 'biyâ!');
    assert.equal(quizz.question_for_tense(tamasha, 6, 1), 'tamâshâ bokon!');
    assert.equal(quizz.question_for_tense(khastan, 6, 5), 'bekhâhand!');
    assert.equal(quizz.question_for_tense(khordan, 6, 1), 'bokhor!');
    assert.equal(quizz.question_for_tense(dadan, 6, 1), 'bedeh!');
  });
});