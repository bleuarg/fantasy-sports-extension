'use strict';
// Start Active Players in Yahoo Fantasy Hockey League

import leftPad from 'left-pad';
import pMap from 'p-map';
import differenceInCalendarDays from 'date-fns/difference_in_days';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import URL from 'url-parse';
import qs from 'qs';
import css from './styles.css';

// timer is a global object. If anything goes wrong,
// we can cancel it with clearInterval(timer)
var leagueToSportMap = {
  'nba' : 'basketball',
  'hockey' : 'hockey',
  'nfl' : 'football',
  'mlb' : 'baseball'
};

function getEndDate(sport) {
  switch (sport) {
    case 'hockey':
      return '04-15';
    case 'football':
      return '01-15'
    case 'baseball':
      return '10-15'
    case 'basketball':
      return '05-01'
    default:
      return '06-01'
  }
}

// Date you want to start setting your active players, YYYY-MM-DD
// Make sure it's set within the same quotation marks on either side
// You can leave this commented out; it'll start on today's date
// var startDate = 'YYYY-MM-DD';

// If you've specified a custom start date, use that
// If not, use today as a starting point

var date;

if (typeof startDate !== 'undefined') {
  date = new Date(startDate);
} else {
  date = new Date();
}

const authStates = {
  middleAuth: 'middleauth',
  signedIn: 'signedin',
}


// todo refactor setup
const config = {
  league: null,
  sport: null,
  leagueID: null,
  teamID: null,
  crumb: null,
  authState: null,
  host: null,
  protocol: null,
};


const startActiveUrl = new URL(document.querySelector('a[href*=startactiveplayers]').href)
const url = startActiveUrl.pathname.split('/');

config.host = document.getElementById('yucs-meta').dataset.host;
config.protocol = document.getElementById('yucs-meta').dataset.protocol;
config.authState = document.getElementById('yucs-meta').dataset.authstate;

config.league = url[1];
config.leagueID = url[2];
config.teamID = url[3];
config.sport = config.host.split('.')[0];
config.crumb = qs.parse(startActiveUrl.query).crumb;

console.log(config)
//new Promise.map(urlsToCall => getUrl(urlsToCall), { concurrency: 4 });

function generateUrlsToCall(daysRemaining) {
  let urls = [];
  let newDay;

  for (let i = 0; i < daysRemaining; i++) {
    newDay = addDays(date, i);
    urls.push(`${config.protocol}://${config.host}/${config.league}/${config.leagueID}/${config.teamID}/startactiveplayers?date=${format(newDay, 'YYYY-MM-DD')}&crumb=${config.crumb}`);
  }

  return urls;
}

var total = null;
var doneCount = 0;

function callUrls(urlsToCall) {
  total = urlsToCall.length;
  doneCount = 0;
  button.classList.add('is-active');
  refreshDisplay(doneCount, total);

  return pMap(urlsToCall, url => callUrl(url), { concurrency: 5 })
    .then(() => {
      console.log('done')
    }).catch(e => {
      console.error(e);
    })
}

function increment() {
  doneCount++;
  refreshDisplay(doneCount, total);
}

function refreshDisplay(doneCount, total) {
  const display = `${doneCount}/${total}`;
  const percentage = `${Math.round(doneCount/total*100)}%`;
  button.style.background = `linear-gradient(90deg, #0056b7 ${percentage}, #0078ff ${percentage})`;
  button.setAttribute('data-content', display);
}

function callUrl(url) {
  return new Promise(resolve => setTimeout(() => {
    increment();
    resolve();
  }, Math.round(Math.random()*1000)));
}


var firstDate = date;
var endDateString = (new Date()).getFullYear() + '-' + getEndDate(config.sport);
var secondDate = new Date(endDateString);

// Calculate the days remaining based on the startDate (or today)
// and the last game of the season (endOfSeason)
var daysRemaining = differenceInCalendarDays(secondDate, firstDate);


let button = null;
function addButton() {
  const ref = document.querySelector('a[href*=startactiveplayers]');
  button = document.createElement('button');
  button.className = 'Btn Btn-short Btn-primary Mend-med YSE-StartActive';
  button.innerHTML = 'From Current Date Till End Of Season';

  if (config.authState === authStates.middleAuth) {
    button.classList.add('Btn-disabled');
    button.disabled = true;
    button.title = 'You need to click Start Active Players once for this to be active.';
  }

  button.addEventListener('click', () => {
    console.log('what')
    callUrls(generateUrlsToCall(daysRemaining));
  });

  ref.insertAdjacentElement('afterend', button);
}

addButton();