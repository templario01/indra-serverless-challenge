"use strict";

module.exports.status = async (event) => {
  const currentDate = new Date();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `healthly check, time: ${currentDate}`,
        input: event,
      },
      null,
      2
    ),
  };
};
