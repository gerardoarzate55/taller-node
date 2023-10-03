const express = require('express');
const app = express();
const morgan = require('morgan');

const middleware = {
    rootDir: require('./middleware/rootDir'),
    auth: require('./middleware/auth'),
    notFound: require('./middleware/notFound')
} 

const routers = {
    pokemon: require('./routes/pokemon'),
    user: require('./routes/user')
};

const puerto = 12345;


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', middleware.rootDir);

/// Public routes ///
app.use('/user', routers.user);


app.use('/', middleware.auth);


/// Private routes ///
app.use('/pokemon', routers.pokemon);


app.use(middleware.notFound);


app.listen(process.env.PORT || puerto, () => console.log(`Servidor iniciado en el puerto ${puerto}`));
