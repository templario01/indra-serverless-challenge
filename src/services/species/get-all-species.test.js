/* eslint-disable no-undef */
const { getAllSpecies } = require("./get-all-species");
const { eventBody } = require("../../shared/mocks/mock-event");
const { allSpeciesResponse } = require("../../shared/mocks/mock-species");

const mockDocumentClientInstance = jest
  .fn()
  .mockImplementationOnce(() => {
    return {
      promise() {
        return Promise.resolve({ Items: allSpeciesResponse });
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

describe("get-all-species", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllSpecies", () => {
    it("should return status 200 and array of species if AWS works with normality", async () => {
      const result = await getAllSpecies(eventBody);

      expect(result).toMatchObject({
        statusCode: 200,
        body: expect.any(String),
      });
    });

    it("should return status 409 and error message if success any error with AWS", async () => {
      const result = await getAllSpecies(eventBody);

      expect(result).toMatchObject({
        statusCode: 409,
        body: expect.any(String),
      });
    });
  });
});
