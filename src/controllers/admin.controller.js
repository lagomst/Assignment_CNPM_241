const Printer = require("../models/printer.js")
const Order = require("../models/order.js")
const Report = require("../models/report.js")
const DB = require('../pseudo-databasejs.js')

const viewPrinter = async (req, res) => {
    const body = req.body
    try {
        const printer = await Printer.findAll()
        res.status(201).json(printer);
    } catch (e) {
        res.status(400).json({ message: "Adding printer failed!" });
        console.log(e)
    }
} 

const addPrinter = async (req, res) => {
    const body = req.body
    try {
        const newPrinter = await new Printer({
            'name': body.name,
            'type': body.type,
            'location': body.location,
            'isActivated': body.isActivated,
            'description': body.description
        })
        await newPrinter.save()
        res.status(201).json({ message: "Add successfully", newPrinter });
    } catch (e) {
        res.status(400).json({ message: "Adding printer failed!" });
        console.log(e)
    }
}

const deletePrinter = async (req, res) => {
    const body = req.body
    try {
        const find_filer = { "name": body.name }
        const printer = await Printer.findOneAndDelete(find_filer)
        if (!printer) {
            return res.status(404).json({ message: "Printer not found." });
        }
        res.status(200).json({ message: "Printer deleted successfully." });
    }
    catch (e) {
        res.statues(400).error(e)
    }
}

const editPrinter = async (req, res) => {
    const body = req.body
    try {
        const find_filter = { "name": body.name }
        const update_filter = {
            'name': body.name,
            'type': body.type,
            'location': body.location,
            'isActivated': body.isActivated,
            'description': body.description
        }
        const option_filer = { "new": true }
        const printer = await Printer.findOneAndUpdate(find_filter, update_filter, option_filer)
        if (!printer) {
            res.status(404).json({ message: "Printer not exist!" })
        }
        res.status(200).json(printer)
    } catch (e) {
        res.status(400).json({ message: "Adding printer failed!" });
        console.log(e)
    }
}

const confirmOrder = async (req, res) => {
    const body = req.body
    try {
        const find_filter = { "name": body.ObjectID }
        const update_filter = { 'confirmedByAdmin': true }
        const option_filer = { "new": true }
        const order = await Order.findOneAndUpdate(find_filter, update_filter, option_filer)
        if (!order) {
            res.status(404).json({ message: "Order not exist!" })
        }
        res.status(200).json(order)
    } catch (e) {
        res.status(400).json({ message: "Adding printer failed!" });
        console.log(e)
    }
}

const viewOrder = async (req, res) => {
    const body = req.body
    try {
        const order = await Order.findAll()
        res.status(200).json(order)
    } catch (e) {
        res.status(400).json({ message: "Adding printer failed!" });
        console.log(e)
    }
}

const viewReport = async (req, res) => {
    const body = req.body
    try {
        const find_filter = {"isResolved": false}
        const reports = await Report.findAll(find_filter)
        res.status(200).json(reports)
    } catch (e) {
        res.status(400).json({ message: "Adding printer failed!" });
        console.log(e)
    }
}

const resolveReport = async (req, res) => {
    const body = req.body
    try {
        find_filter = {"_id": body._id}
        update_filter = {"isResolved": true}
        option_filter = {new: true}
        const reports = await Report.findOne(find_filter, update_filter, option_filter)
        res.status(200).json(reports)
    } catch (e) {
        res.status(400).json({ message: "Adding printer failed!" });
        console.log(e)
    }
}

module.exports = {
    viewPrinter,
    addPrinter,
    deletePrinter,
    editPrinter,
    viewOrder,
    confirmOrder,
    viewReport,
    resolveReport
}