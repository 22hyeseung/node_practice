module.exports = function(app, fs)
{
  app.get('/', function(req, res){
    res.render('index', {
      title: "My HomePage",
      length: 5
    })
  });
}
// JSON 데이터를 render 메소드의 두번째 인자로 전달하면
// 페이지에서 데이터를 사용할 수 있다.