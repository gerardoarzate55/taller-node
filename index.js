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
    return res.status(200).json({ code: 1, message: 'Bienvenido al Pokédex' });
});

app.use('/pokemon', routers.pokemon);


app.use((req, res) => {
    return res.status(404).json({ code: 404, message: 'URL no encontrada' });
});


app.listen(process.env.PORT || puerto, () => console.log(`Servidor iniciado en el puerto ${puerto}`));
