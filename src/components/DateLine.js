import React, { Component } from 'react';
import getDate from 'date-fns/get_date';
import formatDate from 'date-fns/format';
import startActiveService from '../common/startActiveService';
import './DateLine.css';

const status = {
  BUSY: 'BUSY',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
};

class DateLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: status.BUSY
    };

    this.callApi();
  }

  callApi() {
    startActiveService.setForDate(this.props.date)
      .catch(e => {
        this.setState({
          status: status.ERROR
        });
      })
      .then(() => {
        this.setState({
          status: status.SUCCESS
        });
      });
  }

  getStatusIcon() {
    let icon = 'DateLine-statusIcon';

    switch(this.state.status) {
      case status.ERROR:
        icon = `${icon}  DateLine-iconError`;
      break;
      case status.SUCCESS:
        icon = `${icon}  DateLine-iconSuccess`;
      break;
      default:
        icon = `${icon}  DateLine-iconBusy`;
      break;
    }
    return icon;
  }
  getIconClassName(day) {
    let icon = `DateLine-dateIcon  DateLine-dateIcon-${day}`;
    return icon;
  }

  render() {
    return (
      <div className="FSE-DateLine">
        <span className={this.getIconClassName(getDate(this.props.date))}></span>
        <strong className="DateLine-day">{formatDate(this.props.date, 'dddd')}</strong>
        <div className="DateLine-date">{formatDate(this.props.date, 'MMM. D')}</div>
        <div className="DateLine-progress"><span className={this.getStatusIcon()}></span></div>
      </div>
    );
  }
}

export default DateLine;