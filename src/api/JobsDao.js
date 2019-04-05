const rootUrl = "https://jobs.github.com/positions.json?";
// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
// const proxyUrl = "https://cors.io/?";
const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
// https://gist.github.com/jimmywarting/ac1be6ea0297c16c477e17f8fbe51347

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
    url = url.concat(!!description ? "description=" + description + "&": "");
    url = url.concat(!!location ? "location=" + location + "&": "");
    url = url.concat(fulltime ? "fulltime=" + fulltime + "&": "");
    url = url.replace(" ", "%20");
    console.log("Root url: ", url);
    
    // Attach proxy url in front
    url = proxyUrl + url
    console.log("URL searching: ", url);

    return fetch(url).then(response => {
        return response.json();
    });
}

module.exports = getJobObjects;
