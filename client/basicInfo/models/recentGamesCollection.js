var $           = require('jquery');
var Backbone    = require('backbone');
Backbone.$      = $;

module.exports = RecentGames = Backbone.Collection.extend({
	model: Game,

	parseResponse: function(response){
		var length = response.length;
		for (var i=0; i<length; i++){
			var tempGame = new Game();
			tempGame.set('gameId', (response[i])['gameId']);
			var tempDate = new Date((response[i])['createDate']);
			tempGame.set('createDate', tempDate.toDateString());
			tempGame.set('championName', (response[i])['championName']);
			tempGame.set('totalDamageDealtToChampions', (response[i])['totalDamageDealtToChampions']);
			tempGame.set('totalDamageTaken', (response[i])['totalDamageTaken']);
			tempGame.set('killingSprees', (response[i])['killingSprees']);
			this.add(tempGame);
		}
		// this.printAll();
	},

	printAll: function(){
		var length = this.models.length;
		for (var i=0; i<length; i++){
			this.at(i).printAttribute();
		}
	}
});

var Game = Backbone.Model.extend({
	defaults: {
		gameId: undefined,
		createDate : '',
		championName: '',
		// fellowPlayers: '',
		totalDamageDealtToChampions: undefined,
		totalDamageTaken: undefined,
		killingSprees: undefined
	},

    printAttribute: function(){
        console.log("gameId:" + this.get('gameId'));
        console.log("createDate: " + this.get('createDate'));
        console.log("championName:" + this.get('championName'));
        console.log("totalDamageDealtToChampions:" + this.get('totalDamageDealtToChampions'));
        console.log("totalDamageTaken:" + this.get('totalDamageTaken'));
        console.log("killingSprees:" + this.get('killingSprees'));
    },
});