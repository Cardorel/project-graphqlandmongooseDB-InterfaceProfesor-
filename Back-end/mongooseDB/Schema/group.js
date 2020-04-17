const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    group: String
})

module.exports = mongoose.model("group" , groupSchema);