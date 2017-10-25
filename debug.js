var express = require('express')
  , Logstash = require('logstash-client')
  , multer  = require('multer');

var app = express();
var upload = multer({ dest: '/tmp/' });
var message;

app.post('/', upload.single('thumb'), function (req, res, next) {
  var payload = JSON.parse(req.body.payload);
  console.log(payload);
  res.sendStatus(200);
});

app.listen(10000);
