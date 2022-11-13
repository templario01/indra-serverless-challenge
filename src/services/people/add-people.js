const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");
const joi = require("joi");

const validateRequest = async (input) => {
  try {
    const schema = joi.object({
      nombre: joi.string().required(),
      altura: joi
        .string()
        .regex(/^[0-9]+$/)
        .required(),
      masa: joi
        .string()
        .regex(/^[0-9]+$/)
        .required(),
      color_cabello: joi.string().required(),
      color_piel: joi.string().required(),
      color_ojos: joi.string().required(),
      nacimiento: joi.string().required(),
      genero: joi.string().valid("masculino", "femenino").required(),
      lugar_nacimiento: joi.string().required(),
      peliculas: joi.array().optional(),
      especies: joi.array().optional(),
      vehiculos: joi.array().optional(),
      naves: joi.array().optional(),
    });
    const validInput = await schema.validateAsync(input, { abortEarly: false });

    return { isValid: true, result: validInput };
  } catch (error) {
    console.error(error);

    return { isValid: false, result: error.message };
  }
};

const createPeople = async (input, domain) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const createdAt = new Date().toISOString();
    const id = v4();

    const newPeople = {
      id,
      fecha_actualizacion: createdAt,
      fecha_de_creacion: createdAt,
      url: `https://${domain}/personas/${id}`,
      ...input,
    };

    await dynamodb
      .put({
        TableName: "Personas",
        Item: newPeople,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 200, result: newPeople }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 409,
      body: JSON.stringify({ status: 409, error: error.message }),
    };
  }
};

const addPeople = async ({ body, headers }) => {
  let response;
  const { isValid, result } = await validateRequest(body);
  if (isValid) {
    response = await createPeople(result, headers.host);

    return response;
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ status: 400, error: result }),
  };
};

module.exports = {
  addPeople: middy(addPeople).use(jsonBodyParser()),
  validateRequest,
  createPeople,
};
