var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var d3 = require('d3');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var userService = require('./data/user');

var index = require('./routes/index');
var userRoute = require('./routes/user');
var cards = require('./routes/cards');
var leaders = require('./routes/leaders');

var app = express();

// view engine setup
app.locals.money = d3.format("$,.2f");

app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', userRoute);
app.use('/', ensureAuthenticated, cards);
app.use('/', ensureAuthenticated, leaders);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {
  userService.getUser(2)
    .then(function(user){done(null, user)})
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    return userService.getUserByUsername(username)
      .then(function(user){
        if(user == undefined || user.user_password !== password){
          done('Log in failed', null);
        } else {
          done(null, user);
        }
      });
  }
));

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/cards');
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

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

module.exports = app;
