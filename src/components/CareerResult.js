import React, { Component } from "react";
import { Header, Segment, Icon, Button } from "semantic-ui-react";

export default class CareerResult extends Component {

    render() {
      return (

        <>
        <Header size="large">
            <Icon name='search' />
            <Header.Content>Search Results</Header.Content>
        </Header>

        <Segment placeholder>
            <Header icon>
              <Icon name='cloud' />
              Modules will be added here.
            </Header>
            <Segment.Inline>
              <Button primary>Okay</Button>
              <Button>Sick</Button>
            </Segment.Inline>
          </Segment>
          </>

      );
    }

}
