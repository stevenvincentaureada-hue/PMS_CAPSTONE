const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");

router.post("/register", validate(["email", "password", "first_name", "last_name"]), authController.register);
router.post("/login", validate(["email", "password"]), authController.login);

module.exports = router;
