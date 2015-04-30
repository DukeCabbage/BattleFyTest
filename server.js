var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var exphbs = require('express3-handlebars');

var app = express();

var port = 8080;
var domain = 'localhost';

var findCallback = function(items, res){
    if (items.length == 0){
        res.writeHead(404);
        res.end('User not found');
    }else{
        res.writeHead(200);
        res.end(items[0]['email']);
        console.log(items[0]['email']);
    }
}

var playerInfoDB = require('./app/playerInfoDB');

app.get('/user/:name', function(req, res){
    playerInfoDB.find('username', req.params.name, findCallback, res);
});


app.set('port', port);
app.use(logger('dev'));
app.use('/', express.static(path.join(__dirname, 'public'))); 
app.use(favicon(path.join(__dirname, 'public/img/favicon.ico')));

// view engine setup
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// routes for serving pages and handling searches
app.use('/', require('./app/routes'));
app.use('/player', require('./app/playerQuery'));

app.listen(port, domain);
console.log('Server up: http://'+domain+':'+app.get('port'));
console.log('Listening...');

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});