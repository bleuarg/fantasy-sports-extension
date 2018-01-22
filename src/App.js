import React from 'react';
import StartActive from './StartActive';
import StartActiveService from './StartActiveService';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.startActiveService = new StartActiveService(props.config);
  }

  render() {
    return (
      <div>
        <StartActive startActiveService={this.startActiveService} />
      </div>
    );
  }
}

