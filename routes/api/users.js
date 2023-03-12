const express = require("express");
const { auth, upload,ctrlWrapper,validation } = require("../../middlewares");
const router = express.Router();
const { users: ctrl } = require("../../controllers/");
const {verifyEmailJoiSchema} = require("../../models/user");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatars", auth, upload.single("avatar"),ctrlWrapper(ctrl.updateAvatar));
router.get('verify/:verificationToken',ctrlWrapper(ctrl.verifyEmail))
router.post("verify",validation(verifyEmailJoiSchema),ctrlWrapper(ctrl.resendVerifyEmail))
module.exports = router;