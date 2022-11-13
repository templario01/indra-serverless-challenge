/* eslint-disable no-undef */
const { validateRequest, createPeople } = require("./add-people");
const { faker } = require("@faker-js/faker");
const {
  people,
  peopleBadBody,
  peopleIncompleteBody,
} = require("../../shared/mocks/mock-people");

const mockDocumentClientInstance = {
  put: jest.fn().mockReturnThis(),
  promise: jest.fn(),
};
jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => mockDocumentClientInstance),
    },
  };
});

describe("add-people", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("validateRequest", () => {
    it("should return the same object and property isValid as true if all fields are correct", async () => {
      const result = await validateRequest(people);

      expect(result).toMatchObject({
        isValid: true,
        result: people,
      });
    });

    it("should return isValid as false and error message in result if some field is invalid", async () => {
      const result = await validateRequest(peopleBadBody);

      expect(result).toMatchObject({
        isValid: false,
        result: expect.any(String),
      });
    });

    it("should return isValid as false and error message in result if are missing fields", async () => {
      const result = await validateRequest(peopleIncompleteBody);

      expect(result).toMatchObject({
        isValid: false,
        result: expect.any(String),
      });
    });
  });

  describe("createPeople", () => {
    it("should return status 200 and create a new people if AWS is working with normality", async () => {
      const result = await createPeople(people, faker.internet.domainName());

      expect(result).toMatchObject({
        statusCode: 200,
        body: expect.any(String),
      });
    });
  });
});
