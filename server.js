var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var exphbs = require('express3-handlebars');

var app = express();

var port = 8080;
var domain = 'localhost';

var request = require("request");

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
app.use('/staticInfo', require('./app/staticInfoQuery'));
app.use('/recentGames', require('./app/recentGames'));

app.get('/test/:name', function(req, res) {
    var apiKey = '?api_key=d188a667-b0ca-4c80-9110-8bfcbbf6d82b';
    var requestStr = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';
    var name = req.params.name.toUpperCase();
    var requestUrl = requestStr+name+apiKey;
        request(requestUrl, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var playerInfo = JSON.parse(body);
            var key = Object.keys(playerInfo)[0];
            var playerObj = {
                summonerId : playerInfo[key]['id'],
                name : playerInfo[key]['name'],
                summonerLevel : playerInfo[key]['summonerLevel'],
                revisionDate: playerInfo[key]['revisionDate']
            }

            console.log(JSON.stringify(playerObj));
            res.writeHead(200);
            res.end(JSON.stringify(playerObj));
        }else{
            res.writeHead(response.statusCode, {"Content-Type": "text/text"});
            res.end(error);
        }
    });
});

app.get('/testid/:id', function(req, res) {
    var apiKey = '?api_key=d188a667-b0ca-4c80-9110-8bfcbbf6d82b';
    var requestStr = 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/';
    var id = req.params.id;
    var requestUrl = requestStr+id+'/recent'+apiKey;
    console.log(requestUrl);

        request(requestUrl, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var playerInfo = JSON.parse(body);
            res.writeHead(200);
            res.end(JSON.stringify(playerInfo));
        }else{
            res.writeHead(response.statusCode, {"Content-Type": "text/text"});
            res.end(error);
        }
    });
});

app.listen(port, domain);
console.log('Server up: http://'+domain+':'+app.get('port'));
console.log('Listening...');

/// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });