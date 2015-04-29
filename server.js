var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var exphbs = require('express3-handlebars');

var routes = require('./app/routes');
var query = require('./app/playerQuery')

var app = express();

var port = 8080;
var domain = 'localhost';
var _scope = this;

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/nodetest1", mongoDBOnConnect);

function mongoDBOnConnect(err, db) {
  if(!err) {
    console.log("We are connected");
    _scope.testDB = db;
    var collection = db.collection('usercollection');
    var stream = collection.find().stream();
    stream.on("data", function(item) {
      console.log(item);
      console.log(item['_id']);
    });
    stream.on("end", function() {
      console.log('end');
    });

  }else{
    return console.dir(err);
  }
}

app.set('port', port);
app.use(logger('dev'));
app.use('/', express.static(path.join(__dirname, 'public'))); 
app.use(favicon(path.join(__dirname, 'public/img/favicon.ico')));

// view engine setup
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Make our db accessible to our router
// app.use(function(req,res,next){
//     req.db = db;
//     next();
// });

app.use('/', routes);
app.use('/player', query);

app.listen(port, domain);
console.log('Server up: http://'+domain+':'+app.get('port'));
console.log('Listening...');

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
    // app.use(function(err, req, res, next) {
    //     res.status(err.status || 500);
    //     res.render('error', {
    //         message: err.message,
    //         error: err
    //     });
    // });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


