/* eslint-disable no-undef */
const { validateRequest, createPeople } = require("./add-people");
const { faker } = require("@faker-js/faker");
const {
  people,
  peopleBadBody,
  peopleIncompleteBody,
} = require("../../shared/mocks/mock-people");

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
    it("should return status 200 and create a new people if AWS works with normality", async () => {
      const result = await createPeople(people, faker.internet.domainName());

      expect(result).toMatchObject({
        statusCode: 200,
        body: expect.any(String),
      });
    });

    it("should return status 409 and error message if success any error with AWS", async () => {
      const result = await createPeople(
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
