var express = require('express');
var app = express();

app.listen(3000, function() {
  console.log('start! express server on port 3000');
});

// static 디렉토리 설정
app.use(express.static('public'));

app.get('/', function(req, res) {
   //res.send('<h1>hi friend!</h1>');
   res.sendFile(__dirname + '/public/main.html');
});

app.get('/main', function(req, res) {
  res.sendFile(__dirname + '/public/main.html');
});