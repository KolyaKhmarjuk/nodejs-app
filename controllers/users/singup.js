const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");

const singup = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) throw HttpError(409);

	const createHashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);

	const verificationToken = nanoid();

	const newUser = await User.create({
		...req.body,
		password: createHashPassword,
		avatarURL,
		verificationToken,
	});

	const mail = {
		to: email,
		subject: "Подтверждение регистрации на сайте",
		html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}"> Click to verify your email</a>`,
	};
	await sendEmail(mail);

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: "starter",
		},
	});
};

module.exports = singup;
