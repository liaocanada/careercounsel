import React, { Component } from "react";
import { Header, Icon } from "semantic-ui-react";
import CareerSearch from "./CareerSearch";
import CareerResult from "./CareerResult";

import "./App.css";

const BASE_URL_DEV = 'http://127.0.0.1:5000/stats?';  // If the Express server is running
const BASE_URL_PROD = 'https://api.davidliao.ca/getJobStats?';

export default class App extends Component {

  /** Defines default state */
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      stats: {
        total: 0,
        degrees: "",
        specializations: ""
      },
      status: 'no-input',  // no-input, loading, done, error
      errorMessage: ''  // explanation for error
    };
  }

  /** Generates results based on this.state.formData */
  generateResults = async () => {
    
    this.setState({status: 'loading'});
    console.log('Loading begin')
    const { career, city, province, country, experience, position } = this.state.formData;

    if (!!career) {
      let url = this.getUrl(career, city, province, country, experience, position);
      console.log('Fetching from url', url);
      
      let response = await fetch(url).catch(() => {
        console.error('error');
        this.setState({
          status: 'error',
          errorMessage: 'Fetch failed',
          stats: {
            total: 0,
            degrees: "",
            specializations: ""
          }
        });
      });
      if (!response) return;
      
      let stats = await response.json();

      this.setState({
        stats: stats, 
        status: 'done'
      });

      console.log('Done!')

    } else {
      this.setState({
        stats: {
            total: 0,
            degrees: "",
            specializations: ""
        },
        status: 'error', 
        errorMessage: 'Mandatory fields incomplete'
      });
    }

  }

  updateSearchForm = async (career, city, province, country, experience, position) => {
    console.log(career, city, province, country, experience, position);
    this.setState({
      formData: {
        career,
        city,
        province,
        country,
        experience,
        position
      }
    }, this.generateResults);
  };

  // Example URL: 
  // 'https://api.davidliao.ca/getJobStats?/stats?career=Software&city=San%20Francisco&province=CA&country=US
  //    experience=junior&position=fulltime';
  getUrl = (career, city, province, country, experience, position) => {
    let url = (process.env.NODE_ENV === 'development') ?
      BASE_URL_DEV : BASE_URL_PROD;

    url += 'career=' + career
    url += '&city=' + city
    url += '&province=' + province
    url += '&country=' + country
    url += '&experience=' + experience
    url += '&position=' + position
    return url;
  }

  render() {
    console.log("App started in", process.env.NODE_ENV, "environment");
    return (
      <div className="App">
        <Header size="huge" icon textAlign="center">
          <Icon name="suitcase" circular />
          <Header.Content>CareerCounsel</Header.Content>
        </Header>

        <p align="center">
          Are you looking a job? Unsure what skill are required? Contemplating a
          new degree? We've got all the info you need.
        </p>

        <CareerSearch callback={this.updateSearchForm} />
        <CareerResult
          total={!!this.state.stats ? this.state.stats.total : 0}
          degrees={!!this.state.stats ? Object.values(this.state.stats.degrees) : []}
          specializations={!!this.state.stats ? this.state.stats.specializations : []}
          title={this.state.formData.career}
          status={this.state.status}
          errorMessage={this.state.errorMessage}
        />

        <p align="center">Copyright © 2019 David Liao, Andy Ren</p>
      </div>
    );
  }
}
