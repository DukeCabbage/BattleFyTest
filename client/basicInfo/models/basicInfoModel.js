var $           = require('jquery');
var Backbone    = require('backbone');
Backbone.$      = $;

module.exports = Registration = Backbone.Model.extend({

    defaults: {
    	databaseId : '',
    	summonerName : '',
    	summonerId : undefined,
    	summonerLevel : undefined,
    	profileIconId : undefined
    },

    parseMessage : function(msg){
    	var obj = JSON.parse(msg);
    	this.set('databaseId', obj['_id']);
    	this.set('summonerName', obj['summonerName']);
    	this.set('summonerId', obj['summonerId']);
    	this.set('summonerLevel', obj['summonerLevel']);
    	this.set('profileIconId', obj['profileIconId']);
    },

    printAttribute: function(){
        console.log("databaseId:" + this.databaseId);
        console.log("summonerName:" + this.summonerName);
        console.log("summonerId:" + this.summonerId);
        console.log("summonerLevel:" + this.summonerLevel);
        console.log("profileIconId:" + this.profileIconId);
    },

    resetAll: function(){
        console.log("resetAll");
        this.clear().set(this.defaults);
    },

});
