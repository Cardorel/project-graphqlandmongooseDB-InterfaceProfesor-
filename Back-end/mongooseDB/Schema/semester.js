const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const semesterSchema = new Schema({
    semester: String
})



module.exports = mongoose.model("semester" , semesterSchema)