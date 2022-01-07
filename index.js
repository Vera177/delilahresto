const express = require('express');

const config = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

<<<<<<< HEAD
if(config.env === 'development'){
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    
    app.use(require('morgan')('dev'));
=======
if (config.env === 'development') {
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    app.use(require('morgan')('dev'))
>>>>>>> 8e6a322bb27ca948856a7e031bbe2e374d253994
    const swaggerDocument = YAML.load('./docs/swagger.yaml');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

<<<<<<< HEAD

=======
>>>>>>> 8e6a322bb27ca948856a7e031bbe2e374d253994
app.listen(config.port, () => {
    console.log(`Server started on port: http://localhost:${config.port}`);
});