const express = require("express");
const { registerUser, loginUser, deleteUser } = require("../controllers/authController");
const { validateUser } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);
router.delete("/delete", deleteUser);

module.exports = router;
