const AWS = require("aws-sdk");

// eslint-disable-next-line no-unused-vars
const getAllPeople = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb
      .scan({
        TableName: "Personas",
      })
      .promise();

    const people = result.Items;

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 200, personas: people }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 409,
      body: JSON.stringify({ status: 409, error: error.message }),
    };
  }
};

module.exports = {
  getAllPeople,
};
