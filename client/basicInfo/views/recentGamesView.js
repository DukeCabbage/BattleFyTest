var $ = jQuery 	= require('jquery');
var _			= require('underscore');
var Backbone 	= require('backbone');
Backbone.$ 		= $;
var Marionette 	= require('backbone.marionette');

var recentGames = require("../../templates/recentGames.hbs");

module.exports = Marionette.ItemView.extend({
 
	el: '#mainPanel',
 
    initialize: function() {
		_.bindAll(this, "render");
	},
	
    events: {
    	'click #backBtn' : 'backBtnClick'
    },


    backBtnClick: function(){
        this.collection.reset();
        window.App.controller.indexPage();
    },
	
	render: function(){
        var data = this.collection.toJSON();
		var renderHTML = recentGames(data);
		$(this.el).html(renderHTML);
	}
});