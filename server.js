let express = require('express');
let cors = require('cors');
let rp = require('request-promise');
const $ = require('cheerio');

let indeedJobs = require('./src/imports/api/MyScraper');

let url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
let port = process.env.PORT || 5000;

let app = express();

app.use(cors());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// Get jobs
app.get('/indeed_jobs', (req, res) => {
    console.log('getting jobs...');

    let promise = indeedJobs(url)
    promise.then((resolved) => {
        console.log("Resolved: ", resolved)
    })

    res.send({ express: indeedJobs(url) })
});