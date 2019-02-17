const rootUrl = "https://jobs.github.com/positions.json?";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
 * 
 * @param {string} description 
 * @param {string} location 
 * @param {boolean} fulltime 
 */
let getJobObjects = (description, location, fulltime) => {
    var Httpreq = new XMLHttpRequest();

    // No parameters
    if (!description && !location && !fulltime) {
        return null;
    }

    // Build url
    var url = proxyUrl + rootUrl;
    // var url = proxyUrl + rootUrl;
    url = url.concat(!!description ? "description=" + description + "&": "");
    url = url.concat(!!location ? "location=" + location + "&": "");
    url = url.concat(fulltime ? "fulltime=" + fulltime + "&": "");
    url = url.replace(" ", "%20");

    console.log("URL: ");
    console.log(url);

    // Httpreq.open("GET", url, false);
    // Httpreq.send(null);
    // let jsonString = Httpreq.responseText;
    // return JSON.parse(jsonString);

    return fetch(url).then(response => {
        return response.json();
    });
}

module.exports = getJobObjects;
