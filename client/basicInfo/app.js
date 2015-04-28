var $           = require('jquery');
var _           = require('underscore');
var Backbone    = require('backbone');
Backbone.$      = $;
var Marionette  = require('backbone.marionette');

var Controller  = require('./controller');
var Router      = require('./router');

var model = require('./models/basicInfoModel');

module.exports = App = function App() {};

App.prototype.start = function(){
    App.core = new Marionette.Application();

    App.core.on("before:start", function (options) {
        App.core.vent.trigger('app:log', 'App: Initializing');

        App.views = {};
        App.data = {};
        
        App.data.model = new model();
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

    App.core.vent.bind('nav:chooseQuantity', function() {
        Backbone.history.navigate('')
    });

    App.core.vent.bind('nav:chooseMethod', function() {
        Backbone.history.navigate('method');
    });

    App.core.vent.bind('nav:delivery', function(option) {
        Backbone.history.navigate('delivery');
    });

    App.core.start();
};
