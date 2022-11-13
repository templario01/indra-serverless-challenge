/* eslint-disable no-undef */
const { getPeople } = require("./get-people");
const { eventBody } = require("../../shared/mocks/mock-event");
const { swapiPeople } = require("../../shared/mocks/mock-people");
const { peopleResponse } = require("../../shared/mocks/mock-people");
const { faker } = require("@faker-js/faker");
const axios = require("axios");

const mockDocumentClientInstance = jest.fn().mockImplementation(() => {
  return {
    promise() {
      return Promise.resolve({ Item: peopleResponse });
    },
  };
});
jest.mock("axios");
axios.get.mockImplementation(() => Promise.resolve({ data: swapiPeople }));
jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        get: mockDocumentClientInstance,
      })),
    },
  };
});

describe("get-people", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPeople", () => {
    it("should return status 200 and people array of SWAPI with number id", async () => {
      const request = {
        ...eventBody,
        pathParameters: {
          id: faker.datatype.number({ min: 1, max: 99 }),
        },
      };
      const result = await getPeople(request);

      expect(result).toMatchObject({
        statusCode: 200,
        body: expect.any(String),
      });
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should return status 200 and people array of DynamoBD with hash id", async () => {
      const request = {
        ...eventBody,
        pathParameters: {
          id: faker.datatype.uuid(),
        },
      };
      const result = await getPeople(request);

      expect(result).toMatchObject({
        statusCode: 200,
        body: expect.any(String),
      });
      expect(axios.get).toHaveBeenCalledTimes(0);
    });
  });
});
