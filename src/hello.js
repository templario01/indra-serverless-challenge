"use strict";

module.exports.hello = async (event) => {
    const currentDate = new Date() 
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "hello world!!",
        input: event,
      },
      null,
      2
    ),
  };
};
