import React, { Component } from 'react';
import parseDate from 'date-fns/parse';
import appConfig from '../common/appConfig';
import StartActiveButton from './StartActiveButton';
import 'react-tippy/dist/tippy.css';
import '../common/tippy-overrides.css';
import { Tooltip } from 'react-tippy';


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
    const isDisabled = this.authState !== 'signedin';
    return (
      <Tooltip
        disabled={!isDisabled}
        title={isDisabled ? 'You need to "Start Active Players" at least once for this button to be active.' : ''}
        arrow="true"
        arrowSize="small"
        size="small"
        animation="fade"
        position="top">
        <StartActiveButton
          disabled={isDisabled}
          label="Start For Rest Of Week"
          startDate={this.startDate}
        />
      </Tooltip>
    );
  }
}
