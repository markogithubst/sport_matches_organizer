const mongoose = require('mongoose');


const fieldSchema = mongoose.Schema({
    name: {
        type: String,

    },
    address: {
        type: String
    }

}, {
    timestamps: true,
    strict: true
});


module.exports = mongoose.model("Field", fieldSchema);