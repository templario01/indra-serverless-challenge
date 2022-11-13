const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");
const joi = require("joi");

const validateRequest = async (input) => {
  try {
    const schema = joi.object({
      nombre: joi.string().required(),
      clasificacion: joi.string().required(),
      designacion: joi.string().required(),
      altura: joi
        .string()
        .regex(/^[0-9]+$/)
        .required(),
      color_de_piel: joi.string().required(),
      color_de_cabello: joi.string().required(),
      color_de_ojos: joi.string().required(),
      esperanza_de_vida: joi.string().required(),
      lugar_nacimiento: joi.string().required(),
      lenguaje: joi.string().required(),
      peliculas: joi.array().optional(),
    });
    const validInput = await schema.validateAsync(input, { abortEarly: false });

    return { isValid: true, result: validInput };
  } catch (error) {
    console.error(error);

    return { isValid: false, result: error.message };
  }
};

const cresteSpecie = async (input, domain) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const createdAt = new Date().toISOString();
    const id = v4();

    const newSpecie = {
      id,
      fecha_actualizacion: createdAt,
      fecha_de_creacion: createdAt,
      url: `https://${domain}/species/${id}`,
      ...input,
    };

    await dynamodb
      .put({
        TableName: "Especies",
        Item: newSpecie,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 200, result: newSpecie }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 409,
      body: JSON.stringify({ status: 409, message: error.message }),
    };
  }
};

const addSpecie = async ({ body, headers }) => {
  const { isValid, result } = await validateRequest(body);
  if (!isValid) {
    return {
      statusCode: 400,
      body: JSON.stringify({ status: 400, message: result }),
    };
  }

  const response = await cresteSpecie(result, headers.host);

  return response;
};

module.exports = {
  addSpecie: middy(addSpecie).use(jsonBodyParser()),
  validateRequest,
  cresteSpecie,
};
