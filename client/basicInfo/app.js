var $           = require('jquery');
var _           = require('underscore');
var Backbone    = require('backbone');
Backbone.$      = $;
var Marionette  = require('backbone.marionette');

var Controller  = require('./controller');
var Router      = require('./router');

var BasicInfoModel = require('./models/basicInfoModel');
var RecentGamesCollection = require('./models/RecentGamesCollection');

module.exports = App = function App() {};

App.prototype.start = function(){
    App.core = new Marionette.Application();

    App.core.on("before:start", function (options) {
        App.core.vent.trigger('app:log', 'App: Initializing');

        App.views = {};
        App.data = {};
        
        App.data.model = new BasicInfoModel();
        App.data.collection = new RecentGamesCollection();
        App.core.vent.trigger('app:start');
    });

    App.core.vent.bind('app:start', function(options){
        App.core.vent.trigger('app:log', 'App: Starting');
        if (Backbone.history) {
            App.controller = new Controller();
            App.router = new Router({ controller: App.controller });
            App.core.vent.trigger('app:log', 'App: Backbone.history starting');
            Backbone.history.start();
        }

        //new up and views and render for base app here...
        App.core.vent.trigger('app:log', 'App: Done starting and running!');
    });

    App.core.vent.bind('app:log', function(msg) {
        console.log(msg);
    });

    App.core.start();
};
