import test from 'ava';
import StartActiveService from './startActiveService';
import sinon from 'sinon';

test.before(() => {
  global.fetch = sinon.stub().returns(
    Promise.resolve({
      text: () => ''
    })
  );
});

test.beforeEach(() => {
  global.fetch.resetHistory();
});

test('throws if configs are not valid', t => {
  t.throws(() => {
    new StartActiveService({});
  });
});

test('instanciates if config is valid', t => {
  const config = {
    protocol: null,
    host: null,
    league: null,
    leagueId: null,
    teamId: null,
    crumb: null
  };

  const service = new StartActiveService(config);
  t.true(service instanceof StartActiveService);
});

test('setForDate calls the correct url', t => {
  const config = {
    protocol: 'https',
    host: 'example.org',
    league: '123',
    leagueId: '456',
    teamId: '789',
    crumb: 'crumb'
  };

  const service = new StartActiveService(config);
  const expected = [
    'https://example.org/123/456/789/startactiveplayers?crumb=crumb&date=2018-02-02',
    { credentials: 'include' }
  ];

  service.setForDate('2018-02-02');

  t.true(global.fetch.calledWith(...expected));
});

// TODO: change this to use async/await, can't right now because current machine has old node.
test.cb('setForDate throws error if the error class "F-error" is present in response body', t => {
  const config = {
    protocol: 'https',
    host: 'example.org',
    league: '123',
    leagueId: '456',
    teamId: '789',
    crumb: 'crumb'
  };

  global.fetch.returns(
    Promise.resolve({
      text: () => 'F-error'
    })
  );

  const service = new StartActiveService(config);

  const error = t.throws(service.setForDate('2018-02-02'));
  error.then(() => {
    t.end();
  });
});
