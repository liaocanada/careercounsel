const rootUrl = "https://jobs.github.com/positions.json?";

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
    const url = (rootUrl.concat(
        description ? "description=\"" + description + "\"": "" +
        location ? "location=\"" + location  + "\"": "" +
        fulltime ? "fulltime=\"" + fulltime  + "\"": ""));

    console.log("URL: ");
    console.log(url);

    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    let jsonString = Httpreq.responseText;
    return JSON.parse(jsonString);

}

module.exports = getJobObjects;
