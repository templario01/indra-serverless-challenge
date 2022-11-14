/* eslint-disable no-undef */
const { getSpecie } = require("./get-specie");
const { eventBody } = require("../../shared/mocks/mock-event");
const { swapiSpecie, specieResponse } = require("../../shared/mocks/mock-species");
const { faker } = require("@faker-js/faker");
const axios = require("axios");

const mockDocumentClientInstance = jest
  .fn()
  .mockImplementationOnce(() => {
    return {
      promise() {
        return Promise.resolve({ Item: specieResponse });
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
  .mockImplementationOnce(() => Promise.resolve({ data: swapiSpecie }))
  .mockImplementationOnce(() => {
    throw new Error("error");
  });

describe("get-specie", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getSpecie", () => {
    it("should return status 200 and get specie from SWAPI if set number id", async () => {
      const request = {
        ...eventBody,
        pathParameters: {
          id: faker.datatype.number({ min: 1, max: 99 }),
        },
      };
      const result = await getSpecie(request);

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
      const result = await getSpecie(request);

      expect(result).toMatchObject({
        statusCode: 409,
        body: expect.any(String),
      });
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("should return status 200 and get specie from DynamoDB if set alphanumeric id", async () => {
      const request = {
        ...eventBody,
        pathParameters: {
          id: faker.datatype.uuid(),
        },
      };
      const result = await getSpecie(request);

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
      const result = await getSpecie(request);

      expect(result).toMatchObject({
        statusCode: 404,
        body: expect.any(String),
      });
      expect(axios.get).toHaveBeenCalledTimes(0);
    });
  });
});
