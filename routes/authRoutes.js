const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { validateUser } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);

module.exports = router;
