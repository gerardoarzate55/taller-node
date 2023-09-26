const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
    const query = `SELECT * FROM user`;
    const queryResult = await db.query(query);
    return res.status(200).send({ code: 200, message: queryResult })
});

router.get('/:id([0-9]+)', async (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM user WHERE user_id = ${id}`;

    const queryResult = (await db.query(query))[0];

    if (queryResult == undefined) {
        return res.status(404).send({ code: 404, message: 'Usuario no encontrado' });
    }

    return res.status(200).send({ code: 200, message: queryResult });
});

router.post('/', async (req, res) => {
    const params = req.body;
    const userName = params.userName ? `'${params.userName}'` : null;
    const userMail = params.userMail ? `'${params.userMail}'` : null;
    const userPassword = params.userPassword ? `'${params.userPassword}'` : null;

    let query = `INSERT INTO user (user_name, user_mail, user_password)`;
    query += ` VALUES(${userName}, ${userMail}, ${userPassword})`;

    try {
        const queryResult = await db.query(query);

        if (queryResult.affectedRows < 1) {
            throw new Error('Se ejecutó la query pero no se insertaron datos');
        }

        return res.status(201).send({ code: 201, message: 'Usuario registrado existosamente' });
    } catch (e) {
        return res.status(500).send({ code: 500, message: `Ocurrió un error: ${e.message}` });
    }
});


module.exports = router;
