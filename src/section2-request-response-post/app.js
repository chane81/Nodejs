var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(3000, function() {
  console.log('start! express server on port 3000');
});

// static 디렉토리 설정
app.use(express.static('public'));

// body-parser 모듈 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// ejs(백엔드 템플릿) 모듈 설정
app.set('view engine', 'ejs');

// 라우팅
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/form.html');
});

app.post('/email_post', function(req, res) {
  console.log(req.body);
  //res.send(`<h1>welcome!<br/>${req.body.email}<h1>`);
  res.render('email.ejs', {email: req.body.email});
});
