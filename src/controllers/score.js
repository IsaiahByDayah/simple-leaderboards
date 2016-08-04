var myPrivate = require("../private.json");
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

		Score.ScoreModel.getScoresForGame(req.params.gameTitle, function (err, scores){
			if (err || !scores) {
				console.log("No scores found");
				return res.status(400).json({error: "Could not find scores for given title"});
			}

			var topScores = removeLastIfOver(scores, myPrivate.numberOfScoresToKeep);

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
	if (!req.body.game) {
		return res.status(400).json({error: "Game not set"});
	}

	var scoreData = {
		game: req.body.game,
		value: req.body.value,
		user: req.body.user
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
	if (arr.length <= max) {
		return arr;
	}
	else {
		var lowest = arr.pop();
		lowest.remove(function(err){
			if (err) {
				console.log("Could not remove lowest score " + lowest.value + " for game " + lowest.game);
			}

			return removeLastIfOver(arr, max);
		});
	}
}

module.exports.gamePage = gamePage;
module.exports.scoresForGame = scoresForGame;
module.exports.addScore = addScore;
