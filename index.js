var Hapi = require('hapi');
var Loki = require('lokijs')
var Chance = require('chance');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

var chance = new Chance();
var questions;
var createDb = function(){
  var db = new Loki('questions.json');
  var questions = db.addCollection('questions', { indices: ['type','id','text'] });
  questions.insert({id:"1", type:"singleSelect", text: 'How old are you?', option: [10,20,30,40]});
  questions.insert({id:"2", type:"singleSelect", text: 'Do you have read hair?', option: ['yes','no']});
  questions.insert({id:"3", type:"singleSelect", text: 'Do you like dogs?', option: ['yes','no']});
  questions.insert({id:"4", type:"singleSelect", text: 'Can you use a computer?', option: ['yes','no']});

  //generate random question
  console.time("loaddb");
  for (var i = 0; i < 100000; i++) {
    questions.insert({id:chance.guid(),
                      type:chance.pick(['singleSelect', 'multiSelect', 'boolean'],1),
                      text:chance.sentence(),
                      option: ['yes','no']});
  }
  console.timeEnd("loaddb")
  return questions;
}

// Add the route
server.route({
  method: 'GET',
  path:'/questions',
  handler: function (request, reply) {
    reply(questions.find({'type': { '$eq' : request.query.type }}));
  }
});

// Start the server
server.start(function() {
  questions = createDb();
  console.log('Server running at:', server.info.uri);
});
