import React, { Component } from 'react';
import { Input } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

class RecommendedJobsList extends Component {
  render() {
    this.props.colour;

    this.state = { 
        input: ""
     };

     return (
        <Input value={this.state.input} onChange={this.setState({input: value})}>
        </Input>
     );

  }
}

export default App;
