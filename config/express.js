const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const { check, validationResult } = require('express-validator');

module.exports = (app) => {
    //console.log(app);
    mongoose.connect('mongodb://localhost:27017/cubicle',{ useNewUrlParser: true ,useUnifiedTopology: true, serverSelectionTimeoutMS: 2000  });
    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({
        defaultLayout:"main",
        partials:"partials",
        extname: ".hbs",
    }));
    app.set('view engine',".hbs");
    app.set('views', path.join(__dirname, '../views'));
    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser())
    // parse application/json
    app.use(bodyParser.json());
    //TODO: Setup the static files
    //app.use(express.static('static'));
    app.use(express.static(path.join(__dirname, '../static')));
};