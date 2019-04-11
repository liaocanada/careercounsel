const rootUrl = "https://jobs.github.com/positions.json?";
const proxyUrl = "cors-anywhere.herokuapp.com/";
// const proxyUrl = "https://cors.io/?";
// const proxyUrl = "thingproxy.freeboard.io/fetch/";
// https://gist.github.com/jimmywarting/ac1be6ea0297c16c477e17f8fbe51347

// const indeed = require('indeed-scraper');
const indeed = require('./Scraper');

const rp = require('request-promise');

/**
 * @param {string} description
 * @param {string} city
 * @param {string} province
 * @param {string} jobType
 */
let getIndeedJobObjects = (description, city, province, level, jobType) => {

    // No parameters - return null
    if (!description && !city && !jobType) {
        return null;
    }

    // Insert parameters into an object
    const queryOptions = {
        host: 'www.indeed.com',
        query: description,
        city: city + (!!province ? (', ' + province) : ('')),
        radius: '25',
        level: level,
        jobType: jobType,
        maxAge: '',
        sort: 'relevance',
        limit: '0'
    };

    // console.log(queryOptions);

    // Get URLs of jobs that match criteria
    indeed.query(queryOptions).then(res => {
        console.log(res); // An array of Job objects
    });


    // rp(url)
    //     .then(html => {
    //         //success!
    //         console.log($('big > a', html).length);
    //         console.log($('big > a', html));
    //     })
}

module.exports = getIndeedJobObjects;
