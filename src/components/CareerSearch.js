import React, { Component } from "react";
import { Grid, Input, Form } from "semantic-ui-react";
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
            <Form.Field control={Input} width={13} focus placeholder="City" />
            <Form.Field control={Input} width={3} focus placeholder="Province" />
        </Form.Group>

        <Form.Dropdown
          placeholder="Select Level"
          fluid
          search
          selection
          options={LEVEL_OPTIONS}
        />
        <Form.Dropdown
          placeholder="Select Term Type"
          fluid
          search
          selection
          options={TERM_OPTIONS}
        />

        <Form.Button>Go</Form.Button>
      </Form>
    );
  }
}
