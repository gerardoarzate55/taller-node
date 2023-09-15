const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

const puerto = 12345;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200);
    res.send('Bienvenido al Pokédex');
});

app.get('/pokemon', (req, res) => {
    res.status(200);
    res.send(pokemon);
});

app.get('/pokemon/:pokeId([0-9]{1,3})', (req, res) => {
    const { pokeId } = req.params;
    const pokeData = pokemon[pokeId - 1];

    if (pokeData == undefined) {
        res.status(404);
        res.send('Pokémon no encontrado');
        return;
    }
    
    res.status(200);
    res.send(pokeData);
})

app.get('/pokemon/:pokeName([A-Za-z]+)', (req, res) => {
    const pokeName = req.params.pokeName.toLowerCase();
    const pokeData = pokemon.find(pkm => pokeName == pkm.name.toLowerCase());

    if (pokeData == undefined) {
        res.status(404);
        res.send('Pokémon no encontrado');
        return;
    }

    res.status(200);
    res.send(pokeData);
});

app.post('/pokemon', (req, res) => {
    return res.send(req.body);
});

app.listen(process.env.PORT || puerto, () => console.log(`Servidor iniciado en el puerto ${puerto}`));