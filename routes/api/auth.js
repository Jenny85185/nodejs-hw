const express = require("express");
const router = express.Router();

const { auth,validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers/");
const { registerJoiSchema, loginJoiSchema } = require("../../models/user");

router.post("/register",validation(registerJoiSchema),ctrlWrapper(ctrl.register));
router.post('/login',validation(loginJoiSchema),ctrlWrapper(ctrl.login));
router.post('/logout', auth, ctrlWrapper(ctrl.logout));
module.exports = router;
