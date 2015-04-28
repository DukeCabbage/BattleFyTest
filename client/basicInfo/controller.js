var $           = require('jquery');
var _           = require('underscore');
var Backbone    = require('backbone');
Backbone.$      = $;
var Marionette  = require('backbone.marionette');

var indexPageView = require('./views/indexPageView');

module.exports = Controller = Marionette.Controller.extend({
    initialize: function() {
        App.core.vent.trigger('app:log', 'Controller: Initializing');
    },

    indexPage: function() {
        App.core.vent.trigger('app:log', 'Controller: "indexPage" route hit.');
        this.destroyCurrentView();
        var view = new indexPageView({ model: window.App.data.model });
        this.renderView(view);
    },

    renderView: function(view) {
        App.core.vent.trigger('app:log', 'Controller: Rendering new view.');
        view.render();
        window.App.views.currentView = view;
    },

    destroyCurrentView: function() {
        if (!_.isUndefined(window.App.views.currentView)) {
            App.core.vent.trigger('app:log', 'Controller: Destroying existing view.');
            window.App.views.currentView.destroy();
            $( "#header" ).after("<div id=\"mainPanel\"></div>" );
        }
    }
});
