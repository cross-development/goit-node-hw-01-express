//Validation package
const Joi = require('joi');

//The middleware validate contact credential
function validateCreateContact(req, res, next) {
	const contactRules = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().required(),
		phone: Joi.string().required(),
	});

	const validatedContact = contactRules.validate(req.body);
	// const validatedContact = Joi.validate(req.body, contactRules);

	if (validatedContact.error) {
		return res.status(400).send({ message: 'missing required name field' });
	}

	next();
}

module.exports = { validateCreateContact };
