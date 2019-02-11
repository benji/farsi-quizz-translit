## Farsi Quizz Translit

Simple webapp (or nodejs app) to help learning to recognize conjugated Farsi verbs into english.

### Webapp Quizz Demo

[Verbs Persian -> English](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/index.html?quizz_type=verbs&quizz_dict=verbs&quizz_far2eng=true)  
[Verbs English -> Persian](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/index.html?quizz_type=verbs&quizz_dict=verbs&quizz_far2eng=false)

[Words 1 Persian -> English](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/index.html?quizz_type=words&quizz_dict=words1&quizz_far2eng=true)  
[Words 1 English -> Persian](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/index.html?quizz_type=words&quizz_dict=words1&quizz_far2eng=false)

[Words 2 - Persian -> English](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/index.html?quizz_type=words&quizz_dict=words2&quizz_far2eng=true)  
[Words 2 - English -> Persian](http://htmlpreview.github.io/?https://github.com/benji/farsi-quizz-translit/blob/master/index.html?quizz_type=words&quizz_dict=words2&quizz_far2eng=false)

### Desktop (NodeJS)

For verbs:
`node main.js verbs`

For words:
`node main.js words`

### External Docs

Top verbs: http://www.jahanshiri.ir/fa/en/vocab-common-verbs

Pronounciation: https://forvo.com/languages/fa/

Grammar: https://en.wikipedia.org/wiki/Persian_grammar

Suffixes/Possessive/Plural: https://en.wikipedia.org/wiki/Persian_nouns

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