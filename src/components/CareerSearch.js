import React, { Component } from "react";
import { Input, Form, Dropdown } from "semantic-ui-react";
import { LEVEL_OPTIONS } from "../resources/dropdowns/LevelOptions";
import { TERM_OPTIONS } from "../resources/dropdowns/TermOptions";

export default class CareerSearch extends Component {
  constructor(props) {

      super(props);
      this.state = ({
          careerInput: "",
          cityInput: "",
          provinceInput: "",
          experienceInput: "",
          positionInput: ""
      });

  }

  render() {
    return (
      <Form>
        <Form.Field>
          <Input
            focus
            fluid
            placeholder="Search for a career..."
            value={this.state.careerInput}
            onChange={(_, event) => {
                this.setState({careerInput: event.value});
                // console.log(event);
            }}
          />
        </Form.Field>

        <Form.Group>

            <Form.Field width={13}>
                <label>City</label>
                <Input
                    placeholder='City'
                    value={this.state.cityInput}
                    onChange={(_, event) => {
                        this.setState({cityInput: event.value});
                    }}
                />
            </Form.Field>
            <Form.Field width={3}>
                <label>Province</label>
                <Input
                    placeholder='Province/State'
                    value={this.state.provinceInput}
                    onChange={(_, event) => {
                        this.setState({provinceInput: event.value});
                    }}
                    />
            </Form.Field>
        </Form.Group>

        <Form.Group>
            <Form.Field width={8}>
                <label>Experience Level</label>
                <Dropdown
                    placeholder="Select Level"
                    fluid
                    search
                    selection
                    options={LEVEL_OPTIONS}
                    value={this.state.experienceInput}
                    onChange={(_, event) => {
                        this.setState({experienceInput: event.value});
                    }}
                />
            </Form.Field>

            <Form.Field width={8}>
                <label> Job Position Type </label>
                <Dropdown
                    placeholder="Select Position Type"
                    fluid
                    search
                    selection
                    options={TERM_OPTIONS}
                    value={this.state.positionInput}
                    onChange={(_, event) => {
                        this.setState({positionInput: event.value});
                    }}
                />
            </Form.Field>
        </Form.Group>

        <Form.Button onClick={(_, event) => this.handleClick(event)}>Submit!</Form.Button>
      </Form>
    );
  }

  handleClick(event) {
      console.log("Submit clicked!");
      console.log(this.props);
      const {careerInput, cityInput, provinceInput, experienceInput, positionInput} = this.state;
      this.props.callback(careerInput, cityInput, provinceInput, experienceInput, positionInput);
  }
}
