// @flow

import {validateServerUrl} from "./models";
import {cacheKey} from "./cacheKey";

describe("plugins/discourse/cacheKey", () => {
  describe("cacheKey", () => {
    it("should work with valid server URLs", () => {
      const expected = [
        {serverUrl: "https://foo.bar", cacheKey: "discourse_https_foo.bar"},
        {
          serverUrl: "http://example.com/",
          cacheKey: "discourse_http_example.com",
        },
        {
          serverUrl: "HTTPS://Casing.WTF",
          cacheKey: "discourse_https_casing.wtf",
        },
        {
          serverUrl: "https://custom.port.wtf:9001",
          cacheKey: "discourse_https_custom.port.wtf_9001",
        },
        {
          serverUrl: "https://discourse.sourcecred.io/",
          cacheKey: "discourse_https_discourse.sourcecred.io",
        },
      ];

      const actual = expected.map(({serverUrl}) => ({
        serverUrl,
        cacheKey: cacheKey(validateServerUrl(serverUrl)),
      }));

      expect(expected).toEqual(actual);
    });
  });
});
