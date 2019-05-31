const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async token => {
	//verify auth token
	const googleUser = await verifyAuthToken(token);
	//check if user exists
	const user = await checkIfUserExists(googleUser.email);
	// if user exists, return them; otherwise, create new user
	return user ? user : createNewUser(googleUser);
};

const verifyAuthToken = async idToken => {
	try {
		const ticket = await client.verifyIdToken({
			idToken,
			audience: process.env.OAUTH_CLIENT_ID
		});
		return ticket.getPayload();
	} catch (err) {
		console.error("Error verifying auth token", err);
	}
};

const checkIfUserExists = async email => {
	return await User.findOne({ email }).exec();
};

const createNewUser = googleUser => {
	console.log("creating user");
	const { name, email, picture } = googleUser;
	const user = { name, email, picture };
	return new User(user).save();
};
