var $ = jQuery 	= require('jquery');
var _			= require('underscore');
var Backbone 	= require('backbone');
Backbone.$ 		= $;
var Marionette 	= require('backbone.marionette');
	
var basicInfo 	= require("../../templates/basicInfo.hbs");

module.exports = Marionette.ItemView.extend({
 
	el: '#mainPanel',
 
    initialize: function() {
		_.bindAll(this, "render");
	},
	
    events: {
    	'click #backBtn' : 'backClicked'
    },

    backClicked: function(){
        this.model.resetAll();
        window.App.controller.indexPage();
    },
	
	render: function(){
        var data = this.model.toJSON();
		var renderHTML = basicInfo(data);
		$(this.el).html(renderHTML);
	}
});