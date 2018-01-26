'use strict';
// Start Active Players in Yahoo Fantasy Hockey League

//import React from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import URL from 'url-parse';
import qs from 'qs';

import App from './components/App';
import css from './main.css';

function getAppConfig() {
  const appConfig = {};
  const startActiveUrl = new URL(document.querySelector('a[href*=startactiveplayers]').href);
  const startActiveQs = qs.parse(startActiveUrl.query, { ignoreQueryPrefix: true });
  const url = startActiveUrl.pathname.split('/');
  const metaElement = document.getElementById('yucs-meta');

  appConfig.host = metaElement.dataset.host;
  appConfig.protocol = metaElement.dataset.protocol;
  appConfig.authState = metaElement.dataset.authstate;

  // from pathname: /{league}/{leagueId}/{teamId}
  appConfig.league = url[1];
  appConfig.leagueId = url[2];
  appConfig.teamId = url[3];

  // host is {sport}.fantasysports.yahoo.com
  appConfig.sport = appConfig.host.split('.')[0];
  appConfig.crumb = startActiveQs.crumb;
  appConfig.startDate = startActiveQs.date;

  return appConfig;
}

function initApp() {
  const ref = document.querySelector('a[href*=startactiveplayers]');
  const root = document.createElement('div');
  root.id = "FSE-root";
  ref.insertAdjacentElement('afterend', root);

  ReactDOM.render(
    <App config={getAppConfig()}/>,
    root
  );
}

initApp();