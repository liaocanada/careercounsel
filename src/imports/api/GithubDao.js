const rootUrl = "https://jobs.github.com/positions.json?";

const fetch = require('node-fetch');

/**
 * @param {string} description
 * @param {string} location
 * @param {boolean} fulltime
 */
let getJobObjects = (description, location, fulltime) => {

    // No parameters
    if (!description && !location && !fulltime) {
        return null;
    }

    // Build url
    var url = rootUrl;
    url = url.concat(!!description ? "description=" + description + "&" : "");
    url = url.concat(!!location ? "location=" + location + "&" : "");
    url = url.concat(fulltime ? "fulltime=" + fulltime + "&" : "");
    url = url.replace(" ", "%20");
    if (url.charAt(url.length - 1) === "&") {
        url = url.substring(0, url.length - 1);
    }
    console.log("Root GitHub url: ", url);

    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(jobObjectList => {
            return jobObjectList.map(jobObject => jobObject.description);
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports = getJobObjects;
