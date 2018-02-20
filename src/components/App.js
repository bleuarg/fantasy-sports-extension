import React, { Component } from 'react';
import parseDate from 'date-fns/parse';
import appConfig from '../common/appConfig';
import StartActiveButton from './StartActiveButton';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.startDate = parseDate(appConfig.startDate);
    this.authState = appConfig.authState;
    this.state = {
      dates: []
    };
  }

  render() {
    return (
      <div>
        <StartActiveButton
          disabled={this.authState !== 'signedin'}
          title={this.authState !== 'signedin' ? 'You need to "Start Active Players" at least once for this button to be active.' : ''}
          label="Start for whole week"
          startDate={this.startDate} />
      </div>
    );
  }
}