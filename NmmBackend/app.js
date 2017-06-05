const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
var cors = require('cors')
const index = require('./routes/index');
const users = require('./routes/api/v1/users');

const app = express();

// database stuff
const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.DBHost);
const { connection: db } = mongoose;
// DB check and error messages
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  if (config.util.getEnv('NODE_ENV') === 'test') {
    console.log('Connected to the local No Meat May database');
  } else {
    console.log('Connected to the remote No Meat May database');
  }
});
// NOTE logger change, MAY NOT NEED THIS
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(logger('dev'));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');

app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// app.use('/', index);
// app.use('/api/user', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
