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
    const params = req.body;
    const pok_name = params.pok_name || null;
    const pok_height = params.pok_height || null;
    const pok_weight = params.pok_weight || null;
    const pok_base_experience = params.pok_base_experience || null;

    let query = 'INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)';
    query += `VALUES ('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;

    try {
        const queryResult = await db.query(query);

        if (queryResult.affectedRows < 1) {
            throw new Error('Se ejecutó la query pero no se insertaron datos');
        }

        return res.status(201).send({ code: 201, message: 'Pokémon insertado correctamente' });
    } catch(e) {
        return res.status(500).send({ code: 500, message: `Ocurrió un error: ${e.message}` });
    }

});

module.exports = router;