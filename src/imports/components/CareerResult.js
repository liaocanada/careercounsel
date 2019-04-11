import React, { Component } from "react";
import { Header, Segment, Icon } from "semantic-ui-react";

export default class CareerResult extends Component {

  render() {
    const { title, total, degrees, specializations } = this.props;

    return (
      <>
        <Header size="large">
          <Icon name="search" />
          <Header.Content>Search Results</Header.Content>
        </Header>

        <p>
          Summary results from {total} {title} jobs:
        </p>

        <Segment placeholder>
          {total > 0 ? (
            <>
              <Header>What level of degree do I need?</Header>
              <strong>At least:</strong>
              <p>
                High school: {degrees[0]} ({(degrees[0] * 100 / total).toFixed(1)}%) <br />
                Bachelor's degree: {degrees[1]} ({(degrees[1] * 100 / total).toFixed(1)}%) <br />
                Master's degree: {degrees[2]} ({(degrees[2] * 100 / total).toFixed(1)}%) <br />
                Doctorate degree: {degrees[3]} ({(degrees[3] * 100 / total).toFixed(1)}%)
              </p>

              <Header>What are the most common degrees required?</Header>
              <p>
                1. {!!Object.keys(specializations)[0] ? ((Object.keys(specializations)[0]).substring(0, 1).toUpperCase() + (Object.keys(specializations)[0]).substring(1).toLowerCase()) : <></>} ({!!Object.keys(specializations)[0] ? ((specializations[Object.keys(specializations)[0]] * 100 / total).toFixed(1)) + "%" : "N/A"}) <br />
                2. {!!Object.keys(specializations)[1] ? ((Object.keys(specializations)[1]).substring(0, 1).toUpperCase() + (Object.keys(specializations)[1]).substring(1).toLowerCase()) : <></>} ({!!Object.keys(specializations)[1] ? ((specializations[Object.keys(specializations)[1]] * 100 / total).toFixed(1)) + "%" : "N/A"}) <br />
                3. {!!Object.keys(specializations)[2] ? ((Object.keys(specializations)[2]).substring(0, 1).toUpperCase() + (Object.keys(specializations)[2]).substring(1).toLowerCase()) : <></>} ({!!Object.keys(specializations)[2] ? ((specializations[Object.keys(specializations)[2]] * 100 / total).toFixed(1)) + "%" : "N/A"})
              </p>
            </>
          ) : (
              <>
                <Header icon>
                  <Icon name="cloud" />
                  Stats will appear here when you search something!
              </Header>
              </>
            )}
        </Segment>
      </>
    );
  }
}
