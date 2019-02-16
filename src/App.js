import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import CareerSearch from "./components/CareerSearch";
import "./App.css";

export default class App extends Component {

	
  render() {
	console.log("App started!");
	return (
	  <div className="App">
		<Header size="large">Career Planner</Header>
		<p>
		  Does your field have any jobs? Deciding what new skill to learn?
		  Contemplating a new degree? We've got all the info you need.
		</p>
		<CareerSearch />
	  </div>
	);
  }
}
