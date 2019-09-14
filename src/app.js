const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const app = express();

//Define paths for extress config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Avik Mukherjee'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Avik Mukherjee"
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: "This is the help page to help you.",
        name: 'Avik Mukherjee'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided to fetch weather info.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }else{
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error});
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })

            })
        }
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide the search term.'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "Error",
        errorMessage: "Help Article Not Found",
        name: 'Avik Mukherjee'
    })
})

app.get("*", (req, res) => {
    res.render('error', {
        title: "Error",
        errorMessage: "Error Loading Page.",
        name: 'Avik Mukherjee'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});


