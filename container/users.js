'use strict';

module.exports = function (_, passport, User) {
	return {

		SetRouting: function(router)
		{
			router.get('/', this.indexPage);
			router.get('/signup', this.getSignUp);
			router.get('/home', this.homePage);
			router.get('/login', this.loginPage);



			router.post('/signup', User.SignUpValidation, this.postSignUp);
			router.post('/login', User.LoginValidation, this.postLogin);

		},
		
		indexPage: function(req, res){ // request, response
			return res.render('index', {test: 'This is a test'});
		},
		getSignUp: function(req, res){
			const errors = req.flash('error');
			return res.render('signup', { 
				title: 'Login', messages: errors, hasErrors: errors.length > 0
			});
		},
		homePage: function(req, res){
			return res.render('home');
		},
		loginPage: function (req, res) {
			const errors = req.flash('error');
			return res.render('login', { 
				title: 'SignUp', messages: errors, hasErrors: errors.length > 0
			});
		},
		postSignUp: passport.authenticate('local.signup',{
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
		}),
		postLogin: passport.authenticate('local.login',{
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true
		}),

	}
}