import pMap from 'p-map';
import {isFunction, keys} from 'lodash';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';

class StartActiveService {
  constructor(config) {
    // setup url
    this.daysToSet = 0;
    this.daysDone = 0;

    this.config = {
      protocol: null,
      host: null,
      league: null,
      leagueId: null,
      teamId: null,
      crumb: null,
    };

    this.validateConfig(config);
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

  startActive(startDate, daysToSet, progress) {
    const urls = this.getStartActiveUrls(startDate, daysToSet);

    this.daysToSet = daysToSet;
    this.done = 0;

    return pMap(urls, url => {
      // TODO: validate that response is empty so these will be fire and forget
      return this.callUrl(url)
        .then(() => {
          this.done++;
          if (isFunction(progress)) {
            progress(this.done, this.daysToSet);
          }
        });
    }, { concurrency: 5 });
  }

  getStartActiveUrls(startDate, daysToSet) {
    let urls = [];
    let newDay;

    // starts at 0 to add 0 days thus setting roster for current date.
    for (let i = 0; i < daysToSet; i++) {
      newDay = addDays(startDate, i);
      urls.push(`${this.startActiveUrl}&date=${format(newDay, 'YYYY-MM-DD')}`);
    }

    return urls;
  }

  callUrl(url, progress) {
    const fetch = () => { return new Promise(resolve => setTimeout(resolve, Math.round(Math.random()*300))); };

    return fetch(url);

  //   return fetch(url, {
  //     credentials: 'include'
  //     })
  //     .then(increment);
  // }
  }
}

export default StartActiveService;