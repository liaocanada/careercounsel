import React, { Component } from "react";
import { Grid, Input, Form, Dropdown } from "semantic-ui-react";
import { LEVEL_OPTIONS } from "../resources/dropdowns/LevelOptions";
import { TERM_OPTIONS } from "../resources/dropdowns/TermOptions";

export default class CareerSearch extends Component {
  render() {
    return (
      <Form>
        <Form.Field>
          <Input focus fluid placeholder="Search for a career..." />
        </Form.Field>

        <Form.Group>

            <Form.Field width={13}>
                <label>City</label>
                <input placeholder='City' />
            </Form.Field>
            <Form.Field width={3}>
                <label>Province</label>
                <input placeholder='Province' />
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
                />
            </Form.Field>
        </Form.Group>

        <Form.Button>Submit!</Form.Button>
      </Form>
    );
  }
}
