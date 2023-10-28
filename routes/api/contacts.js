const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts/index");
const { addSchema, updateFavoriteSchema } = require("../../models/contacts");
const { validationBody, isValidId } = require("../../middlewares");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validationBody(addSchema), ctrl.add);

router.put(
	"/:contactId",
	isValidId,
	validationBody(addSchema),
	ctrl.updateById
);

router.delete("/:contactId", isValidId, ctrl.removeById);

router.patch(
	"/:contactId/favorite",
	isValidId,
	validationBody(updateFavoriteSchema),
	ctrl.updateStatusId
);

module.exports = router;
