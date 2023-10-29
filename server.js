const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
	"mongodb+srv://kolya:PeAzay0yttEWOTDG@cluster0.vywkfop.mongodb.net/contacts_reader";

mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(3000, () => {
			console.log("Database connection successful");
		});
	})
	.catch((error) => {
		console.log(error.message);
		process.exit(1);
	});
