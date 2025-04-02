const express = require("express");
const { createExpense, getExpenses, updateExpense, deleteExpense } = require("../controllers/expenseController");
const { validateExpense } = require("../middlewares/expenseValidationMiddleware");
const { protect } = require("../middlewares/authMiddleware"); 
const upload = require('../utils/uploadConfig');

const router = express.Router();

router.post("/create", protect, upload.single('imagen'), validateExpense, createExpense); 
router.get("/list", protect, getExpenses); 
router.put("/:id", protect,upload.single('imagen'), validateExpense, updateExpense); 
router.delete("/:id", protect, deleteExpense); 

module.exports = router;
