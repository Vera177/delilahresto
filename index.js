const express = require('express');

const config = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(config.port, () => {
    console.log(`Server started on port: http://localhost:${config.port}`);
});    