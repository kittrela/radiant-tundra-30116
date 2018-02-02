const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
var port = process.env.PORT || 3000;

const index = require('./routes/index');
const signIn = require('./routes/sign-in');
const signOut = require('./routes/sign-out');

const app = express();

// Use native promises
//mongoose.Promise = global.Promise;

// view engine setup
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* //Authentication
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
*/
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/',function(req,res){
//   res.render('home'); //We can omit the .handlebars extension as we do below
// });

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

// Routes
app.use('/', index);
app.use('/sign-in', signIn);
//app.use('/sign-out', sign-out);

/*
// Passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/

// Database connection
const { Client } = require('pg');

const client = new Client({
  connectionString : "pg://nhwljdkwkfhnoy:7a2f32711c734a5d67cfc0a1e59acc91654193795d8655de7ae0cfb27b630390@ec2-174-129-22-84.compute-1.amazonaws.com:5432/dfh46ttrtrflgb",
  ssl: true,
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port);
//module.exports = app;
