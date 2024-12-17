const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    address: { type: String, required: true, minlength: 10, maxlength: 200 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('School', SchoolSchema);
