var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
// var users = require('./routes/users');
var signup = require('./routes/signup');
var addDog = require('./routes/addDog');
var addFriend = require('./routes/addFriend');

var app = express();

var dbCrtl = require('./controllers/dbCtrl');
// dbCrtl.testing()
// dbCrtl.db.one(dbCrtl.findUser,["qwe@qwe.co", "test"]).then(results => console.log(results));


//passport
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
  function(username, password, cb) {
    dbCrtl.db.one(dbCrtl.findUser,["qwe@qwe.co", "test"]).then(results => {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser((user, done)=>{
    done(null, user.user_id);
  });

 passport.deserializeUser((id, done)=>{
    log.debug("deserualize ", id);
    db.one("SELECT user_id, user_name, user_email, user_role FROM users " +
            "WHERE user_id = $1", [id])
    .then((user)=>{
      done(null, user);
    })
    .catch((err)=>{
      done(new Error(`User with the id ${id} does not exist`));
    })
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/signup', signup);
app.use('/addDog', addDog);
app.use('/addFriend', addFriend);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
