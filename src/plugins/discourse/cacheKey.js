// @flow

import {type ServerUrl} from "./models";

/**
 * Creates a cache key that's unique and safe for filesystem use.
 */
export function cacheKey(serverUrl: ServerUrl): string {
  const url = new global.URL(serverUrl);
  const cleanProtocol = url.protocol.replace(/[^a-z]/i, "");
  const portSuffix = url.port ? `_${url.port}` : "";
  return `discourse_${cleanProtocol}_${url.hostname}${portSuffix}`.toLowerCase();
}
