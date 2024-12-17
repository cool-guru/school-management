const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');

module.exports = (managers) => {
    const studentManager = managers.student;

    router.post('/student', authenticateJWT, authorizeRoles(['superadmin', 'school-admin']), async (req, res) => {
        try {
            const student = await studentManager.enrollStudent(req.body);
            res.status(201).json(student);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    router.get('/student/:classroomId', authenticateJWT, authorizeRoles(['superadmin', 'school-admin']), async (req, res) => {
        const students = await studentManager.getStudentsByClassroom(req.params.classroomId);
        res.json(students);
    });

    router.put('/student/:id/transfer', authenticateJWT, authorizeRoles(['superadmin', 'school-admin']), async (req, res) => {
        try {
            const student = await studentManager.transferStudent(req.params.id, req.body.newClassroomId);
            res.json(student);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    router.put('/student/:id/profile', authenticateJWT, authorizeRoles(['superadmin', 'school-admin']), async (req, res) => {
        try {
            const updatedStudent = await studentManager.updateStudentProfile(req.params.id, req.body);
            res.json(updatedStudent);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    return router;
};
