const http = require('http');

// HTTPRequest의 옵션 설정
const options = {
  host: 'localhost',
  port: '8081',
  path: 'src/index.html'
};

// 콜백 함수로 Response를 받아온다
const callback = (res) => {
  // response 이벤트가 감지되면 데이터를 body에 받아온다.
  let body = '';
  res.on('data', (data) => {
    body += data;
  });

  // end 이벤트가 감지되면 데이터 수신을 종료하고 내용을 출력한다.
  res.on('end', () => {
    // 데이터 수신 완료
    console.log(body);
  });
};

const req = http.request(options, callback);
req.end();
