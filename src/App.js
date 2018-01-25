import React from 'react';
import StartActive from './StartActive';
import StartActiveService from './StartActiveService';
import leaguesSettings from './leaguesSettings';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import parseDate from 'date-fns/parse';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.startActiveService = new StartActiveService(props.config);

    const endDate = this.getSeasonEndDate(props.config.sport);

    this.startDate = parseDate(props.config.startDate);
    this.maxDays = differenceInCalendarDays(endDate, this.startDate) + 1; // includes today
    this.authState = props.config.authState;
  }

  getSeasonEndDate(sport) {
    let date;

    switch (sport) {
      case 'hockey':
        date = leaguesSettings.seasonEndingDate.hockey;
        break;
      case 'football':
        date = leaguesSettings.seasonEndingDate.football;
        break;
      case 'baseball':
        date = leaguesSettings.seasonEndingDate.baseball;
        break;
      case 'basketball':
        date = leaguesSettings.seasonEndingDate.basketball;
        break;
      default:
        date = leaguesSettings.seasonEndingDate.default;
        break;
    }

    return date;
  }

  render() {
    return (
      <div>
        <StartActive
          disabled={this.authState !== 'signedin'}
          title={this.authState !== 'signedin' ? 'You need to "Start Active Players" at least once for this button to be active.' : ''}
          label="Set Till End Of Season"
          maxDays={this.maxDays}
          startDate={this.startDate}
          startActiveService={this.startActiveService} />
      </div>
    );
  }
}

