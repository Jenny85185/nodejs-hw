const express = require("express");
const { auth, upload,ctrlWrapper } = require("../../middlewares");
const router = express.Router();
const { users: ctrl } = require("../../controllers/");


router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatars", auth, upload.single("avatar"),ctrlWrapper(ctrl.updateAvatar));
module.exports = router;