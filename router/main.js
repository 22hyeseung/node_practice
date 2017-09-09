module.exports = function (app, fs) {
  // JSON 데이터를 render 메소드의 두번째 인자로 전달하면
  // 페이지에서 데이터를 사용할 수 있다.
  app.get('/', function (req, res) {
    res.render('index', {
      title: "My HomePage",
      length: 5,
    });
  });

  app.get('/list', function (req, res) {
    fs.readFile(__dirname + "/../data/user.json", 'utf8', function (err, data) {
      console.log(data);
      res.end(data);
    });
  })

  // 아이디 찾기

  app.get('/getUser/:username', function (req, res) {
    fs.readFile(__dirname + "/../data/user.json", 'utf8', function (err, data) {
      // 유저아이디를 찾으면 유저아이디 출력
      var users = JSON.parse(data); //readFile로 파일을 읽을 경우 text 형태로 읽어지므로 JSON.parse를 반드시 해야 한다.
      res.json(users[req.params.username]);
    });
  });

  // 아이디 추가하기 
  app.post('/addUser/:username', function (req, res) {

    var result = {};
    // 요청으로 보낸 username을 username 객체에 저장
    var username = req.params.username;

    // 요청 유효성 검사
    // form에서 받은 password와 name이 유효하지 않으면
    if (!req.body["password"] || !req.body["name"]) {
      result["success"] = 0; // 성공여부: false
      result["error"] = "유효하지 않은 요청입니다."; // error 메시지
      res.json(result); // 요청 실패 & 에러메시지 출력
      return;
    }

    // 데이터 로드 & 중복 확인
    fs.readFile(__dirname + '/../data/user.json', 'utf8', function (err, data) {
      var users = JSON.parse(data);
      if (users[username]) {
        // 중복된다면, (이미 아이디가 존재한다면)
        result["success"] = 0; // 실패
        result["error"] = "이미 존재하는 아이디입니다.";
        res.json(result);
        return;
      }

      // 데이터 추가하기
      users[username] = req.body;

      // 데이터 저장하기
      fs.writeFile(__dirname + '/../data/user.json', JSON.stringify(users, null, '\t'), 'utf8', function (err, data) {
        result = {
          "success": 1
        };
        res.json(result);
      })
    })
  });

  // 유저 정보 업데이트

  app.put('/updateUser/:username', function (req, res) {
    var result = {};
    var username = req.params.username;

    // 유효성 검사
    if (!req.body["password"] || !req.body["name"]) {
      result["success"] = 0;
      result["error"] = "유효하지 않은 요청입니다.";
      res.json(result);
      return;
    }

    // 데이터 로드
    fs.readFile(__dirname + '/../data/user.json', 'utf8', function (err, data) {
      var users = JSON.parse(data);

      // 데이터 추가/수정
      users[username] = req.body;

      // 데이터 저장
      fs.writeFile(__dirname + '../data/user.json', JSON.stringify(users, null, '\t'), function(err, data){
        result = {"success": 1};
        res.json(result);
      })
    })
  });

  app.delete('/deleteUser/:username', function(req, res){
    var result = {};

    // 데이터 로드
    fs.readFile(__dirname + '/../data/user.json', 'utf8', function(err, data){
      var users = JSON.parse(data);

      // 데이터를 찾을 수 없다면
      if(!users[req.params.username]){
        result["success"] = 0;
        result["error"] = "데이터를 찾을 수 없습니다."
        res.json(result);
        return;
      }

      // 데이터 삭제하기
      delete users[req.params.username];

      // 데이터 저장하기
      fs.writeFile(__dirname + '/../data/user.json', JSON.stringify(users, null, '\t'), 'utf8', function(err, data){
        result["success"] = 1;
        res.json(result);
        return;
      })
    })
  })
}
