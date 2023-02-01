const express = require('express')
const contactsApi = require('../../models/contacts.js');
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const router = express.Router();
const name = Joi.string();
const email = Joi.string();
const phone = Joi.string();

const schemaUpdate = Joi.object().keys({
  name: name,
  email: email,
  phone: phone,
});

const schema = Joi.object().keys({
  name: name.required(),
  phone: phone.required(),
  email: email.required(),
});


router.get('/', async (req, res, next) => {
  const contacts = await contactsApi.listContacts();  
  res.status(200).json(contacts);
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await contactsApi.getContactById(id);
  if (!contact) {
    return res.status(404).json({message: "Not found"});
  }
  res.status(200).json(contact);
})

router.post('/', async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (Object.entries(data).length === 0) {
    return res.status(400).json( {message: "missing required name field"} );
  }

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json( {message: error.details[0].message} );
  }
  
  const { name, phone, email } = req.body;
  const dataWithId = { id: uuidv4(), name, email, phone  }
  console.log(dataWithId);
  const contact = await contactsApi.addContact(dataWithId);
  res.status(201).json(contact);
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;  
  const idDeleted = await contactsApi.removeContact(id);
  if (!idDeleted) {
    return res.status(404).json({message: "Not found"});
  }
  res.status(204).json( {message: `User with id${idDeleted} was deleted` });
})

router.put('/:contactId', async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (Object.entries(data).length === 0) {
    return res.status(400).json( {message: "missing required name field"} );
  }

  const { error } = schemaUpdate.validate(req.body);
  if (error) {
    return res.status(400).json( {message: error.details[0].message} );
  }
  const id = req.params.contactId;
  
  const contact = await contactsApi.updateContact(id, data);
  if (!contact) {
    return res.status(404).json({message: "Not found"});
  }
  res.status(200).json( contact )
})

module.exports = router;
