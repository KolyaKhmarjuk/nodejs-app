const contactsOperations = require("../../models/contacts");

const updateById = async (req, res) => {
	const { contactId } = req.params;
	const result = await contactsOperations.updateContacts(contactId, req.body);
	res.json({
		status: "success",
		code: 200,
		data: {
			result,
		},
	});
};

module.exports = updateById;
