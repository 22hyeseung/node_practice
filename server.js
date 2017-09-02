// 1. express 서버 생성
var express = require('express');
var app = express();
// body-parser: Post 데이터를 처리하는 모듈
var bodyParser = require('body-parser');
// express-session: 세션 관리하는 모듈
var session = require('express-session');
var fs = require('fs');

// 서버가 읽을 수 있도록 HTML의 위치를 정의해준다.
app.set('views', __dirname + '/views');
// 서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정한다.
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
  console.log("Express server has started on port 3000")
});

// 정적 파일(HTML에서 사용되는 .js/css/이미지 파일 등)
// express.static() 메소드를 통해 다룰 수 있다.
// public/dist 디렉터리 아래 있는 정적 파일을 적용한다.
app.use(express.static('public/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session ({
  secret: '@#@$MYSIGN#@$#$', // 쿠키를 임의로 변조하는 것을 방지하는 sign값.
  resave: false, // 세션을 언제나(변경된 것이 없어도) 저장할지를 설정, false가 권장됨.
  saveUninitialized:  // uninitialized 세션: 새로 생겼지만, 변경되지 않은 세션 -> 저장할 것인가? true가 권장됨.
}));


// 라우터 모듈인 main.js를 불러와서 app에 전달해준다.
// 라우터가 bodyParser 설정 아래에 있으면 제대로 작동하지 않는다.
// 라우터에서 fs모듈을 사용할 수 있도록 인자로 추가해준다.
var router = require('./router/main')(app, fs);