var express = require('express');
const path = require('path');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main',partialsDir: ['views/partials/']});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
var port = process.env.PORT || 3000;

//handlebars.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.render('home'); //We can omit the .handlebars extension as we do below
});

// Admin REST
app.get('/admin_login', function(req, res){
  res.render('admin_login');
});

app.get('/admin_main', function(req, res) {
  res.render('admin_main');
});

// End Admin Rest

app.get('/other-page',function(req,res){
  context = {title: 'Handlebars Test'}
  res.render('other-page', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


app.listen(port);
