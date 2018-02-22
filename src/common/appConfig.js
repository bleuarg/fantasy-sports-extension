import URL from 'url-parse';
import qs from 'qs';

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

const appConfig = getAppConfig();

export default appConfig;