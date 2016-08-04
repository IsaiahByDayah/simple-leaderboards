var siteName = "Simple Leaderboards";

var home = function(req, res){
	res.render('home', {
		title: siteName
	});
};

var about = function(req, res){
	res.render('about',{
		title: siteName + " | About",
		user: {
			isLoggedIn: req.session.account
		}
	});
};

var contact = function(req, res){
	res.render('contact',{
		title: siteName + " | Contact",
		user: {
			isLoggedIn: req.session.account
		}
	});
};

module.exports.home = home;
module.exports.about = about;
module.exports.contact = contact;