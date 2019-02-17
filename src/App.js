import React, { Component } from "react";
import { Header, Icon } from "semantic-ui-react";
import CareerSearch from "./components/CareerSearch";
import CareerResult from "./components/CareerResult";
import "./App.css";

export default class App extends Component {


  render() {
	console.log("App started!");
	return (
	  <div className="App">
		<Header size="huge" icon textAlign='center'>
			<Icon name='suitcase' circular />
        	<Header.Content>CareerCoach</Header.Content>
		</Header>
		<p align='center'>
		  Are you looking a job? Unsure what skill are required?
		  Contemplating a new degree? We've got all the info you need.
		</p>
		<CareerSearch />
		<CareerResult />
		<p align='center'>
			Copyright © 2019 David Liao, Andy Ren
		</p>
	  </div>
	);
  }
}
