let express = require('express');
let cors = require('cors');

let getEducationStats = require("./src/imports/api/EducationStatistics.js");

let port = process.env.PORT || 5000;

let app = express();
app.use(cors());

// Log that server is up
app.listen(port, () => console.log(`Listening on port ${port}`));

// GET route for getting stats
app.get('/stats', (req, res) => {

    let career = req.query.career;
    let city = req.query.city;
    let province = req.query.province;
    let experience = req.query.experience;
    let position = req.query.position;

    getEducationStats(career, city, province, experience, position)
        .then(stats => res.send({ stats: stats }));
});
