import { keys } from 'lodash';
import formatDate from 'date-fns/format';

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

  getUrlForDate(date) {
    return `${this.startActiveUrl}&date=${formatDate(date, 'YYYY-MM-DD')}`;
  }

  setForDate(date) {
    return this.callUrl(this.getUrlForDate(date));
  }

  callUrl(url) {
    return fetch(url, {
      credentials: 'include'
    })
    .then(res => res.text())
    .then(body => {
      // F-error, class found in the body of an error page.
      // a bit fragile, but fine for our usage for now.
      if (/F-error/gm.test(body)) {
        throw new Error('Error displayed on the result page');
      }
    });
  }
}

export default StartActiveService;