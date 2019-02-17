const indeed = require('indeed-scraper');
const rp = require('request-promise');
const $ = require('cheerio');


// future these entries are variables that get passed by react
const queryOptions = {
  host: 'www.indeed.com',
  query: 'Software',
  city: 'Seattle, WA',
  radius: '25',
  level: 'entry_level',
  jobType: 'fulltime',
  maxAge: '7',
  sort: 'date',
  limit: '2'
};

let urlArray = new Array(queryOptions.limit);
indeed.query(queryOptions).then(res => {
    //console.log(res); // An array of Job objects

    for(let i = 0; i < queryOptions.limit; ++i){
        urlArray[i] = res[i].url;
        // fetch specific summary, return summary
        // save summary as a large string
        //
    }

    console.log(urlArray);
// consult freecodebootcamp website post for more detail

    rp(urlArray[0])
      .then(function(html){
        //success!
        const indeedSummaries = [];
        //for (let i = 0; i < queryOptions.limit; i++) {
          console.log($('.jobsearch-JobComponent-description > div', html));
          indeedSummaries.push($('.jobsearch-JobComponent-description > div > p', html));
            //parse here
        //}

        /*for (let i = 0; i < queryOptions; i++) {
          console.log(+i+1 + ":" + indeedSummaries[i]);
        }
        console.log(indeedSummaries);console.log(html);*/
      })
      .catch(function(err){
        //handles error
    });

});


/*
Plan:

Education
Specialization (i.e in Comp Sci)
Skills
Certification
Mapping API

*/
