'use strict';

module.exports = function(){
	return {
		SignUpValidation: (req, res, next) => {
			req.checkBody('username', 'User name is REQUIRED').notEmpty();
			req.checkBody('username', 'User name Must Not Be Less Then 5').isLength({min:5});
			req.checkBody('email', 'Email is REQUIRED').notEmpty();
			req.checkBody('email', 'Email is Invalid').isEmail();
			req.checkBody('password', 'Password is REQUIRED').notEmpty();
			req.checkBody('password', 'Password Must Not Be Less Then 5').isLength({min:5});

			req.getValidationResult()
				.then((result) =>{
					const errors = result.array();
					const messages = [];
					errors.forEach((error) => {
						messages.push(error.msg);
					});
					req.flash('error', messages);
					req.redirect('/signup');
				})
				.catch((err) =>{
					return next();
				});
		},
		LoginValidation: (req, res, next) => {
			req.checkBody('email', 'Email is REQUIRED').notEmpty();
			req.checkBody('email', 'Email is Invalid').isEmail();
			req.checkBody('password', 'Password is REQUIRED').notEmpty();
			req.checkBody('password', 'Password Must Not Be Less Then 5').isLength({min:5});

			req.getValidationResult()
				.then((result) =>{
					const errors = result.array();
					const messages = [];
					errors.forEach((error) => {
						messages.push(error.msg);
					});
					req.flash('error', messages);
					req.redirect('/login');
				})
				.catch((err) =>{
					return next();
				});
		},
	}
}
