var $ = jQuery 	= require('jquery');
var _			= require('underscore');
var Backbone 	= require('backbone');
Backbone.$ 		= $;
var Marionette 	= require('backbone.marionette');
	
var indexPage 	= require("../../templates/indexPage.hbs");
var errorPage	= require("../../templates/errorPage.hbs");

module.exports = ChooseQuantityView = Marionette.ItemView.extend({
 
	el: '#mainPanel',
 
    initialize: function() {
		_.bindAll(this, "render");
		this.model.on('change', this.render);
	},
	
    events: {
    },
	
	render: function(){
		var renderHTML = indexPage();
		renderHTML += errorPage();
		$(this.el).html(renderHTML);
	}
});