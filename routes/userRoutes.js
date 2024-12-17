const express = require('express');
const router = express.Router();

module.exports = (managers) => {
    const userManager = managers.user;

    // Register user
    router.post('/register', async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const result = await userManager.createUser({ username, email, password });
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // Login user
    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await userManager.loginUser({ email, password });
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    });

    return router;
};
