const express = require('express');
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const {
  Contact,
  contactJoiSchema,
  contactSchemaUpdate,
  favoriteSchema,
} = require("../../models/contact");

router.get('/', async (req, res, next) => {
  const contacts = await Contact.find({});  
  res.status(200).json(contacts);
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);
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

  const { error } = contactJoiSchema.validate(req.body);
  if (error) {
    return res.status(400).json( {message: error.details[0].message} );
  }
  
  const { name, phone, email,favorite } = req.body;
  const dataWithId = { id: uuidv4(), name, email, phone,favorite  }
  console.log(dataWithId);
  const contact = await Contact.create(dataWithId);
  res.status(201).json(contact);
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;  
  const idDeleted = await Contact.findByIdAndRemove(id);
  if (!idDeleted) {
    return res.status(404).json({message: "Not found"});
  }
  res.status(200).json( {message: `contact deleted` });
});

router.put('/:contactId', async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (Object.entries(data).length === 0) {
    return res.status(400).json( {message: "missing required name field"} );
  }

  const { error } = contactSchemaUpdate.validate(req.body);
  if (error) {
    return res.status(400).json( {message: error.details[0].message} );
  }
  const id = req.params.contactId;

  
  const contact = await  Contact.findByIdAndUpdate(id, data);
  if (!contact) {
    return res.status(404).json({message: "missing fields"});
  }
  res.status(200).json( contact )
});



router.patch("/:contactId/favorite", async (req, res, next) => {
  const data = req.body;
  console.log(data);
  if (Object.entries(data).length === 0) {
    return res.status(400).json( {message: "missing field favorite"} );
  }

  const { error } = favoriteSchema.validate(req.body);
  if (error) {
    return res.status(400).json( {message: error.details[0].message} );
  }
  const id = req.params.contactId;
  const { favorite } = req.body;
  const contact = await  Contact.findByIdAndUpdate(id, { favorite },{ new: true });
  if (!contact) {
    return res.status(404).json({message: "Not found"});
  }
  res.status(200).json( contact )
 
});

module.exports = router;
