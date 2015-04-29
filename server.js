var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var request = require("request");
var exphbs = require('express3-handlebars');

var routes = require('./app/routes');

var app = express();

var port = 8080;
var domain = 'localhost';

var apiKey = '?api_key=d188a667-b0ca-4c80-9110-8bfcbbf6d82b';
var requestStr = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';

var playerInfo;
var id;
var name;
var level;

app.set('port', port);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(favicon(path.join(__dirname, 'public/img/favicon.ico')));

// view engine setup
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/', routes);

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
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//===================================================
// TODO: MOVE TO SEPARATE ROUTE

// NEW: Handle requests for a player
app.get('/players/:name', function(req, res){
	var name = req.params.name;
	var requestUrl = requestStr+name+apiKey;
	console.log('Sending request: ' + requestUrl);

	request(requestUrl, function(error, response, body){
		if (!error && response.statusCode == 200) {
			handleInfo(body);

			res.writeHead(200, {"Content-Type": "text/json"});
			res.write('id: ' + id + '\n');
			res.write('name: '+name + '\n');
			res.write('level: '+level + '\n');
			res.end();
		}else{
			res.writeHead(response.statusCode, {"Content-Type": "text/text"});
			res.end(error);
		}
	});
});

function handleInfo(body){
	console.log('what');
	playerInfo = JSON.parse(body);
	var key = Object.keys(playerInfo)[0];
	id = playerInfo[key]['id'];
	name = playerInfo[key]['name'];
	level = playerInfo[key]['summonerLevel'];
	console.log(id);
}
