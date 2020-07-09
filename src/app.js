const path = require('path');
const express = require('express'); 
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(publicDirPath)))

app.get('', (req, res) => {
    res.render('index', {
        name: 'Robin',
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Robin',
        title: 'About me'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        paragraph: 'This is a help message',
        name: 'Robin'
    })
});

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide an address!"
        })
    }

    const address = req.query.address; 

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        } else if (!address){
            return res.send({
                error: 'Invalid address, please give a correct address!'
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            console.log(location)
            console.log(forecastData)

            res.send({
                address, 
                location, 
                forecast: forecastData
            })
        });
    }); 
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products: [req.query.search]
    })
});

// * = match anything that havent yet been stated as a get path. 
app.get('/help/*', (req, res) =>{
    res.render('404-page', {
        title: '404',
        name: 'Robin',
        paragraph: 'Help article not found!'
    })
});
app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Robin',
        paragraph: 'The page given does not exist!' 

    })
});

app.listen(3000, () => {
    console.log('Listening on port: 3000')
});