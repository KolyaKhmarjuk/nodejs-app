const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	if (!email) {
		throw HttpError(400, "Missing required field email");
	}

	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(400, "Email not found");
	}

	if (user.verify) {
		throw HttpError(400, "Verification has already been passed");
	}

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}"> Click to verify your email</a>`,
	};

	await sendEmail(verifyEmail);

	res.status(200).json({
		message: "Verificatin email resend",
	});
};

module.exports = resendVerifyEmail;
