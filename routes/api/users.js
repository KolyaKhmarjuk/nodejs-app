const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/users/index");
const { schemas } = require("../../models/user");
const { validationBody, authenticate, upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

// singup
router.post(
	"/singup",
	validationBody(schemas.registerSchema),
	ctrlWrapper(ctrl.singup)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post(
	"/verify",
	validationBody(schemas.verifyEmail),
	ctrlWrapper(ctrl.resendVerifyEmail)
);

// singin
router.post(
	"/singin",
	validationBody(schemas.loginSchema),
	ctrlWrapper(ctrl.singin)
);

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.get("/current", authenticate, ctrlWrapper(ctrl.current));
router.patch("/", authenticate, ctrlWrapper(ctrl.subscription));

router.patch(
	"/avatars",
	authenticate,
	upload.single("avatar"),
	ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
