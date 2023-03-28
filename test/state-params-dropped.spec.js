"use strict";

const axios = require("axios");
const expect = require("chai").expect;
const path = require("path");
const { PactV3, SpecificationVersion } = require("@pact-foundation/pact");
const LOG_LEVEL = process.env.LOG_LEVEL || "DEBUG";

describe("Test Pact.js", () => {
  const port = 8992;

  const provider = new PactV3({
    port: port,
    dir: path.resolve(process.cwd(), "pacts"),
    spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
    consumer: "MyConsumer",
    provider: "MyProvider",
    logLevel: LOG_LEVEL,
  });

  before(() => {
    function generateInteraction(index) {
      return {
        states: [
          { description: `state ${index}`, parameters: [`param${index}`] },
          {
            description: `another state ${index}`,
            parameters: [`anotherParam${index}`],
          },
        ],
        uponReceiving: `request ${index}`,
        withRequest: {
          method: "GET",
          path: `/${index}`,
        },
        willRespondWith: {
          status: 200,
        },
      };
    }
    provider.addInteraction(generateInteraction(1));
  });

  it("works", async () => {
    await provider.executeTest(async () => {
      const response1 = await axios.request({
        method: "GET",
        baseURL: `http://localhost:${port}`,
        url: "/1",
      });
      expect(response1.status).to.equal(200);
    });
  });
});
