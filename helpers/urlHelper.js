const getHashURL = () => {
  if (window && window.location.hash) {
    return window.location.hash.split('#')[1];
  }
  return '';
};

const getPathUrlToNumber = numberUrlPath => {
  if (location.pathname) {
    let urlPath = location.pathname;
    return urlPath.split('/')[numberUrlPath];
  }
  return '';
};

const getParam = variable => {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};

const normalizeUrl = (
  url,
  absolute = true,
  apiUrl = process.env.REACT_APP_LINK_API_V2
) => {
  url = (url || '').replace(new RegExp('&amp;', 'g'), '&');
  const hasProtocol = /^https?:\/\//.test(url);
  var relativeUrl = (url[0] !== '/' ? '/' : '') + url;
  var result = relativeUrl;
  if (absolute) {
    if (hasProtocol) {
      result = url;
    } else {
      result = apiUrl + relativeUrl;
    }
  } else if (hasProtocol) {
    result = url.replace(/^https?:\/\/[^/]+\//, '/');
  }
  return result;
};

export { getHashURL, getPathUrlToNumber, getParam, normalizeUrl };
