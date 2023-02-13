const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4,
        maxLength: 16,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 25,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, 'Please enter a valid phone number']
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER']
    }

}, {
    timestamps: true,
    strict: true
});


module.exports = mongoose.model("User", userSchema);