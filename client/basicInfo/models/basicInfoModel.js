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

    parseResponse: function(response){
    	this.set('databaseId', response['_id']);
    	this.set('summonerName', response['summonerName']);
    	this.set('summonerId', response['summonerId']);
    	this.set('summonerLevel', response['summonerLevel']);
    	this.set('profileIconId', response['profileIconId']);
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
