module.exports = function(app, fs) {
  app.get('/', function(req, res){
    res.render('index.html')
  });
  app.get('/about', function(req, res){
    res.render('about.html');
  })
}