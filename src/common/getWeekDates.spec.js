import test from 'ava';
import getWeekDates from './getWeekDates';

test('getDates returns days til sunday if on monday', t => {
  const expected = [
    '2018-03-26',
    '2018-03-27',
    '2018-03-28',
    '2018-03-29',
    '2018-03-30',
    '2018-03-31',
    '2018-04-01'
  ];
  const result = getWeekDates('2018-03-26');

  t.deepEqual(result, expected);
});

test('getDates returns days til sunday if on tuesday', t => {
  const expected = [
    '2018-03-27',
    '2018-03-28',
    '2018-03-29',
    '2018-03-30',
    '2018-03-31',
    '2018-04-01'
  ];
  const result = getWeekDates('2018-03-27');

  t.deepEqual(result, expected);
});

test('getDates returns days til sunday if on wednesday', t => {
  const expected = [
    '2018-03-28',
    '2018-03-29',
    '2018-03-30',
    '2018-03-31',
    '2018-04-01'
  ];
  const result = getWeekDates('2018-03-28');

  t.deepEqual(result, expected);
});

test('getDates returns days til sunday if on thursday', t => {
  const expected = ['2018-03-29', '2018-03-30', '2018-03-31', '2018-04-01'];
  const result = getWeekDates('2018-03-29');

  t.deepEqual(result, expected);
});

test('getDates returns days til sunday if on friday', t => {
  const expected = ['2018-03-30', '2018-03-31', '2018-04-01'];
  const result = getWeekDates('2018-03-30');

  t.deepEqual(result, expected);
});

test('getDates returns days til sunday if on tuesday', t => {
  const expected = ['2018-03-31', '2018-04-01'];
  const result = getWeekDates('2018-03-31');

  t.deepEqual(result, expected);
});

test('getDates returns days til next sunday if on sunday', t => {
  const expected = [
    '2018-04-01',
    '2018-04-02',
    '2018-04-03',
    '2018-04-04',
    '2018-04-05',
    '2018-04-06',
    '2018-04-07',
    '2018-04-08'
  ];
  const result = getWeekDates('2018-04-01');

  t.deepEqual(result, expected);
});