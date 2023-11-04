const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const singup = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) throw HttpError(409);

	const createHashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);

	const newUser = await User.create({
		...req.body,
		password: createHashPassword,
		avatarURL,
	});

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: "starter",
		},
	});
};

module.exports = singup;
