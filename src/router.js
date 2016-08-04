var controllers = require('./controllers');

var setupRoutes = function(app){

	// Static Page Handling
	app.get('/', controllers.Static.home);
	app.get('/Home', controllers.Static.home);
	// app.get('/About', controllers.Static.about);
	// app.get('/Contact', controllers.Static.contact);

	// Leaderboard Page Handling
	app.get('/Game/:gameTitle', controllers.Score.gamePage);

	// Leaderboard API handling
	app.get('API/Scores/:gameTitle', controllers.Score.scoresForGame);
	app.post('API/Scores', controllers.Score.addScore);

	// 404 Handling
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
};

module.exports.setupRoutes = setupRoutes;