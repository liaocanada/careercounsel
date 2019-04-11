const getGithubDescriptions = require("./GithubDao.js");
const getIndeedDescriptions = require("./IndeedDao.js");

let bachelorsRegex = /[Bb]achelor['’]s|[Pp]ost[- ][Ss]econdary/g;
let mastersRegex = /[Mm]aster['’]s/g;
let phdRegex = /[Pp][Hh][Dd]|[Dd]octoral|[Dd]octorate|[Dd]octor['’]s/g;

let specializations = require("../resources/Specializations.js");
let degreeLevels = { none: 0, bachelors: 0, masters: 0, phd: 0 };

let getEducationStatistics = async (description, city, province, level, jobType) => {

	const githubJobsList = getGithubDescriptions(description, city, jobType === "fulltime");
	const indeedJobsList = getIndeedDescriptions(description, city, province, level, jobType);

	let allDescriptions = Promise.all([githubJobsList, indeedJobsList]);

	let jobStats = allDescriptions.then(resolved => {
		// Flatten
		let descriptions = resolved[0].concat(resolved[1]);
		console.log('Found', resolved[0].length, 'from GitHub and', resolved[1].length, 'from Indeed!');
		console.log('Total:', descriptions.length);

		// descriptions.forEach(description => console.log("Description: ", description.substring(0, 20)))

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
			total: description.length,
			degrees: degreeLevels,
			specializations: filteredSpecializations
		};

		// console.log(stats);
		return stats;
	})
	.catch(err => console.error(err));

	console.log(jobStats);
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
