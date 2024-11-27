const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    mssv: {
        type: String,
        required: true
    },
    paper_credit: {
        type: Number
    }
});
const userModel = mongoose.model('user', userSchema);
module.exports = userModel