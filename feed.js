var aws = require('aws-sdk')
var DynamoDBStream = require('dynamodb-stream')
var schedule = require('tempus-fugit').schedule
var deepDiff = require('deep-diff').diff
aws.config.update({region: 'ap-southeast-2'});
var pk = 'id'
var ddb = new aws.DynamoDB()
var ddbStream = new DynamoDBStream(new aws.DynamoDBStreams(),
  'arn:aws:dynamodb:ap-southeast-2:478156153062:table/role-questions-terry/stream/2015-08-29T02:34:26.105')

var localState = {};
var count = 0;

// do this every 1 minute, starting from the next round minute
schedule({ second: 5 }, function (job) {
  ddbStream.fetchStreamState(function(err){
    if (err) {
      return console.error(err)
    }
    var state = ddbStream.getShardState()
    job.done();
  });
})

ddbStream.on('insert record', function (data) {
  console.log("record inserted");
  if(data)
    localState[data.id] = data
})

ddbStream.on('error', function (error) {
  console.log(error);
})

ddbStream.on('remove record', function (data) {
  console.log("removed record");
  if (data)
    delete localState[data.id]
})

ddbStream.on('modify record', function (newData, oldData) {
  var diff = deepDiff(oldData, newData)
  if (diff) {
      console.log("modified");
  }
})

ddbStream.on('new shards', function (shardIds) {})
ddbStream.on('remove shards', function (shardIds) {})
