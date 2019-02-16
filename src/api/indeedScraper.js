const rp = require('request-promise');
const $ = require('cheerio');

const jobPos = 'Software Developer';
const jobLoc =  'Ottawa';
const jobProv =  'ON';
const url = 'https://ca.indeed.com/jobs?q=' +jobPos + '&l=' +jobLoc +'%2C'+jobProv;


rp(url)
  .then(function(html){
    //success!
    console.log(html);
  })
  .catch(function(err){
    //handle error
  });
