var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const testBackendRoute = require("./routes/testBackend")
const nodemailer = require("nodemailer");

// const nodemailer = require("./routes/nodemail")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testBackend", testBackendRoute);

app.post('/send', async (req, res, next) => {
  console.log(req.body)
  // console.log(res)

  var name = req.body.name
  var email = req.body.email
  var message = req.body.msg
  var content = `name: ${name} \n email: ${email} \n message: ${message} `
  let testAccount = await nodemailer.createTestAccount();

  let smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      port: '465',
      auth: {
          user: 'haywood.beck13@gmail.com', //replace with the email address
          pass: 'bghbgh123' //replace with the password
      }
  });

  let mailOptions = {
      from: email,
      to: 'haywoodbeck12@gmail.com',
      subject: `Message from ${name}`,
      html: `
      <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
          <li>Message: ${message}</li>
      </ul>
      `
  }

  smtpTransport.sendMail(mailOptions, (err, res)=>{
      if (err){
          console.log(err)
          res.send(err)
            .catch((err)=>{
              console.log(err)
            })
      } else {
          res.send('Success')
      }
  })
  smtpTransport.close();
})
// app.use("/send", nodemailer);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
