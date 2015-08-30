var Hapi = require('hapi');
var Loki = require('lokijs')
var Chance = require('chance');
var db = require('./db');

var tableName = "role-questions-terry";
var questionsDb = {};

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: 8080,
  routes:{
    json: {
      space: 2
    }
  }
});

// Add the questions route
server.route({
  method: 'GET',
  path:'/questions',
  handler: function (request, reply) {
    var dbQuery = [];

    if(request.query.type)
      dbQuery.push({type: request.query.type});
    if(request.query.text)
      dbQuery.push({text: {'$contains' : request.query.text}});
    if(request.query.option)
      dbQuery.push({text: {'$contains' : request.query.option}});

    if (dbQuery.length>0){
      reply(questionsDb.find({'$and': dbQuery}));
    }
    else {
      reply(questionsDb.data);
    }
  }
});

var loadDb = function(questions){
  var db = new Loki('questions.json');
  var questionsCollection = db.addCollection('questions', { indices: ['type','id','text'] });

  // if we dont have any questions return empty db
  if(!questions)
    return questionsCollection;

  //load in memory db
  console.time("populate in memory db");
  console.log("Loading " + questions.length + " questions")
  for (var i = 0; i < questions.length; i++) {
    questionsCollection.insert(questions[i]);
  }
  console.timeEnd("populate in memory db")

  return questionsCollection;
}

// load questions
console.time("fetch questions data");
var questions = db.scanQuestions(tableName, function(error,data){
  console.timeEnd("fetch questions data");
  questionsDb = loadDb(data);
  // Start the server
  server.start(function() {
    console.log('Server running at:', server.info.uri);
  });
});
