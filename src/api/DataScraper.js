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

indeed.query(queryOptions).then(res => {
    console.log(res); // An array of Job objects

    for(let i = 0; i < queryOptions; ++i){
        const url = res[i].url;
        // fetch specific summary, return summary
        // save summary as a large string
        //
    }

// consult freecodebootcamp website post for more detail
    rp(url)
      .then(function(html){
        //success!
        const indeedSummaries = [];
        for (let i = 0; i < queryOptions; i++) {
          indeedSummaries.push($('big > a', html)[i].attribs.title);
            //parse here
        }

        for (let i = 0; i < queryOptions; i++) {
          console.log(+i+1 + ":" + indeedSummaries[i]);
        }
        console.log(indeedSummaries);console.log(html);
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
