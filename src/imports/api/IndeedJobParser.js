const rp = require('request-promise');
const $ = require('cheerio');

const getJobDescription = function (url) {
    return rp(url)
        .then(html => {

            // let root = $('.jobsearch-JobMetadataHeader + div', html);
            let root = $('#jobDescriptionText', html);

            let addText = (root, string) => {  // Traverses through divs and adds text
                if (!!root.text()) {
                    return string + root.text();
                }
                // Recursively traverse child div or p tags
                for (var i = 0; i < root.children(); i++) {
                    string += addText(root.children()[i], string);
                }
                return string;
            }
            let description = addText(root, "");
            // console.log("Description is ", description)

            return {
                description: description
            };
        })
        .catch(function (err) {
            //handle error
        });
};

module.exports = getJobDescription;