//Core
const fsPromises = require('fs/promises');
const path = require('path');
//Utils
const { uuid } = require('uuidv4');
//Data path
const contactsPath = path.join(__dirname, '../../db/contacts.json');

//Read: return contacts list
async function listContacts(req, res, next) {
	try {
		const data = await fsPromises.readFile(contactsPath, 'utf-8');
		const parsedData = await JSON.parse(data);

		return await res.json(parsedData);
	} catch (error) {
		console.error(error);
	}
}

//Read: return contact by id
async function getContactById(req, res, next) {
	const { contactId } = req.params;

	try {
		const data = await fsPromises.readFile(contactsPath, 'utf-8');
		const parsedData = await JSON.parse(data);

		const contactById = await parsedData.find(({ id }) => id === contactId);

		contactById
			? await res.json(contactById)
			: await res.status(404).send({ message: 'Not found' });
	} catch (error) {
		console.error(error);
	}
}

//Create: received contact data and return created contact with id
async function addContact(req, res, next) {
	const { name, email, phone } = req.body;

	try {
		const data = await fsPromises.readFile(contactsPath, 'utf-8');

		const id = (await JSON.parse(data).length) + 1;

		const rewroteContactList = await JSON.parse(data).concat({ id, name, email, phone });
		const stringifiedRewroteList = JSON.stringify(rewroteContactList, null, 2);

		await fsPromises.writeFile(contactsPath, stringifiedRewroteList, 'utf-8');

		console.log('The contact has been added!');
	} catch (error) {
		console.error(error);
	}
}

//Delete: remove contact by id
async function removeContact(req, res, next) {
	const { contactId } = req.params;

	try {
		const data = await fsPromises.readFile(contactsPath, 'utf-8');

		const rewroteList = await JSON.parse(data).filter(({ id }) => id !== contactId);
		const stringifyRewroteList = JSON.stringify(rewroteList, null, 2);

		await fsPromises.writeFile(contactsPath, stringifyRewroteList, 'utf-8');

		console.log('The contact has been removed!');
	} catch (error) {
		console.error(error);
	}
}

//Update: update contact information by id
async function updateContact(req, res, next) {
	const { contactId } = req.params;

	try {
	} catch (error) {
		console.error(error);
	}
}

module.exports = { listContacts, addContact, removeContact, getContactById, updateContact };
