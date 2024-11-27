const User = require("../models/user.model.js")
const Order = require("../models/order.model.js")
const Printer = require("../models/printer.model.js")
const Report = require("../models/report.model.js")

//Add a course registered
const addOrder = async (req, res) => {
    const body = req.body
    try {
        const newOrder = await new Order({
            created_date: new Date().toISOString(),
            location: body.location,
            size: body.size,
            nb_papers: body.nb_papers,
            face: body.face,
            printer: body.printer,
            user: body.user
        })
        await newOrder.save()
        res.status(201).json({ message: "Add successfully", newOrder });
      } catch (e) {
        res.status(400).send(e);
    }
}

const purchasePaper = async (req, res) => {
    try {
        const mssv = req.user.mssv;
        const ammount = req.body.ammount
        const find_filter = { 'mssv': mssv };
        const update_filter = { $inc: { 'paper_credit': ammount } };
        const option = { new: true };
        const result = await User.updateOne(find_filter, update_filter, option);
        if (!result) {
            return res.status(404).send();
        }
        res.json(result);
    } catch (e) {
        res.status(400).send(e);
    }
}

const createReport = async (req, res) => {
    const body = req.body
    try {
        const newReport = await new Report({
            title: body.title,
            type: body.type,
            date: new Date().toISOString(),
            description: body.description
        })
        await newReport.save()
        res.status(201).json({ message: "Add successfully", newOrder });
      } catch (e) {
        res.status(400).send(e);
    }
}

module.exports = {
    createReport,
    purchasePaper,
    addOrder,
}