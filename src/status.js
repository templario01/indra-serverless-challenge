"use strict";

module.exports.status = async ({ requestContext }) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `healthly check`,
      documentation:
        "https://app.swaggerhub.com/apis-docs/templario01/serverless/0.0.1",
      info: requestContext,
    }),
  };
};
