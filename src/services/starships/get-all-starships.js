const AWS = require("aws-sdk");

// eslint-disable-next-line no-unused-vars
const getAllStarships = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb
      .scan({
        TableName: "Naves",
      })
      .promise();

    const starships = result.Items;

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 200, result: starships }),
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
  getAllStarships,
};
