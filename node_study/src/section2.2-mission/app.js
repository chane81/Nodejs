var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(3000, function() {
  console.log('server start!');
});

// static 폴더 설정
app.use(express.static('public'));

// body-parser 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// 뷰엔진 - ejs(백엔드 템플릿) 모듈 설정
app.set('view engine', 'ejs');


// 라우팅
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/form.html');
});3

app.get('/test-info/:id', function(req, res) {

  const reqId = parseInt(req.params.id, 10);

  const dummyData = [
    {
      id: 1,
      name: '이창환',
      address: '서울특별시 관악구'
    },
    {
      id: 2,
      name: '김진식',
      address: '서울특별시 송파구 잠실'
    },
    {
      id: 3,
      name: '이지훈',
      address: '서울특별시 구로구 대림'
    }
  ];

  let result = dummyData.filter(data => data.id === reqId);

  if (result.length === 0) {
    result = [{
      id: 0,
      name: '데이터 없음',
      address: '데이터 없음'
    }];
  };

  console.log(result);

  res.json(result);
});