const express = require('express');

const config = require('./config');
const errorMiddleware = require('./middlewares/error');
const notFoundMiddlerare = require('./middlewares/notFoundError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userController = require('./controllers/User');
const productController = require('./controllers/Products');

if(config.env === 'development'){
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    
    app.use(require('morgan')('dev'));
    const swaggerDocument = YAML.load('./docs/swagger.yaml');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.post('/user', userController.create);
app.get('/user', userController.getAll);
app.post('/user/login', userController.login);
app.post('/product', productController.create);
app.put('/product/:id', productController.update);
/* app.put('/products/:id', userController.updateProducts); -> falta hacer controlador
+ todo lo de la tabla productos primero*/

app.use(notFoundMiddlerare);
app.use(errorMiddleware);

app.listen(config.port, () => {
    console.log(`Server started on port: http://localhost:${config.port}`);
});