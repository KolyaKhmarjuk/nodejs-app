const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/users/index");
const { schemas } = require("../../models/user");
const { validationBody, authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

// singup
router.post(
	"/singup",
	validationBody(schemas.registerSchema),
	ctrlWrapper(ctrl.singup)
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

module.exports = router;
