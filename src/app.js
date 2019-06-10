const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views'); // customize the path
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs'); // set the view engine = handlebars
app.set('views', viewPath); // customize the path folder

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', { // use the view engine
        title: 'Weather App',
        name: 'Tuan Anh Ha'
    }); // automatic serves from views/index.hbs = default folder
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tuan Anh Ha'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        text: 'Copyright (c) 2019 Copyright Holder All Rights Reserved.',
        name: 'Tuan Anh Ha'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { // default params
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Tuan Anh Ha',
        errorMessage: 'Help not found!'
    });
});

app.get('*', (req, res) => { // 404 Page
    res.render('404', {
        name: 'Tuan Anh Ha',
        errorMessage: 'Page not found!'
    });
});

app.listen(port, () => {
    console.log('Serving...');
});
