const AWS = require("aws-sdk");

// eslint-disable-next-line no-unused-vars
const getAllSpecies = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb
      .scan({
        TableName: "Especies",
      })
      .promise();

    const species = result.Items;

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 200, result: species }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 409,
      body: JSON.stringify({ status: 409, message: error.message }),
    };
  }
};

module.exports = {
  getAllSpecies,
};
