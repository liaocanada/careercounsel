let getGithubDescriptions = require("./GithubDao.js");
let getIndeedDescriptions = require("./IndeedDao.js");

let fs = require('fs');  // for debug 


let bachelorsRegex = /[Bb]achelor|[Pp]ost[- ][Ss]econdary/g;
let mastersRegex = /[Mm]aster['’]s/g;
let phdRegex = /[Pp][Hh][Dd]|[Dd]octoral|[Dd]octorate|[Dd]octor['’]s/g;

let specializations = require("../resources/Specializations.js");
let degreeLevels = { none: 0, bachelors: 0, masters: 0, phd: 0 };

let getEducationStatistics = async (description, city, province, level, jobType) => {
	
	// Reset counters
	Object.keys(specializations).forEach(key => specializations[key] = 0)
	Object.keys(degreeLevels).forEach(key => degreeLevels[key] = 0);

	// Get descriptions
	let githubJobsList = getGithubDescriptions(description, city, jobType === "fulltime");
	let indeedJobsList = getIndeedDescriptions(description, city, province, level, jobType);

	// Merge
	let allDescriptions = Promise.all([githubJobsList, indeedJobsList]);

	let jobStats = allDescriptions.then(resolved => {
		// Flatten
		let descriptions = resolved[0].concat(resolved[1]);
		console.log('Found', resolved[0].length, 'from GitHub and', resolved[1].length, 'from Indeed!');
		console.log('Total:', descriptions.length);

		// For debugging
		// descriptions.forEach((description, i) => console.log(i, "Description: ", description.substring(0, 20)));
		var descriptionsString = '';
		descriptions.forEach((description, i) => {
			descriptionsString += (i + ': ' + description + '\n\n');
		});
		fs.writeFile('descriptions.txt', descriptionsString, err => { 
			if (err) throw err; 
		});

		var debugString = '';
		// For each job description
		descriptions.forEach((description, i) => {

			// Count number of degrees
			var bachelors = (description.match(bachelorsRegex) || []).length;
			var masters = (description.match(mastersRegex) || []).length;
			var phd = (description.match(phdRegex) || []).length;
			// debugString += i + ' ' + bachelors + '|' + masters  + '|' + phd + ', max key=' ;

			let maxOccurrences = max(bachelors, masters, phd);
			degreeLevels[maxOccurrences]++;
			// debugString += maxOccurrences + '\n';

			// Count number of specializations
			Object.keys(specializations).forEach(key => {
				var matches = (description.match(new RegExp(key, "i")) || []).length;
				if (matches !== 0) specializations[key] += matches;
				if (matches !== 0) debugString += 'Found ' + key + ' in ' + i + '!\n'
			});
		});

		// Copy over the specializations with a non-0 occurrence, into a sorted array
		var specializationsArray = [];
		Object.keys(specializations).forEach(key => {
			if (specializations[key] !== 0) {
				let capitalizedKey = key.substring(0, 1).toUpperCase() + key.substring(1).toLowerCase();
				specializationsArray.push([
					capitalizedKey, 								// [0] is the specialization, capitalized
					specializations[key], 							// [1] is the number of occurrences found
					specializations[key] / descriptions.length*100  // [2] is the percentage of all the descriptions
				]);
			}
		})

		// Sort descending
		specializationsArray.sort((a, b) => {
			return b[1] - a[1];
		});

		let stats = {
			total: descriptions.length,
			degrees: degreeLevels,
			specializations: specializationsArray
		};

		console.log('Stats from EducationStatistics.js', stats);
		console.log(debugString);
		return stats;
	})
	.catch(err => console.error(err));

	return jobStats;
};

/**
 * TODO
 * @param {int} bachelors
 * @param {int} masters
 * @param {int} phd
 * @returns 'bachelors', 'masters', 'phd', or 'none'
 */
let max = (bachelors, masters, phd) => {
	if (bachelors >= masters && bachelors >= phd && bachelors !== 0)
		return 'bachelors';
	else if (masters > bachelors && masters >= phd)
		return 'masters';
	else if (phd > bachelors && phd > masters)
		return 'phd';
	else
		return 'none';
}

module.exports = getEducationStatistics;
