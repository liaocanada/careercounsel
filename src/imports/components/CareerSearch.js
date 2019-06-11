import React, { Component } from "react";
import { Input, Form, Dropdown } from "semantic-ui-react";
import { LEVEL_OPTIONS } from "../resources/dropdowns/LevelOptions";
import { TERM_OPTIONS } from "../resources/dropdowns/TermOptions";
import { COUNTRY_OPTIONS } from "../resources/dropdowns/CountryOptions";

export default class CareerSearch extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            careerInput: "",
            cityInput: "",
            provinceInput: "",
            countryInput: "",
            experienceInput: "all",
            positionInput: "all"
        });
    }

    render() {
        return (
            <Form>
                <Form.Field required>
                    <label>Keywords</label>
                    <Input
                        focus
                        fluid
                        placeholder="Search for an career field, job title, or company!"
                        value={this.state.careerInput}
                        onChange={(_, event) => {
                            this.setState({ careerInput: event.value });
                        }}
                    />
                </Form.Field>

                <Form.Group>

                    <Form.Field width={8}>
                        <label>City</label>
                        <Input
                            placeholder='City'
                            value={this.state.cityInput}
                            onChange={(_, event) => {
                                this.setState({ cityInput: event.value });
                            }}
                        />
                    </Form.Field>
                    <Form.Field width={4}>
                        <label>Province</label>
                        <Input
                            placeholder='Province/State'
                            value={this.state.provinceInput}
                            onChange={(_, event) => {
                                this.setState({ provinceInput: event.value });
                            }}
                        />
                    </Form.Field>
                    <Form.Field width={4} required>
                        <label>Country</label>
                        <Dropdown
                            placeholder="Select a Country"
                            fluid
                            selection
                            options={COUNTRY_OPTIONS}
                            value={this.state.countryInput}
                            onChange={(_, event) => {
                                this.setState({ countryInput: event.value });
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
                            selection
                            options={LEVEL_OPTIONS}
                            value={this.state.experienceInput}
                            onChange={(_, event) => {
                                this.setState({ experienceInput: event.value });
                            }}
                        />
                    </Form.Field>

                    <Form.Field width={8}>
                        <label> Job Position Type </label>
                        <Dropdown
                            placeholder="Select Position Type"
                            fluid
                            selection
                            search
                            options={TERM_OPTIONS}
                            value={this.state.positionInput}
                            onChange={(_, event) => {
                                this.setState({ positionInput: event.value });
                            }}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Button 
                    onClick={this.props.isLoading ? 
                        null :
                        ((_, event) => this.submitForm(event))
                    }
                    loading={this.props.isLoading}
                >
                    Submit!
                </Form.Button>
            </Form>
        );
    }

    submitForm() {
        console.log("Submit clicked!", this.state);
        var { careerInput, cityInput, provinceInput, countryInput, experienceInput, positionInput } = this.state;

        // If user selected 'all', leave it blank
        if (experienceInput === 'all') experienceInput = '';
        if (positionInput === 'all') positionInput = '';
        this.props.callback(careerInput, cityInput, provinceInput, countryInput, experienceInput, positionInput);
    }
}
