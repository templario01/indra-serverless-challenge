/* eslint-disable no-undef */
const { getAllPeople } = require("./get-all-people");
const { eventBody } = require("../../shared/mocks/mock-event");
const { allPeopleResponse } = require("../../shared/mocks/mock-people");

const mockDocumentClientInstance = jest
  .fn()
  .mockImplementationOnce(() => {
    return {
      promise() {
        return Promise.resolve({ Items: allPeopleResponse });
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

describe("get-all-people", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllPeople", () => {
    it("should return status 200 and array of people if AWS works with normality", async () => {
      const result = await getAllPeople(eventBody);

      expect(result).toMatchObject({
        statusCode: 200,
        body: expect.any(String),
      });
    });

    it("should return status 409 and error message if success any error with AWS", async () => {
      const result = await getAllPeople(eventBody);

      expect(result).toMatchObject({
        statusCode: 409,
        body: expect.any(String),
      });
    });
  });
});
