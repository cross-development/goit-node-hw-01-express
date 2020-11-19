//Core
const { Router } = require('express');
//Controller
const contactsController = require('./contacts.controller');

//Init router
const contactRouter = Router();

// @ GET /api/contacts
contactRouter.get('/', contactsController.listContacts);

// @ GET /api/contacts/:contactId
contactRouter.get('/:contactId', contactsController.getContactById);

// @ POST /api/contacts
contactRouter.post('/', contactsController.addContact);

// @ DELETE /api/contacts/:contactId
contactRouter.delete('/:contactId', contactsController.removeContact);

// @ PATCH /api/contacts/:contactId
contactRouter.patch('/:contactId', contactsController.updateContact);

module.exports = contactRouter;
