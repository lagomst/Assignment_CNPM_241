const express = require("express");
const adminController = require("../controllers/admin.controller");
const router = express.Router();

//Printer
router.get('/view-printer', adminController.viewPrinter);
router.put('/add-printer', adminController.addPrinter);
router.post('/delete-printer', adminController.deletePrinter)
router.post('/edit-printer', adminController.editPrinter)

//Order
router.get('/view-order', adminController.viewOrder)
router.post('/confirmOrder', adminController.confirmOrder)

//Report
router.get('/view-report', adminController.viewReport)
router.post('/resolve-report', adminController.resolveReport)

module.exports = router;
