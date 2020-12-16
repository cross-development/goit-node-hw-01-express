//Core
const express = require('express');
//Middleware
const cors = require('cors');
require('dotenv').config();
//Routes
const contactRouter = require('./contacts/contacts.router');

class ContactsServer {
	//Initial server
	constructor() {
		this.server = null;
	}

	//Start server
	start() {
		this.initServer();
		this.initMiddleware();
		this.initRoutes();
		this.startListening();
	}

	//Init server
	initServer() {
		this.server = express();
	}

	//Init middleware
	initMiddleware() {
		this.server.use(express.json());
		this.server.use(cors({ origin: 'http://localhost:3000' }));
	}

	//Init routes
	initRoutes() {
		this.server.use('/api/contacts', contactRouter);
	}

	//Start listening on port 2000
	startListening() {
		this.server.listen(process.env.PORT, () => {
			console.log('Server started listening on port', process.env.PORT);
		});
	}
}

module.exports = ContactsServer;
