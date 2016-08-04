var _ = require('underscore');
var models = require('../models');
var url = require('url');

var Score = models.Score;

// GET - Page
var gamePage = function(req, res) {
	if (req.params.gameTitle != undefined) {
		// console.log(req.params.gameTitle);

		Score.ScoreModel.getScoresForGame(req.params.gameTitle, function (err, scores){
			if (err || !scores) {
				console.log("No scores found");
				return res.status(400).json({error: "Could not find scores for given title"});
			}

			res.render('game', {
				game: req.params.gameTitle,
				scores: scores
			});
		});
	}
	else {
		res.redirect('/Home');
	}
};

// GET - json
var scoresForGame = function(req, res) {
	if (req.params.gameTitle != undefined) {
		// console.log(req.params.gameTitle);

		Score.ScoreModel.getScoresForGame(req.params.gameTitle.toLowerCase(), function (err, scores){
			if (err || !scores) {
				console.log("No scores found");
				return res.status(400).json({error: "Could not find scores for given title"});
			}

			// console.log(scores.length + " total scores exist for game: " + req.params.gameTitle);

			// console.log("Scores sorted:");
			// console.log(scores);

			var topScores = removeLastIfOver(scores, 10);

			// console.log("Top Scores:");
			// console.log(topScores);

			Score.ScoreModel.scoresToAPI(topScores, function(err, scoresAPI){
				res.json({
					count: scoresAPI.length,
					scores: scoresAPI
				});
			});
		});
	}
	else {
		res.status(400).json({error:'No game title provided'});
	}
};

// POST - redirect json
var addScore = function(req, res) {
	// console.log("Req");
	// console.log(req);
	// console.log("Body");
	// console.log(req.body);
	// console.log("Query");
	// console.log(req.query);
	if (!req.body.game) {
		return res.status(400).json({error: "Game not set"});
	}
	if (!req.body.value) {
		return res.status(400).json({error: "Value not set"});
	}
	if (!req.body.user) {
		return res.status(400).json({error: "User not set"});
	}

	var gameValue = req.body.game.toLowerCase();
	var valueValue = parseInt(req.body.value);
	if (isNaN(valueValue)) valueValue = 0;
	var userValue = req.body.user;

	var scoreData = {
		game: gameValue,
		value: valueValue,
		user: userValue
	};

	var newScore = new Score.ScoreModel(scoreData);

	newScore.save(function(err){
		if(err) {
			console.log(err);
			return res.status(400).json({error:'An error occurred saving new score'});
		}

		res.json({redirect: '/Game/'+req.body.game});
	});
};

// Helper
function removeLastIfOver(arr, max) {
	// console.log("Arr");
	// console.log(arr);
	// console.log("Score count:" + arr.length);
	// console.log("Max: " + max);
	if (arr.length <= max) {
		// console.log("Only " + max + " scores, returning.");
		return arr;
	}
	else {
		// console.log("Too many scores:" + arr.length);
		var lowest = arr.pop();
		// console.log("lowest score:");
		// console.log(lowest);
		// console.log("Score count now: " + arr.length);
		// console.log("Attempting to delete lowest...");
		lowest.remove();
		// console.log("Calling again");
		return removeLastIfOver(arr, max);
	}
}

module.exports.gamePage = gamePage;
module.exports.scoresForGame = scoresForGame;
module.exports.addScore = addScore;
