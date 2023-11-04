const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const HttpError = require("../../helpers");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
	try {
		const { path: tempUpload, filename } = req.file;
		const { _id } = req.user;
		const [extention] = filename.split(".").reverse();
		const avatarName = `${_id}.${extention}`;
		const resultUpload = path.join(avatarsDir, avatarName);

		Jimp.read(tempUpload)
			.then((image) => image.resize(250, 250))
			.then((image) => image.write(resultUpload))
			.catch((err) => {
				console.log(err);
			});

		await fs.rename(tempUpload, resultUpload);
		const avatarURL = path.join("avatars", resultUpload);
		await User.findByIdAndUpdate(_id, { avatarURL });
		res.json({
			avatarURL,
		});
	} catch (error) {
		await fs.unlink(req.file.path);
		throw HttpError(401);
	}
};

module.exports = updateAvatar;
