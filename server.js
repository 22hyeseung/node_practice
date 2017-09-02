// 1. express 서버 생성
var express = require('express');
var app = express();
var server = app.listen(3000, function(){
  console.log("Express server has started on port 3000")
});

// 여기까지만 작성하면 cannot GET / 이라는 에러가 나타난다.
// Router를 정의하지 않았기 때문이다.

// 2. Router로 Request 처리하기
// get
app.get('/', function(req, res){
  res.send('Hello World');
})