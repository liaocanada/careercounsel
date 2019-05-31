import React, { Component } from "react";
import { Header, Icon } from "semantic-ui-react";
import CareerSearch from "./CareerSearch";
import CareerResult from "./CareerResult";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      stats: {
        total: 0,
        degrees: "",
        specializations: ""
      },
      loading: false
    };
  }

  updateSearchForm = async (career, city, province, experience, position) => {
    this.setState({
      formData: {
        career,
        city,
        province,
        experience,
        position
      }
    });

    if (!!career && !!city && !!position) {
      // TODO add loading icon
      // this.setState({loading: true});
      let url = this.getUrl(career, city, province, experience, position);
      let response = await fetch(url);
      let stats = await response.json();
  
      if (response.status !== 200) {
        throw Error(stats.message)
      }

      this.setState({
        stats: stats, 
      });
      // this.setState({loading: false});
      console.log("Done loading");
    } else {
      this.setState({
        stats: {
            total: "",
            degrees: "",
            specializations: ""
        }
      });
      console.log("Nothing was loaded since one of the fields were blank");
    }
  };

  getUrl = (career, city, province, experience, position) => {
    // let DEFAULT_TEST_URL = '/stats?career=Software&city=San%20Francisco&province=CA&experience=junior&position=fulltime';
    let url = 'https://api.davidliao.ca/getJobStats?'
    url += 'career=' + career
    url += '&city=' + city
    url += '&province=' + province
    url += '&experience=' + experience
    url += '&position=' + position
    console.log('Accessing url', url);
    return url;
  }

  render() {
    console.log("App started!", this.state.stats);
    return (
      <div className="App">
        <Header size="huge" icon textAlign="center">
          <Icon name="suitcase" circular />
          <Header.Content>CareerCounsel</Header.Content>
        </Header>
        {/* <p>{this.state.data}</p> */}
        <p align="center">
          Are you looking a job? Unsure what skill are required? Contemplating a
          new degree? We've got all the info you need.
        </p>
        <CareerSearch callback={this.updateSearchForm} />
        <CareerResult
          total={console.log('state', this.state.stats) || (!!this.state.stats ? this.state.stats.total : 0)}
          degrees={
            !!this.state.stats
              ? Object.values(this.state.stats.degrees)
              : []
          }
          specializations={
            !!this.state.stats ? this.state.stats.specializations : []
          }
          title={this.state.formData.career}
        />

        {/* Pass in processed data */}

        <p align="center">Copyright © 2019 David Liao, Andy Ren</p>
      </div>
    );
  }
}
