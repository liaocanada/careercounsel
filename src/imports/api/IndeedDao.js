let indeed = require('indeed-scraper');
let getJobDescription = require('./IndeedJobParser');

let getIndeedDescriptions = (description, city, province, level, jobType) => {

    // No parameters - return null
    if (!description && !city && !jobType) {
        return null;
    }

    // Insert parameters into an object
    const queryOptions = {
        host: 'www.indeed.com',
        query: description,
        city: city + (!!province ? (', ' + province) : ''),
        radius: '25',
        level: level,
        jobType: jobType,
        maxAge: '',
        sort: 'relevance',
        limit: '500'
    };

    let indeedJobDescriptions = indeed.query(queryOptions)
        .then(res => {
            let jobUrls = res.map(job => job.url);

            let descriptions = jobUrls.map(url => {  // Returns array of promises of descriptions
                return getJobDescription(url);  // A request-promise
            })

            return Promise.all(descriptions);
        })
        .then(objArray => {
            return objArray.map(
                obj => obj.description
            )
        })  // Array of descriptions (Strings)
        .catch(err => {
            console.error(err);
        });

    return indeedJobDescriptions;
}

module.exports = getIndeedDescriptions;
