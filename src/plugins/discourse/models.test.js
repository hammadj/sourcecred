// @flow

import {validateServerUrl} from "./models";

describe("plugins/discourse/models", () => {
  describe("validateServerUrl", () => {
    it("should work with valid server URLs", () => {
      const expected = [
        {serverUrl: "https://foo.bar", validatedUrl: "https://foo.bar"},
        {
          serverUrl: "http://example.com/",
          validatedUrl: "http://example.com",
        },
        {
          serverUrl: "HTTPS://Casing.WTF",
          validatedUrl: "https://casing.wtf",
        },
        {
          serverUrl: "https://custom.port.wtf:9001",
          validatedUrl: "https://custom.port.wtf:9001",
        },
        {
          serverUrl: "https://discourse.sourcecred.io/",
          validatedUrl: "https://discourse.sourcecred.io",
        },
      ];

      const actual = expected.map(({serverUrl}) => ({
        serverUrl,
        validatedUrl: validateServerUrl(serverUrl),
      }));

      expect(expected).toEqual(actual);
    });

    it("should fail on invalid server urls", () => {
      const expected = {
        "file:///dev/null": (url) =>
          `Provided Discourse Server URL was invalid: ${url}\n` +
          `URL should have a http/https protocol: file:`,
        "http://foo.bar/path": (url) =>
          `Provided Discourse Server URL was invalid: ${url}\n` +
          `URL should not have a pathname: /path`,
        "http://foo.bar/?search": (url) =>
          `Provided Discourse Server URL was invalid: ${url}\n` +
          `URL should not have a search component: ?search`,
        "http://foo.bar/#hash": (url) =>
          `Provided Discourse Server URL was invalid: ${url}\n` +
          `URL should not have a hash component: #hash`,
      };

      for (const url in expected) {
        expect(() => validateServerUrl(url)).toThrow(expected[url](url));
      }
    });
  });
});
