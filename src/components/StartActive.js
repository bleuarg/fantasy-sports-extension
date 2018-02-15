import React, { Component } from 'react';
import {isNaN} from 'lodash';
import css from './StartActive.css';

class StartActive extends Component {
  constructor(props) {
    super(props);
    this.startActiveService = props.startActiveService;
    this.maxDays = props.maxDays ? props.maxDays : 30;
    this.startDate = props.startDate;

    this.state = {
      isBusy: false,
      qtyDone: 0,
      total: 0
    };

    this.disabled = props.disabled;
    this.startActiveClick = this.startActiveClick.bind(this);
  }

  progress(done, total) {
    this.setState({
      qtyDone: done,
      total: total
    });
  }

  setActive(busy) {
    this.setState({
      isBusy: busy
    });
  }

  startActiveClick(e) {
    if (!this.state.isBusy) {
      this.setActive(true);

      this.startActiveService.startActive(this.startDate, this.maxDays, this.progress.bind(this))
        .then(() => {
          this.setActive(false);
        });
    }
  }

  getPercentage(numerator, denominator) {
    let number = numerator/denominator;
    if (isNaN(number)) {
      number = 0;
    }

    return `${(number * 100).toFixed(0)}%`;
  }

  render() {
    let progressLabel = '';

    let percentage = this.getPercentage(this.state.qtyDone, this.state.total);
    if (this.state.isBusy) {
      progressLabel = `${percentage} done`;
    }

    let progressStyle = {
      width: percentage
    };

    let className = `Btn Btn-short Btn-primary Mend-med FSE-StartActive
      ${this.state.isBusy ? 'is-active' : ''}
      ${this.disabled || this.state.isBusy  ? 'Btn-disabled' : ''}`;

      return (
      <button
        title={this.props.title}
        className={className}
        disabled={this.disabled}
        onClick={this.startActiveClick}>
        <span className="FSE-StartActive-progressLabel">{progressLabel}</span>
        {this.props.label}
      </button>
    );
  }
}

export default StartActive;