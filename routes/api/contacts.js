const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts/index");

const { addSchema, updateFavoriteSchema } = require("../../models/contacts");
const {
	validationBody,
	isValidId,
	authenticate,
} = require("../../middlewares");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, ctrl.getById);

router.post("/", authenticate, validationBody(addSchema), ctrl.add);

router.put(
	"/:contactId",
	authenticate,
	isValidId,
	validationBody(addSchema),
	ctrl.updateById
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeById);

router.patch(
	"/:contactId/favorite",
	authenticate,
	isValidId,
	validationBody(updateFavoriteSchema),
	ctrl.updateStatusId
);

module.exports = router;
