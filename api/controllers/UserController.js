/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
	 * Sign up for a user account.
	 */
	signup: function(req, res) {
		/* Use node machines to do encrypting of passwords. */
		var Passwords = require('machinepack-passwords');

		// Encrypt a string using the aCrypt algorithm
		Passwords.encryptPassword({
			password: req.param('password'),
			difficulty: 10
		}).exec({
			// An unexpected error occurred.
			error: function(err) {
				return res.negotiate(err);
			},
			// OK.
			success: function(encryptedPassword) {
				require('machinepack-gravatar').getImageUrl({
					emailAddress: req.param('email')
				}).exec({
					error: function(err) {
						return res.negotiate(err);
					},
					success: function(gravatarUrl) {
						// Create a user with the params sent from the sign-up form --> signup.ejs
						User.create({
							name: req.param('name'),
							title: req.param('title'),
							email: req.param('email'),
							encryptedPassword: encryptedPassword,
							lastLoggedIn: new Date(),
							gravatarUrl: gravatarUrl
						}, function userCreated(err, newUser) {
							if ( err ) {
								console.log("err: ", err);
								console.log("err.invalidAttributes: ", err.invalidAttributes);

								// If this is a uniqueness error about the email attribute,
								// send back an easily parseable status code.
								if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
									&& err.invalidAttributes.email[0].rule === 'unique') {
									return res.emailAddressInUse();
								}

								// Otherwise, send back something reasonable as our error response.
								return res.negotiate(err);
							}

							// Send back the ID of the new user
							return res.json({
								id: newUser.id
							});
						});
					}
				});
			}
		});
	}
};
