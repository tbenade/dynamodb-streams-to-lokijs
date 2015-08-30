var chance = require('chance')();
var AWS = require('aws-sdk');
var DOC = require("dynamodb-doc");
AWS.config.update({region: "ap-southeast-2"});

module.exports = QuestionGenerator;

function QuestionGenerator() {
  chance.mixin({
    'question': function() {
      var questionType = chance.pick(['singleSelect','multiSelect','boolean'],1);
      var question;
      switch(questionType) {
        case 'singleSelect':
          question = {id:chance.guid(),
                      type:questionType,
                      text:chance.sentence(),
                      option: chance.n(chance.sentence,
                        chance.integer({min: 2, max: 10}))};
          break;
        case 'multiSelect':
          question = {id:chance.guid(),
                      type:questionType,
                      text:chance.sentence(),
                      option: chance.n(chance.sentence,
                        chance.integer({min: 2, max: 10}))};
          break;
        case 'boolean':
          question = {id:chance.guid(),
                      type:questionType,
                      text:chance.sentence()};
          break;
      }
      return question;
    }
  });

  // Basic Callback
  var pfunc = function(err, data) {
      if (err) {
          console.log(err, err.stack);
      } else {
          console.dir(data);
      }
  }

  var createQuestionSet = function(numberOfQuestions) {
    var questions = [];

    //generate random question
    console.time("loaddb");
    for (var i = 0; i < numberOfQuestions; i++) {
      questions.push(chance.question());
    }
    console.timeEnd("loaddb")
    return questions;
  }
}
