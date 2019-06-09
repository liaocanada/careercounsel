import React, { Component } from "react";
import { Header, Segment, Icon, Dimmer, Loader } from "semantic-ui-react";

export default class CareerResult extends Component {

  render() {
    const { title, total, degrees, specializations, status, errorMessage } = this.props;

    let header =
      <Header size="large">
        <Icon name="search" />
        <Header.Content>Search Results</Header.Content>
      </Header>

    /* Loading */
    if (status === 'loading') return (
      <>
        {header}
        <Segment placeholder>
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        </Segment>
      </>
    );

    /* Items found */
    else if (status === 'done' && total > 0) return (
      <>
        {header}

        <p>
          Summary results from {total} {title} jobs:
        </p>
        <Segment placeholder>
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
            1. {specializations.length >= 1 ?
              specializations[0][0] + ' (' + specializations[0][2].toFixed(1) + '%)'
              : 'N/A'} <br />
            2. {specializations.length >= 2 ?
              specializations[1][0] + ' (' + specializations[1][2].toFixed(1) + '%)'
              : 'N/A'} <br />
            3. {specializations.length >= 3 ?
              specializations[2][0] + ' (' + specializations[2][2].toFixed(1) + '%)'
              : 'N/A'}
          </p>
        </Segment>
      </>
    );

    /* No items found */
    else if (status === 'done' && total === 0) return (
      <>
        {header}
        <Segment placeholder>
          No results found...
        </Segment>
      </>
    );

    /* Nothing searched yet */
    else if (status === 'no-input') return (
      <>
        {header}
        <Segment placeholder>
          <Header icon>
            <Icon name="cloud" />
            Stats will appear here when you search something!
                </Header>
        </Segment>
      </>
    );

    /* Error */
    else if (status === 'error') return (
      <>
        {header}
        <Segment placeholder>
          {errorMessage}
        </Segment>
      </>
    );
  }
}
