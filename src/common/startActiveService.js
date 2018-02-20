import {keys} from 'lodash';
import addDays from 'date-fns/add_days';
import formatDate from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import endOfWeek from 'date-fns/end_of_week';
import appConfig from '../common/appConfig';

export const ranges = {
  WEEK: 'WEEK',
  MONTH: 'MONTH'
};

class StartActiveService {
  constructor(config) {
    this.config = {
      protocol: null,
      host: null,
      league: null,
      leagueId: null,
      teamId: null,
      crumb: null,
    };

    this.validateConfig(config); // throws if wrong
    this.config = config;
    this.startActiveUrl = `${config.protocol}://${config.host}/${config.league}/${config.leagueId}/${config.teamId}/startactiveplayers?crumb=${config.crumb}`;
  }

  validateConfig(config) {
    const requiredKeys = keys(this.config);
    const valid = requiredKeys.every(key => keys(config).indexOf(key) != -1);

    if (!valid) {
      throw 'StartActiveService: Missing config values.';
    }
  }

  getDates(startDate, range) {
    let dates = [];
    const endDate = endOfWeek(startDate, { weekStartsOn: 1 });
    const days = differenceInCalendarDays(endDate, startDate) + 1;

    switch(range) {
      case ranges.WEEK:
      default:
        for (let i = 0; i < days; i++) {
          dates.push(formatDate(addDays(startDate, i), 'YYYY-MM-DD'));
        }
      break;
    }

    return dates;
  }

  getUrl(date) {
    return `${this.startActiveUrl}&date=${formatDate(date, 'YYYY-MM-DD')}`;
  }

  setForDate(date) {
    return this.callUrl(this.getUrl(date));
  }

  callUrl(url) {
    return fetch(url, {
      credentials: 'include'
    })
    .then(res => res.text())
    .then(body => {
      if (/F-error/gm.test(body)) {
        throw 'Error displayed on the result page';
      }
    });
  }
}

export default new StartActiveService(appConfig);