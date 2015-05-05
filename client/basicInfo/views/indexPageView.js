var $ = jQuery 	= require('jquery');
var _			= require('underscore');
var Backbone 	= require('backbone');
Backbone.$ 		= $;
var Marionette 	= require('backbone.marionette');

var server 		=require('../serverCommunication');
	
var indexPage 	= require("../../templates/indexPage.hbs");
var errorPage	= require("../../templates/errorPage.hbs");

module.exports = Marionette.ItemView.extend({
 
	el: '#mainPanel',
 
    initialize: function() {
		_.bindAll(this, "render", "searchPlayer", "searchRecentGames");
	},
	
    events: {
    	'click #submitInquiryBtn' : 'searchPlayer',
        'click #recentGamesBtn' : 'searchRecentGames',
    	'click #backBtn' : 'render'
    },

    searchPlayer: function(){
    	var name = $(this.el).find("#inputPlayerName").val();
    	if (name==''){
    		alert('Please enter a name');
    		return;
    	}

    	server.submitBasicInquiry(name, function(res, status){
    		if (status=='error'){
    			var renderHTML = errorPage();
    			$(this.el).html(renderHTML);
    			// alert(res.status+" "+res.statusText);
    		}else{
                console.log(res);
                window.App.data.model.parseResponse(res);
                window.App.controller.basicInfo();
    		}
    	});
    },

    searchRecentGames: function(){
        var name = $(this.el).find("#inputPlayerName").val();
        if (name==''){
            alert('Please enter a name');
            return;
        }

        server.submitRecentGamesInquiry(name, function(res, status){
            if (status=='error'){
                var renderHTML = errorPage();
                $(this.el).html(renderHTML);
                // alert(res.status+" "+res.statusText);
            }else{
                // console.log(res);
                window.App.data.collection.parseResponse(res);
                window.App.controller.recentGames();
            }
        });
    },
	
	render: function(){
		var renderHTML = indexPage();
		$(this.el).html(renderHTML);
	}
});