## Farsi Quizz Translit

Simple webapp (or nodejs app) to help learning to recognize conjugated Farsi verbs into english.

### Webapp Quizz Demo

Verbs: [IRA->ENG](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=verbs&quizz_dict=verbs&quizz_far2eng=true) - [ENG->IRA](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=verbs&quizz_dict=verbs&quizz_far2eng=false)

Words 1: [IRA->ENG](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=words1&quizz_far2eng=true) - [ENG->IRA](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=words1&quizz_far2eng=false)

Words 2: [IRA->ENG](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=words2&quizz_far2eng=true) - [ENG->IRA](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=words2&quizz_far2eng=false)

Words 3: [IRA->ENG](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=words3&quizz_far2eng=true) - [ENG->IRA](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=words3&quizz_far2eng=false)  

Words 4: [IRA->ENG](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=words4&quizz_far2eng=true) - [ENG->IRA](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=words4&quizz_far2eng=false)  

Numbers: [IR->US](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=numbers&quizz_far2eng=true) - [ENG->IRA](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=numbers&quizz_far2eng=false)  

Expressions/Sentences 1: [IRA->ENG](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=expr1&quizz_far2eng=true) - [ENG->IRA](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=expr1&quizz_far2eng=false)  

Expressions/Sentences 2: [IRA->ENG](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=expr2&quizz_far2eng=true) - [ENG->IRA](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/www/index.html?quizz_type=words&quizz_dict=expr2&quizz_far2eng=false)

### Desktop (NodeJS)

For verbs farsi->english:
`node main.js verbs verbs true`

For words (dict words1, english->farsi):
`node main.js words words1 false`

### External Docs

Top verbs: http://www.jahanshiri.ir/fa/en/vocab-common-verbs

Pronounciation: https://forvo.com/languages/fa/

Grammar: https://en.wikipedia.org/wiki/Persian_grammar

Suffixes/Possessive/Plural: https://en.wikipedia.org/wiki/Persian_nouns

French-Persian: http://anamnese.online.fr/site2/index.php?page=iran

https://www.sssscomic.com/comicpages/196.jpg

https://archive.org/stream/persianselftaugh00hasauoft#page/n27/mode/2up

https://librivox.org/persian-self-taught-by-shaykh-hasan/

### Verbs Conjugation Rules

There are some subtleties but essentially:

```
infinitive =            (past_root + 'an')
past       =            (past_root<>)
future     = (khah<>) + (past_root)

present            =           ('mi' + present_root<>)
continuous present = (dâr<>) + ('mi' + present_root<>)

subjonctive = ('be/bo/biy' + present_root<>)
imperative  = ('be/bo/biy' + present_root<>)
```

<> : congugation ending  
(...) : word  
/ : or
