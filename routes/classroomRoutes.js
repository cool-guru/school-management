const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');

module.exports = (managers) => {
    const classroomManager = managers.classroom;

    router.post('/classroom', authenticateJWT, authorizeRoles(['superadmin', 'school-admin']), async (req, res) => {
        try {
            const classroom = await classroomManager.createClassroom(req.body);
            res.status(201).json(classroom);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    router.get('/classroom/:schoolId', authenticateJWT, authorizeRoles(['superadmin', 'school-admin']), async (req, res) => {
        try {
            const classrooms = await classroomManager.getClassroomsBySchool(req.params.schoolId);
            res.json(classrooms);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
        
    });

    router.put('/classroom/:id/capacity', authenticateJWT, authorizeRoles(['superadmin', 'school-admin']), async (req, res) => {
        try {
            const updated = await classroomManager.updateClassroomCapacity(req.params.id, req.body.capacity);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    router.put('/classroom/:id/resources', authenticateJWT, authorizeRoles(['superadmin', 'school-admin']), async (req, res) => {
        try {
            const updated = await classroomManager.updateResources(req.params.id, req.body.resources);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    router.get('/classroom/:id/available-seats', authenticateJWT, authorizeRoles(['superadmin', 'school-admin']), async (req, res) => {
        try {
            const availableSeats = await classroomManager.getAvailableSeats(req.params.id);
            res.json({ availableSeats });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    return router;
};
