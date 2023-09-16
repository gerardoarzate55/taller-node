const express = require('express');
const app = express();
const morgan = require('morgan');

const puerto = 12345;

const routers = {
    pokemon: require('./routes/pokemon')
};


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.status(200);
    res.send('Bienvenido al Pokédex');
});

app.use('/pokemon', routers.pokemon);


app.listen(process.env.PORT || puerto, () => console.log(`Servidor iniciado en el puerto ${puerto}`));
