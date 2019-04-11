const indeed = require('./Scraper');
const getJobDescription = require('./MyParser');

const queryOptions = {
	host: 'www.indeed.com',
	query: 'Software',
	city: 'Seattle, WA',
	radius: '25',
	level: 'entry_level',
	jobType: 'fulltime',
	maxAge: '7',
	sort: 'date',
	limit: 100
};

indeed.query(queryOptions)
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
.then(descriptions => {
	console.log(descriptions.length, " descriptions found");
	
	// console.log('Final result: ' + descriptions);
	// console.log(descriptions[0]);
	// console.log(descriptions[1]);	
})
.catch(err => {
	console.error(err);
});
