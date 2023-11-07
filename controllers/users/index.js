const singup = require("./singup");
const singin = require("./singin");
const logout = require("./logout");
const current = require("./current");
const subscription = require("./subscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
	singup,
	singin,
	logout,
	current,
	subscription,
	updateAvatar,
	verifyEmail,
	resendVerifyEmail,
};
