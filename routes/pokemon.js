const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
    const data = await db.query('SELECT * FROM pokemon')
    return res.status(200).json({ code: 1, message: data });
});

router.get('/:pokeId([0-9]{1,3})', async (req, res) => {
    const { pokeId } = req.params;
    const data = (await db.query(`SELECT * FROM pokemon WHERE pok_id = ${pokeId}`))[0];
    
    if (data == undefined) {
        return res.status(404).json({ code: 404, message: 'Pokémon no encontrado' });
    }
    
    return res.status(200).json({ code: 1, message: data });
})

router.get('/:pokeName([A-Za-z]+)', async (req, res) => {
    const pokeName = req.params.pokeName.toLowerCase();
    const data = (await db.query(`SELECT * FROM pokemon WHERE pok_name = "${pokeName}"`))[0];

    if (data == undefined) {
        return res.status(404).send({ code: 404, message: 'Pokémon no encontrado' });
    }

    return res.status(200).json({ code: 1, message: data });
});

router.post('/', async (req, res) => {
    return res.status(200).send({ code: 1, message: req.body });
});

module.exports = router;