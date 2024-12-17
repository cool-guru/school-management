const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
    capacity: { type: Number, required: true },
    occupiedSeats: { type: Number, default: 0 },
    resources: [
        {
            type: { type: String, required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
