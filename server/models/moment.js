const mongoose = require("mongoose");

const momentSchema = new mongoose.Schema({
    title: {
        type: String
    },
    tag: {
        type: Object
    },
    document: {
        type: Object
    }
}, {
    timestamps: true
})

const moment = mongoose.model("moment", momentSchema);

module.exports = moment;