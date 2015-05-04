var $           = require('jquery');
var Backbone    = require('backbone');
Backbone.$      = $;

module.exports = BasicInfo = Backbone.Model.extend({

    defaults: {
    	databaseId : '',
    	summonerName : '',
    	summonerId : undefined,
    	summonerLevel : undefined,
    	profileIconId : undefined
    },

    parseMessage : function(obj){
    	this.set('databaseId', obj['_id']);
    	this.set('summonerName', obj['summonerName']);
    	this.set('summonerId', obj['summonerId']);
    	this.set('summonerLevel', obj['summonerLevel']);
    	this.set('profileIconId', obj['profileIconId']);
    },

    printAttribute: function(){
        console.log("databaseId:" + this.get('databaseId'));
        console.log("summonerName:" + this.get('summonerName'));
        console.log("summonerId:" + this.get('summonerId'));
        console.log("summonerLevel:" + this.get('summonerLevel'));
        console.log("profileIconId:" + this.get('profileIconId'));
    },

    resetAll: function(){
        console.log("resetAll");
        this.clear().set(this.defaults);
    },

});
