var chance = require('chance')();
var AWS = require('aws-sdk');
var DOC = require("dynamodb-doc");
var DynamoDBValue = require('dynamodb-value')

AWS.config.update({region: "ap-southeast-2"});

// Basic Callback
var pfunc = function(err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        console.dir(data);
    }
}

var scanQuestions = function(tableName, callback) {
  var db = new AWS.DynamoDB()
  var params = {};
  params.TableName = tableName;
  db.scan(params, function(err, data) {
    if (err) {callback(err);}
    else{
      var result = [];
      for (var i = 0; i < data.Items.length; i++) {
        result.push(DynamoDBValue.toJavascript(data.Items[i]));
      }
      callback(null,result);
    }
  });
}

var writeQuestions = function(questions, tableName){
  var awsClient = new AWS.DynamoDB();
  var docClient = new DOC.DynamoDB(awsClient);
  var params = {};
  params.TableName = tableName;
  for (var i = 0; i < questions.length; i++) {
    params.Item = questions[i];
    docClient.putItem(params, pfunc);
  }
}

module.exports = {
    writeQuestions : writeQuestions,
    scanQuestions : scanQuestions
}
