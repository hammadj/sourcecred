// @flow

export opaque type ServerUrl: string = string;

/**
 * Does a strict validation of ServerUrl inputs and returns an opaque type
 * indicating it matches our assumptions elsewhere.
 */
export function validateServerUrl(serverUrl: string): ServerUrl {
  try {
    const url = new global.URL(serverUrl);
    if (!new RegExp(/^https?/i).test(url.protocol)) {
      throw `URL should have a http/https protocol: ${url.protocol}`;
    }
    if (url.pathname && url.pathname !== "/") {
      throw `URL should not have a pathname: ${url.pathname}`;
    }
    if (url.search) {
      throw `URL should not have a search component: ${url.search}`;
    }
    if (url.hash) {
      throw `URL should not have a hash component: ${url.hash}`;
    }
    // Remove trailing slashes
    return url.toString().replace(/\/+$/, "");
  } catch (e) {
    throw new Error(
      `Provided Discourse Server URL was invalid: ${serverUrl}\n${e}`
    );
  }
}
