/* eslint-disable no-undef */
const { getAllStarships } = require("./get-all-starships");
const { eventBody } = require("../../shared/mocks/mock-event");
const { allStarshipsResponse } = require("../../shared/mocks/mock-starship");

const mockDocumentClientInstance = jest
  .fn()
  .mockImplementationOnce(() => {
    return {
      promise() {
        return Promise.resolve({ Items: allStarshipsResponse });
      },
    };
  })
  .mockImplementationOnce(() => {
    throw new Error("error");
  });

jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        scan: mockDocumentClientInstance,
      })),
    },
  };
});

describe("get-all-starships", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllStarships", () => {
    it("should return status 200 and array of people if AWS works with normality", async () => {
      const result = await getAllStarships(eventBody);

      expect(result).toMatchObject({
        statusCode: 200,
        body: expect.any(String),
      });
    });

    it("should return status 409 and error message if success any error with AWS", async () => {
      const result = await getAllStarships(eventBody);

      expect(result).toMatchObject({
        statusCode: 409,
        body: expect.any(String),
      });
    });
  });
});
