'use strict';
// Start Active Players in Yahoo Fantasy Hockey League

import leftPad from 'left-pad';
import pMap from 'p-map';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import URL from 'url-parse';
import qs from 'qs';
import settings from './settings.js'

import css from './styles.css';

var leagueToSportMap = {
  'nba' : 'basketball',
  'hockey' : 'hockey',
  'nfl' : 'football',
  'mlb' : 'baseball'
};

console.trace(settings);

function getEndDate(sport) {
  let date;

  switch (sport) {
    case 'hockey':
      date = settings.seasonEndingDate.hockey;
      break;
    case 'football':
      date = settings.seasonEndingDate.football;
      break;
    case 'baseball':
      date = settings.seasonEndingDate.baseball;
      break;
    case 'basketball':
      date = settings.seasonEndingDate.basketball;
      break;
    default:
      date = settings.seasonEndingDate.default;
      break;
  }

  return date;
}

const authStates = {
  middleAuth: 'middleauth',
  signedIn: 'signedin',
}

// todo refactor setup
const config = {
  league: null,
  sport: null,
  leagueId: null,
  teamId: null,
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

// from pathname: /{league}/{leagueId}/{teamId}
config.league = url[1];
config.leagueId = url[2];
config.teamId = url[3];

// host is {sport}.fantasysports.yahoo.com
config.sport = config.host.split('.')[0];
config.crumb = qs.parse(startActiveUrl.query).crumb;

log.trace(config)
//new Promise.map(urlsToCall => getUrl(urlsToCall), { concurrency: 4 });

function generateUrlsToCall(startDate, daysRemaining) {
  let urls = [];
  let newDay;

  for (let i = 0; i < daysRemaining; i++) {
    newDay = addDays(startDate, i);
    urls.push(`${config.protocol}://${config.host}/${config.league}/${config.leagueId}/${config.teamId}/startactiveplayers?date=${format(newDay, 'YYYY-MM-DD')}&crumb=${config.crumb}`);
  }

  return urls;
}

var total = null;
var doneCount = 0;

function callUrls(urlsToCall) {
  console.trace(urlsToCall)
  total = urlsToCall.length;
  doneCount = 0;
  button.classList.add('is-active');
  refreshDisplay(doneCount, total);

  return pMap(urlsToCall, url => callUrl(url), { concurrency: 5 })
    .then(() => {
      console.info('Done setting roster')
      finished();
    }).catch(e => {
      console.error('Error occured while setting roster.')
      console.error(e);
    })
}

function finished() {
  button.classList.remove('is-active');
  button.style.background = null;
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
  //console.log(url);

  return fetch(url, {
      credentials: 'include'
    })
    .then(increment);
}

var startDate = new Date();
var endDate = getEndDate(config.sport);
var daysRemaining = differenceInCalendarDays(endDate, startDate) + 1; // include today


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
    callUrls(generateUrlsToCall(startDate, daysRemaining));
  });

  ref.insertAdjacentElement('afterend', button);
}

addButton();