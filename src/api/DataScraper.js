const indeed = require('indeed-scraper');

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

let jobArray = [];
indeed.query(queryOptions).then(res => {
    console.log(res); // An array of Job objects

    jobArray = res;

    jobArray = Object.assign({},res);
    /*for(let i = 0; i < +queryOptions.limit ; ++i) {
        jobArray[i] = res[i];
        console.log(res[i]);
    }*/

    for(let i = 0; i <queryOptions.limit ; ++i) {
        console.log(jobArray[i]);
    }
});

console.log("The following is the copied array");
for(let i = 0; i <queryOptions.limit ; ++i) {
    console.log(jobArray[i]);
}
