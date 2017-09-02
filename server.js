// 1. express 서버 생성
var express = require('express');
var app = express();
// 라우터 모듈인 main.js를 불러와서 app에 전달해준다.
var router = require('./router/main')(app);

// 서버가 읽을 수 있도록 HTML의 위치를 정의해준다.
app.set('views', __dirname + '/views');

// 서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정한다.
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
  console.log("Express server has started on port 3000")
});


