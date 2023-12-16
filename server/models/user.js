const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    mobile: {
        type: String
    },
    emailId: {
        type: String
    },
    city: {
        type: String
    },
    password: {
        type: String
    }
}, {
    timestamps: true
})

const user = mongoose.model("user", userSchema);

module.exports = user;