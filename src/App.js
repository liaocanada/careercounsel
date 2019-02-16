import React, { Component } from "react";
import { Input, Header, Form, Dropdown } from "semantic-ui-react";
import { LocationOptions } from "./";
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
		<Form>
			<Form.Field>
				<Input 
					focus
					fluid
					placeholder="Search for a career..."
				/>
			</Form.Field>
			{/* <Form.Dropdown placeholder='Select Country' fluid search selection options={countryOptions} /> */}

			<Form.Button>Go</Form.Button>
		</Form>
	  </div>
	);
  }
}
