const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	const contacts = JSON.parse(data);
	return contacts;
}

const updateContacts = async (contactId, contact) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	contacts[index] = { ...contact, contactId };
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return contacts[index];
};

async function getContactById(id) {
	const contacts = await listContacts();
	const contactById = contacts.find((item) => item.id === id);
	return contactById || null;
}

async function addContact({ name, email, phone }) {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
}

async function removeContact(id) {
	const contacts = await listContacts();
	const deleteIdxContact = contacts.findIndex((item) => item.id === id);
	if (deleteIdxContact === -1) return null;
	const [result] = contacts.splice(deleteIdxContact, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return result;
}

module.exports = {
	getContactById,
	addContact,
	removeContact,
	updateContacts,
	listContacts,
};
