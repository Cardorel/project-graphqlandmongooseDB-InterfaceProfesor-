const mongoose = require('mongoose');
const schema = mongoose.Schema;

const addressSchema = new schema({
    name : String,
    firstname : String,
    birthday : String,
    classID : String,
    groupID : String,
    start : Number,
    end : Number,
    reactJS: Number,
    vueJS: Number,
    angularJS : Number,
    nodeJS: Number,
    PHP: Number,
    dotNet: Number
})

module.exports = mongoose.model("Address" , addressSchema);