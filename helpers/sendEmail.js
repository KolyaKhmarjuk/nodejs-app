const nodemailer = require("nodemailer");
require("dotenv").config();

const { SECRET_PASS } = process.env;

const nodemailerConfig = {
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: "flinched777@gmail.com",
		pass: SECRET_PASS,
	},
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
	const email = { ...data, from: "kolyakhmarjuk@meta.ua" };
	transport
		.sendMail(email)
		.then(() => console.log("Email sending succes"))
		.catch((error) => console.log(error));
};

module.exports = sendEmail;
