'use strict';
var debug = require('debug');
var express = require('express');

var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
require('./Db_Connection');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
//cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  //cors

// app.set('port', process.env.PORT || 9049);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});