import React, { Component } from 'react';
import getDate from 'date-fns/get_date';
import formatDate from 'date-fns/format';
import appConfig from '../common/appConfig';
import { Tooltip } from 'react-tippy';
import StartActiveService from '../common/StartActiveService';
import 'react-tippy/dist/tippy.css';
import './DateLine.css';

const startActiveService = new StartActiveService(appConfig);

const status = {
  BUSY: 'BUSY',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
};

class DateLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: status.BUSY,
      errorMessage: null
    };

    const delay = this.props.delay ? this.props.delay : 0;
    setTimeout(this.callApi.bind(this), delay);
  }

  callApi() {
    startActiveService.setForDate(this.props.date)
      .then(() => {
        this.setState({
          status: status.SUCCESS
        });
      })
      .catch(e => {
        this.setState({
          status: status.ERROR,
          errorMessage: 'The Response from Yahoo! contains an error. Trying again may work.'
        });
      });
  }

  getStatusIcon() {
    let icon = 'FSE-DateLine-statusIcon';

    switch(this.state.status) {
      case status.ERROR:
        icon = `${icon}  FSE-DateLine-iconError`;
      break;
      case status.SUCCESS:
        icon = `${icon}  FSE-DateLine-iconSuccess`;
      break;
      default:
        icon = `${icon}  FSE-DateLine-iconBusy`;
      break;
    }
    return icon;
  }
  getIconClassName(day) {
    let icon = `FSE-DateLine-dateIcon  FSE-DateLine-dateIcon-${day}`;
    return icon;
  }

  render() {
    return (
      <div className="FSE-DateLine">
        <span className={this.getIconClassName(getDate(this.props.date))}></span>
        <strong>{formatDate(this.props.date, 'dddd')}</strong>
        <div className="FSE-DateLine-date">{formatDate(this.props.date, 'MMM. D')}</div>
        <div className="FSE-DateLine-progress">
          <Tooltip
            disabled={this.state.status !== status.ERROR}
            title={this.state.errorMessage}
            arrow="true"
            arrowSize="small"
            size="small"
            animation="fade"
            style={{display: 'inline-block'}}
            position="top">
          <span className={this.getStatusIcon()}></span>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default DateLine;