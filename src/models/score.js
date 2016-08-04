var mongoose = require('mongoose');
var _ = require('underscore');

var ScoreModel;

var ScoreSchema = new mongoose.Schema({
	game: {
		type: String,
		required: true
	},

	value: {
		type: Number,
		required: true
	},

	user: {
		type: String,
		required: true
	},

	createdDate: {
		type: Date,
		default: Date.now
	},
});

// Instance Methods
ShipmentSchema.methods.toAPI = function(callback) {
	callback(null, {
		value: this.value,
		user: this.user
	});
};


// Static Functions
ScoreSchema.statics.findByGame = function(gameTitle, callback) {

	var search = {
		game: gameTitle
	};

	return ScoreModel.find(search).exec(callback);
};

ScoreSchema.statics.scoresToAPI = function(scores, callback) {
	if (scores.length < 1) return callback(null, []);

	var goal = scores.length;

	var apis = [];

	for (var i = 0; i < goal; i++) {
		(function(index){
			scores[index].toAPI(function(err, api){
				if (err || !api) {
					console.log("Could not get API for element: " + i);
					return callback(err, undefined);
				}
				apis[index] = api;

				if (isFilled(apis, goal)) {
					// console.log("APIs done!");
					return callback(null, apis);
				}
			});
		})(i);
	}
};

ScoreSchema.statics.getScoresForGame = function(gameTitle, callback) {

	ScoreModel.findByGame(gameTitle, function(err, scores) {

		if(err || !scores) {
			console.log("An error occurred finding by game");
			return callback(err, undefined);
		}

		var halfSortedScores = _.sortBy(scores, function(score){
			return score.createdDate;
		});

		var sortedScores = _.sortBy(halfSortedScores, function(score){
			return -score.value;
		});

		return callback(null, sortedScores);
	});
};

function isFilled(arr, goal) {
	var bool = true;

	for (var i = 0; i < goal; i++) {
		if (arr[i] == undefined) bool = false;
	}

	return bool;
}

ScoreModel = mongoose.model('Score', ScoreSchema);

module.exports.ScoreModel = ScoreModel;
module.exports.ScoreSchema = ScoreSchema;