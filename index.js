const express = require('express');

const app = express();

app.arguments(express.json());
app.arguments(express.urlencoded({extended: true}));

app.listen()