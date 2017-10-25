var express = require('express')
  , Logstash = require('logstash-client')
  , multer  = require('multer');

var app = express();
var upload = multer({ dest: '/tmp/' });
var message;

if (process.env.LOGHOST) {
	var loghost = process.env.LOGHOST
} else {
	var loghost = "127.0.0.1" 
}

var logger = new Logstash({
	type: 'tcp',
	host:  loghost,
	port: '10001'
});

app.post('/', upload.single('thumb'), function (req, res, next) {
  var payload = JSON.parse(req.body.payload);
  var message = {
	  event: payload.event,
	  account: payload.Account.title,
	  ip: payload.Player.publicAddress,
	  player: payload.Player.title,
	  type: payload.Metadata.type,
	  title: payload.Metadata.title
  }

  if (payload.Metadata.type == 'episode') {
	  message.title = `${payload.Metadata.grandparentTitle} - ${payload.Metadata.parentTitle} - ${payload.Metadata.title}`
  }
  
  logger.send({
	  '@timestamp': new Date(),
	  'message': JSON.stringify(message, null, 2)
  });
  console.log(new Date(), JSON.stringify(message, null, 2));

  res.sendStatus(200);
});

app.listen(10000);
