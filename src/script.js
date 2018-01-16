// Start Active Players in Yahoo Fantasy Hockey League

import leftPad from 'left-pad';
import Promise from 'bluebird';
import differenceInCalendarDays from 'date-fns/difference_in_days';
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'

// timer is a global object. If anything goes wrong,
// we can cancel it with clearInterval(timer)
var timer = undefined;

//
var leagueToSportMap = {
  'nba' : 'basketball',
  'hockey' : 'hockey',
  'nfl' : 'football',
  'mlb' : 'baseball'
};

function getEndDate(sport) {
  // Since end dates change season-to-season
  // We're going to use a default date
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

// Undefined variables (for now) to store dates
var daysRemaining, newYear, newMonth, newDay;

const config = {
  league: null,
  sport: null,
  leagueID: null,
  teamID: null,
  crumb: null,
};

// The URL holds the information to your league and team IDs
const url = window.location.pathname.split('/');
config.league = url[1];
config.sport = leagueToSportMap[config.league];
config.leagueID = url[2];
config.teamID = url[3];
config.crumb = document.getElementById('yucs-meta').dataset.crumb;

//new Promise.map(urlsToCall => getUrl(urlsToCall), { concurrency: 4 });

function generateUrlsToCall(daysRemaining) {
  let urls = [];
  let newDay;
  console.log(daysRemaining)
  for (let i = 0; i < daysRemaining; i++) {
    newDay = addDays(date, i);
    urls.push(`//${config.sport}.fantasysports.yahoo.com/${config.league}/${config.leagueID}/${config.teamID}/startactiveplayers?date=${format(newDay, 'YYYY-MM-DD')}&crumb=${config.crumb}`);
  }

  return urls;
}

var firstDate = date;
var endDateString = (new Date()).getFullYear() + '-' + getEndDate(config.sport);
var secondDate = new Date(endDateString);

// Calculate the days remaining based on the startDate (or today)
// and the last game of the season (endOfSeason)
daysRemaining = differenceInCalendarDays(secondDate, firstDate);
generateUrlsToCall(daysRemaining);








// (function setDaysRemaining () {
//   // Hours * minutes * seconds * milliseconds

//   var firstDate = date;
//   var endDateString = (new Date()).getFullYear() + '-' + getEndDate(sport);
//   var secondDate = new Date(endDateString);

//   // Calculate the days remaining based on the startDate (or today)
//   // and the last game of the season (endOfSeason)
//   daysRemaining = differenceInCalendarDays(firstDate, secondDate);







//   // Start a timer, fun
//   timer = setInterval(function() {
//     if (daysRemaining > 0) {

//       // Let's create a new URL from your settings
//       startActiveUrl = `//${config.sport}.fantasysports.yahoo.com/${config.league}/${config.leagueID}/${config.teamID}/startactiveplayers?date=${setNewDate()}&crumb=${crumb}`;

//       // Here, we're going to use the jQuery script we loaded before to
//       // send a GET request. Reason being was to send many requests
//       // without having to download any files. Every byte counts for
//       // us Canadians!
//       jQuery.get(startActiveUrl);

//       // Little note for you in the console
//       console.log('Setting roster for: ' + date);

//       daysRemaining -= 1;

//       // Calculate the next date
//       date.setDate(date.getDate() + 1);
//     } else {
//       // If there are no more days remaining from startDate (or today) and
//       // endOfSeason, cancel the timer and show an alert box
//       clearInterval(timer);
//       alert('All of your lineups have been set!');
//     }

//   // JavaScript time is run in milliseconds
//   // 1000ms = 1s
//   // Run the timer every second
//   }, 500);

// })();

// function setNewDate () {
//   // From the new date we created, get the values for year, month, day
//   var newYear = date.getFullYear();

//   // Note: in JavaScript, months run 0 to 11, so April is month 3, not 4
//   // For Yahoo though, we need the actual month number
//   var newMonth = date.getMonth() + 1;
//   var newDay = date.getDate();

//   // Same as in the beginning, if a month or day is a single digit,
//   // add a '0' in front of it; again, for Yahoo
//   leftPad(newMonth, 2, '0');
//   leftPad(newDay, 2, '0');

//   return `${newYear}-${newMonth}-${newDay}`;
// }