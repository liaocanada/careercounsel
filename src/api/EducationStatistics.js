const jobs = require('./JobsDao.js');

const jobsList = jobs("node");

/** Array representing number of degrees requiring types of degrees
 * degreeLevels[0]: unspecified
 * degreeLevels[1]: Bachelor's
 * degreeLevels[2]: Master's
 * degreeLevels[3]: PhD
 * degreeLevels[4]: Total number of jobs searched
 */
let degreeLevels = [0, 0, 0, 0, 0];

let getEducationStatistics = () => {

    degreeLevels[4] = jobsList.length;

    for (let i = 0; i < jobsList.length; i++) {
        const description = jobsList[i].description;

        var bachelors = (description.match(/[Bb]achelor/g) || []).length;
        var masters = (description.match(/[Mm]aster/g) || []).length;
        var phd = (description.match(/[Pp][Hh][Dd]/g) || []).length;

        console.log(bachelors);
        console.log(masters);
        console.log(phd);

        if (!bachelors && !masters && !phd) {
            degreeLevels[0]++;
            continue;
        }
        else {
            degreeLevels[max(bachelors, masters, phd)] ++;
        }
    }

    console.log(degreeLevels);
    return degreeLevels;

}

/**
 * TODO
 * @param {int} bachelors 
 * @param {int} masters 
 * @param {int} phd 
 * @returns 1, 2, or 3, representing which has the max
 */
let max = (bachelors, masters, phd) => {
    if (bachelors > masters && bachelors > phd) {
        return 1;
    }
    else if (masters > bachelors && masters > phd) {
        return 2;
    }
    else if (phd > bachelors && phd > masters) {
        return 3;
    }
    else {
        return Math.floor(3 * Math.random) + 1;
    }
}

module.exports = getEducationStatistics;
