var express = require('express');
var session = require('express-session')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var d3 = require('d3');
var moment = require('moment');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var userService = require('./data/user');

var index = require('./routes/index');
var userRoute = require('./routes/user');
var cards = require('./routes/cards');
var leaders = require('./routes/leaders');
var history = require('./routes/history');
var signup = require('./routes/signup');

var app = express();

// view engine setup
app.locals.money = d3.format("$,.2f");
app.locals.formatTime = function(date){
  return moment(date).format('MM/DD/YYYY h:mm a');
};

app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

//app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/cards');
  });

var cardService= require('./data/card');
var tickerCards = function(req, res, next){
  cardService.getAllCards()
    .then(function(tickerCards) {
      req.tickerCards = tickerCards;
      next();
    });
};

app.use('/', index);
app.use('/', signup);
app.use('/', ensureAuthenticated, userRoute);
app.use('/', ensureAuthenticated, cards);
app.use('/', ensureAuthenticated, leaders);
app.use('/', ensureAuthenticated, history);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

passport.serializeUser(function(u, done) {
  console.log(u);
  done(null, u.user_id);
});

passport.deserializeUser(function(id, done) {
  console.log(id);
  userService.getUser(id)
    .then(function(u){done(null, u)})
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    return userService.getUserByUsername(username)
      .then(function(u){
        if(u == undefined || u.user_password !== password){
          done('Log in failed', null);
        } else {
          done(null, u);
        }
      });
  }
));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

module.exports = app;
