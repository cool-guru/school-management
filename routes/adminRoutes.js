const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');

module.exports = (managers) => {
    const { schoolManager } = managers;

    router.post('/schools', authenticateJWT, authorizeRoles(['superadmin']), async (req, res) => {
        try {
            const school = await schoolManager.createSchool(req.body);
            res.status(201).json(school);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    router.get('/schools', authenticateJWT, authorizeRoles(['superadmin']), async (req, res) => {
        const schools = await schoolManager.getSchools();
        res.json(schools);
    });

    router.get('/schools/:id', authenticateJWT, authorizeRoles(['superadmin']), async (req, res) => {
        try {
            const school = await schoolManager.getSchoolById(req.params.id);
            if (!school) return res.status(404).json({ error: 'School not found' });
            res.json(school);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    router.put('/schools/:id', authenticateJWT, authorizeRoles(['superadmin']), async (req, res) => {
        try {
            const updatedSchool = await schoolManager.updateSchool(req.params.id, req.body);
            if (!updatedSchool) return res.status(404).json({ error: 'School not found' });
            res.json(updatedSchool);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    router.delete('/schools/:id', authenticateJWT, authorizeRoles(['superadmin']), async (req, res) => {
        try {
            await schoolManager.deleteSchool(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    return router;
};
