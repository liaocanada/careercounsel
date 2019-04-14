let getGithubDescriptions = require("./GithubDao.js");
let getIndeedDescriptions = require("./IndeedDao.js");

let bachelorsRegex = /[Bb]achelor['’]s|[Pp]ost[- ][Ss]econdary/g;
let mastersRegex = /[Mm]aster['’]s/g;
let phdRegex = /[Pp][Hh][Dd]|[Dd]octoral|[Dd]octorate|[Dd]octor['’]s/g;

let specializations = require("../resources/Specializations.js");
let degreeLevels = { none: 0, bachelors: 0, masters: 0, phd: 0 };

let getEducationStatistics = async (description, city, province, level, jobType) => {

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

		descriptions.forEach((description, i) => console.log(i, "Description: ", description.substring(0, 20)))

		// For each job description
		descriptions.forEach(description => {

			// Count number of degrees
			var bachelors = (description.match(bachelorsRegex) || []).length;
			var masters = (description.match(mastersRegex) || []).length;
			var phd = (description.match(phdRegex) || []).length;

			let maxOccurrences = max(bachelors, masters, phd);
			if (maxOccurrences === 0) degreeLevels["none"]++;
			else degreeLevels[maxOccurrences]++;

			// Count number of specializations
			Object.keys(specializations).forEach(key => {
				var matches = (description.match(new RegExp(key, "i")) || []).length;
				specializations[key] += matches;
			});

		});

		// Copy over the specializations with a non-0 occurrence
		var filteredSpecializations = {};
		Object.keys(specializations).forEach(key => {
			if (specializations[key] !== 0)
				filteredSpecializations[key] = specializations[key];
		})

		let stats = {
			total: descriptions.length,  // TODO FIX TOTAL COUNT
			degrees: degreeLevels,
			specializations: filteredSpecializations
		};

		console.log('Stats from EducationStatistics.js', stats);
		return stats;
	})
	.catch(err => console.error(err));

	// Reset counters
	// specializations.forEach(key => {
	// 	specializations[key] = 0;
	// });
	// degreeLevels.forEach(key => {
	// 	degreeLevels[key] = 0;
	// });

	return jobStats;
};

/**
 * TODO
 * @param {int} bachelors
 * @param {int} masters
 * @param {int} phd
 * @returns 1, 2, or 3, representing which has the max
 */
let max = (bachelors, masters, phd) => {
	if (bachelors > masters && bachelors > phd) {
		return "bachelors";
	} else if (masters > bachelors && masters > phd) {
		return "masters";
	} else if (phd > bachelors && phd > masters) {
		return "phd";
	} else {
		return "bachelors";
	}
};

module.exports = getEducationStatistics;
