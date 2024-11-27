const express = require("express");
const adminController = require("../controllers/admin.controller");
const router = express.Router();

router.post('/add-printer', adminController.addPrinter);

module.exports = router;
