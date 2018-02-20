import test from 'ava';
import StartActiveService from '../src/common/startActiveService';
import addDays from 'date-fns/add_days';
import sinon from 'sinon';


const defaultConfig = {
  protocol: 'https',
  host: 'hockey.fantasysports.yahoo.com',
  league: 'hockey',
  leagueId: '312',
  teamId: '123',
  crumb: 'xxx'
};


// test('Promise is resolved', t => {
//   const startActiveService = new StartActiveService(defaultConfig);

//   return startActiveService.startActive(new Date(), 10)
//     .then(() => {
//       t.pass();
//     });
// });

// test('Progress is called when calls progress', t => {
//   const startActiveService = new StartActiveService(defaultConfig);

//   t.plan(11);

//   const progress = (done, total) => {
//     t.pass();
//   };

//   return startActiveService.startActive(new Date(), 10, progress)
//     .then(() => {
//       t.pass();
//     });
// });