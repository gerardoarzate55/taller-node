const express = require('express');
const app = express();
const puerto = 12345;

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.listen(process.env.PORT || puerto, () => console.log(`Servidor iniciado en el puerto ${puerto}`));