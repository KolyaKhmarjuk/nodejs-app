const { Contact } = require("../../models/contacts");

const getById = async (req, res) => {
	const { contactId } = req.params;
	const contactById = await Contact.findById(contactId);
	if (!contactById) {
		res.status(400).json({
			status: `Failure, we didn't find the contact width id=${contactId}`,
		});
	}
	res.json(contactById);
};

module.exports = getById;
