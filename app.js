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
  res.render('home') //We can omit the .handlebars extension as we do below
});

app.get('/admin_login', function(req, res){
  res.render('admin_login')
});

app.get('/other-page',function(req,res){
  res.render('other-page');
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
