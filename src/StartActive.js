import React, { Component } from 'react';

class StartActive extends Component {
  constructor(props) {
    super(props);
    this.startActiveService = props.startActiveService;
    this.state = {
      isBusy: false,
      done: 0,
      total: 0
    };

    this.startActiveClick = this.startActiveClick.bind(this);
  }

  progress(done, total) {
    this.setState({
      done: done,
      total: total
    });
  }

  setBusy(busy) {
    this.setState({
      isBusy: busy
    });
  }

  startActiveClick(e) {
    this.setBusy(true);

    this.startActiveService.startActive(new Date(), 10, this.progress.bind(this))
      .then(() => {
        this.setBusy(false);
      });
  }

  render() {
    return (
      <button
        className="Btn Btn-short Btn-primary Mend-med FSE-StartActive"
        onClick={this.startActiveClick}>
        {this.state.isBusy ? 'Busy' : 'Not Busy'}
      </button>
    );
  }
}

export default StartActive;