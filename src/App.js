import React from 'react';
import StartActive from './StartActive';
import StartActiveService from './StartActiveService';
import leaguesSettings from './leaguesSettings';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.startActiveService = new StartActiveService(props.config);
    
    const endDate = this.getSeasonEndDate(props.config.sport);
    this.maxDays = differenceInCalendarDays(endDate, new Date()) + 1; // include today
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
          disabled={this.authState !==  'signedin'}
          label="Set Till End Of Season"
          maxDays={this.maxDays}
          startActiveService={this.startActiveService} />
      </div>
    );
  }
}

