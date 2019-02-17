import React, { Component } from "react";
import { Header, Segment, Icon } from "semantic-ui-react";

export default class CareerResult extends Component {

    // componentDidMount() {
    //   this.renderStats();
    // }

    // renderStats = async() => {
    //   let res = this.props.stats
    // }


    render() {

      const { total, degrees, specializations } = this.props;

      
      return (

        <>
        <Header size="large">
            <Icon name='search' />
            <Header.Content>Search Results</Header.Content>
        </Header>

        <p>Total: {console.log(this.props) || total}</p>

        <Segment placeholder>
            <Header icon>
              <Icon name='cloud' />
              Modules will be added here.
            </Header>
            {/* <Segment.Inline>
              <Button primary>Okay</Button>
              <Button>Sick</Button>
            </Segment.Inline> */}
          </Segment>
          </>

      );
    }

}
