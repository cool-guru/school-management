const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    classroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
    enrollmentDate: { type: Date, default: Date.now },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    profilePicture: { type: String, required: false },
});

module.exports = mongoose.model('Student', StudentSchema);
