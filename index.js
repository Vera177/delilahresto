const express = require('express');

const config = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (config.env === 'development') {
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    app.use(require('morgan')('dev'))
    const swaggerDocument = YAML.load('./docs/swagger.yaml');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.listen(config.port, () => {
    console.log(`Server started on port: http://localhost:${config.port}`);
});