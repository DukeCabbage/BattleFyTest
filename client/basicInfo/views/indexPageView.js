var $ = jQuery 	= require('jquery');
var _			= require('underscore');
var Backbone 	= require('backbone');
Backbone.$ 		= $;
var Marionette 	= require('backbone.marionette');

var server 		=require('../serverCommunication');
	
var indexPage 	= require("../../templates/indexPage.hbs");
var errorPage	= require("../../templates/errorPage.hbs");

module.exports = ChooseQuantityView = Marionette.ItemView.extend({
 
	el: '#mainPanel',
 
    initialize: function() {
		_.bindAll(this, "render");
		this.model.on('change', this.render);
	},
	
    events: {
    	'click #submitInquiryBtn' : 'submitInquiry',
    	'click #backBtn' : 'render'
    },

    submitInquiry: function(){
    	var name = $(this.el).find("#inputPlayerName").val();
    	if (name==''){
    		alert('Please enter a name');
    		return;
    	}

    	var _scope = this;
    	server.submitInquiry(name, function(msg, status){
    		if (status=='error'){
    			var renderHTML = errorPage();
    			$(_scope.el).html(renderHTML);
    			alert(msg.status+" "+msg.statusText);
    		}else{
    			alert(msg);
    		}
    	});
    },
	
	render: function(){
		var renderHTML = indexPage();
		$(this.el).html(renderHTML);
	}
});