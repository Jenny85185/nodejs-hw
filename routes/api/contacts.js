const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validation,ctrlWrapper,auth } = require("../../middlewares");
const { contactJoiSchema,contactSchemaUpdate,favoriteSchema } = require("../../models/contact");


router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId",auth, ctrlWrapper(ctrl.getContactId));

router.post("/", auth, validation(contactJoiSchema), ctrlWrapper( ctrl.getPost));

router.delete("/:contactId", auth, ctrlWrapper(ctrl.getDelete));

router.put("/:contactId", auth,validation(contactSchemaUpdate),ctrlWrapper( ctrl.getPost));

router.patch("/:contactId/favorite", auth,validation(favoriteSchema),ctrlWrapper(ctrl.getPatch));

module.exports = router;