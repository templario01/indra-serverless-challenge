/* eslint-disable no-undef */
const { getStarship } = require("./get-starship");
const { eventBody } = require("../../shared/mocks/mock-event");
const {
  swapiStarship,
  starshipResponse,
} = require("../../shared/mocks/mock-starship");

const { faker } = require("@faker-js/faker");
const axios = require("axios");

const mockDocumentClientInstance = jest
  .fn()
  .mockImplementationOnce(() => {
    return {
      promise() {
        return Promise.resolve({ Item: starshipResponse });
      },
    };
  })
  .mockImplementationOnce(() => {
    return {
      promise() {
        return Promise.resolve({});
      },
    };
  });

jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        get: mockDocumentClientInstance,
      })),
    },
  };
});
jest.mock("axios");
axios.get
  .mockImplementationOnce(() => Promise.resolve({ data: swapiStarship }))
  .mockImplementationOnce(() => {
    throw new Error("error");
  });

describe("get-starship", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getStarship", () => {
    it("should return status 200 and starships array of SWAPI with number id", async () => {
      const request = {
        ...eventBody,
        pathParameters: {
          id: faker.datatype.number({ min: 1, max: 99 }),
        },
      };
      const result = await getStarship(request);

      expect(result).toMatchObject({
        statusCode: 200,
        body: expect.any(String),
      });
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should return status 409 and error message if success any error with SWAPI", async () => {
      const request = {
        ...eventBody,
        pathParameters: {
          id: faker.datatype.number({ min: 1, max: 99 }),
        },
      };
      const result = await getStarship(request);

      expect(result).toMatchObject({
        statusCode: 409,
        body: expect.any(String),
      });
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should return status 200 and starships array of DynamoBD with hash id", async () => {
      const request = {
        ...eventBody,
        pathParameters: {
          id: faker.datatype.uuid(),
        },
      };
      const result = await getStarship(request);

      expect(result).toMatchObject({
        statusCode: 200,
        body: expect.any(String),
      });
      expect(axios.get).toHaveBeenCalledTimes(0);
    });

    it("should return status 404 if the id does not exist and error message", async () => {
      const request = {
        ...eventBody,
        pathParameters: {
          id: faker.datatype.uuid(),
        },
      };
      const result = await getStarship(request);

      expect(result).toMatchObject({
        statusCode: 404,
        body: expect.any(String),
      });
      expect(axios.get).toHaveBeenCalledTimes(0);
    });
  });
});
