/* eslint-disable no-undef */
const { validateRequest, cresteSpecie } = require("./add-specie");
const { faker } = require("@faker-js/faker");
const {
  specie,
  specieBadBody,
  specieIncompleteBody,
} = require("../../shared/mocks/mock-species");

const mockDocumentClientInstance = jest
  .fn()
  .mockImplementationOnce(() => {
    return {
      promise() {
        return Promise.resolve({});
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
        put: mockDocumentClientInstance,
      })),
    },
  };
});

describe("add-specie", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("validateRequest", () => {
    it("should return the same object and property isValid as true if all fields are correct", async () => {
      const result = await validateRequest(specie);

      expect(result).toMatchObject({
        isValid: true,
        result: specie,
      });
    });

    it("should return isValid as false and error message in result if some field is invalid", async () => {
      const result = await validateRequest(specieBadBody);

      expect(result).toMatchObject({
        isValid: false,
        result: expect.any(String),
      });
    });

    it("should return isValid as false and error message in result if are missing fields", async () => {
      const result = await validateRequest(specieIncompleteBody);

      expect(result).toMatchObject({
        isValid: false,
        result: expect.any(String),
      });
    });
  });

  describe("cresteSpecie", () => {
    it("should return status 200 and create a new specie if AWS works with normality", async () => {
      const result = await cresteSpecie(specie, faker.internet.domainName());

      expect(result).toMatchObject({
        statusCode: 200,
        body: expect.any(String),
      });
    });

    it("should return status 409 and error message if success any error with AWS", async () => {
      const result = await cresteSpecie(
        JSON.parse(faker.datatype.json()),
        faker.internet.domainName()
      );

      expect(result).toMatchObject({
        statusCode: 409,
        body: expect.any(String),
      });
    });
  });
});
