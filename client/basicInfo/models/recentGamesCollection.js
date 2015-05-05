var $           = require('jquery');
var Backbone    = require('backbone');
Backbone.$      = $;

module.exports = RecentGames = Backbone.Collection.extend({
	model: game;
});

var Game = Backbone.Model.extend({
	defaults: {
		gameId: undefined,
		championName: '',
		// fellowPlayers: '',
		totalDamageDealtToChampions: undefined,
		totalDamageTaken: undefined,
		killingSprees: undefined
	},
});