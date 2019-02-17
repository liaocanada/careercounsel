import React, { Component } from "react";
import { Header, Icon } from "semantic-ui-react";
import CareerSearch from "./components/CareerSearch";
import CareerResult from "./components/CareerResult";

import "./App.css";

let getEducationStats = require('./api/EducationStatistics.js');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      stats: {
        total: 0,
        degrees: "",
        specializations: ""
      }
    };
  }
  

  updateSearchForm = async (career, city, province, experience, position) => {
		this.setState({
			formData: {
				career, city, 
				province, 
				experience, position
			},
		})


		if (!!career && !!city && !! position) {
			this.setState({
				stats: [await getEducationStats(career, city, !!position)]
      });
      console.log("-----=-=-=-asdfasdfas", this.state);

    }
    else {
      this.setState({
        stats: [{
          total: "",
          degrees: "",
          specializations: ""
        }]
      });
    }
    console.log("-----=-=-=-=--", this.state);

    // this.setState({
    //   total: this.state.stats.total,
    //   degrees: this.state.stats.degrees,
    //   specializations: this.state.stats.specializations
    // })
    // console.log("-----=-=-=-=--", this.state);
    
    
}
	

  render() {
    console.log("App started!", this.state.stats);
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
        <CareerSearch callback={this.updateSearchForm}/>
        <CareerResult 
          total={!!this.state.stats[0] ? this.state.stats[0].total : 0}
          degrees={!!this.state.stats[0] ? Object.values(this.state.stats[0].degrees) : []}
          specializations={!!this.state.stats[0] ? this.state.stats[0].specializations : []}
          title = {this.state.formData.career}
         />

				{/* Pass in processed data */}

        <p align="center">Copyright © 2019 David Liao, Andy Ren</p>
      </div>
    );
	}
	
}
