const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

const puerto = 12345;

app.get('/', (req, res) => {
    res.send('Bienvenido al Pokédex');
});

app.get('/pokemon', (req, res) => {
    res.send(pokemon);
});

app.get('/pokemon/:pokeId', (req, res) => {
    const { pokeId } = req.params;
    const pokeData = pokemon[pokeId - 1];

    res.send(pokemon[pokeId - 1]);
})

app.listen(process.env.PORT || puerto, () => console.log(`Servidor iniciado en el puerto ${puerto}`));