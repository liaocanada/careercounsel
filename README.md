## CareerCounsel

This application was written using React and Node.js. The prime purpose of this project is to summarize hundreds of real-time job postings from job boards and return them in an easy to understand, summarized statistical format. This repository only contains code for the front end.

### Behind the Scenes

* Development
  * React
  * HTML/CSS
  * [React-Semantic UI](https://react.semantic-ui.com/)
* Deployment and Hosting
  * AWS S3 static website hosting
  * Amazon CloudFront CDN for use of **secure, low-latency** edge locations
  * Amazon Certificate Manager for SSL/TLS certificate to allow for **HTTPS** connections
  * Google Domains DNS service
* Continuous Deployment
  * AWS CodePipeline **automatically starts a build and deployment process** whenever we commit a change on GitHub
  * AWS CodeBuild for automatic code building on EC2 instances
  * AWS CodeDeploy for automatic deployment

### Features

The application can currently return
1. The level of education needed, and
2. The type of degree needed

from external job boards, such as Indeed and Github Jobs. 

We plan on adding better and more informative statistics like what specific soft/hard skills are needed, and possibly maps showing which areas have higher/lower average salaries for a given search.

### Trying it out

This app is deployed onto <https://app.davidliao.ca>.

<!-- ### Interface
![Screenshot](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/766/212/datas/gallery.jpg) -->
