const jobs = require("./JobsDao.js");
const indeedJobs = require("./JobsDaoIndeed.js");

/**
 * Dictionary containing degree levels and occurrences
 */
let degreeLevels = { none: 0, bachelors: 0, masters: 0, phd: 0 };

/**
 * Dictionary containing specializations and occurrences
 */
let specializations = require("../resources/Specializations.js");

let getEducationStatistics = (description, city, province, level, jobType) => {
  const jobsList = jobs(description, city, jobType === "fulltime");
  const indeedJobsList = indeedJobs(description, city, province, level, jobType);
  console.log("Github Jobs found: ", jobsList);
  console.log("Indeed Jobs found: ", indeedJobsList);

  let jobStats = jobsList.then(jobs => {
    console.log("Number of jobs found: ", jobs.length);

    for (let i = 0; i < jobs.length; i++) {
      const description = jobs[i].description;

      // Search for degree level
      var bachelors = (
        description.match(/[Bb]achelor['’]s|[Pp]ost[- ][Ss]econdary/g) || []
      ).length;
      var masters = (description.match(/[Mm]aster['’]s/g) || []).length;
      var phd = (
        description.match(
          /[Pp][Hh][Dd]|[Dd]octoral|[Dd]octorate|[Dd]octor['’]s/g
        ) || []
      ).length;

      // Search for specialization
      var keySet = Object.keys(specializations); // A list of degree specializations
      for (var j = 0; j < keySet.length; j++) {
        var key = keySet[j];
        var matches = (description.match(new RegExp(key, "i")) || []).length;

        // New - add in every match
        specializations[key] += matches;
      }

      // Add 1 to the "none" degree level if all levels are 0
      if (!bachelors && !masters && !phd) {
        degreeLevels["none"]++;
        continue;
      } else {
        degreeLevels[max(bachelors, masters, phd)]++;
      }
    }

    // Copy over the specializations with a non-0 occurrence
    var filteredSpecializations = {};
    var keySet = Object.keys(specializations);
    for (var i = 0; i < keySet.length; i++) {
      var key = keySet[i];
      if (specializations[key] !== 0) {
        filteredSpecializations[key] = specializations[key];
      }
    }

    var stats = {
      total: jobs.length,
      degrees: degreeLevels,
      specializations: filteredSpecializations
    };

    return stats;
  });

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
