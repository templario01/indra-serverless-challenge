const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");
const joi = require("joi");

const validateRequest = async (input) => {
  try {
    const schema = joi.object({
      nombre: joi.string().required(),
      modelo: joi.string().required(),
      manufactura: joi.string().required(),
      costo_en_creditos: joi
        .string()
        .regex(/^[0-9]+$/)
        .required(),
      longitud: joi
        .string()
        .regex(/^[0-9]+$/)
        .required(),
      velocidad_atmosferica_maxima: joi.string().required(),
      tripulacion: joi
        .string()
        .regex(/^[0-9]+$/)
        .required(),
      pasajeros: joi
        .string()
        .regex(/^[0-9]+$/)
        .required(),
      capacidad_de_carga: joi
        .string()
        .regex(/^[0-9]+$/)
        .required(),
      consumibles: joi.string().required(),
      hiperimpulsor_calificacion: joi
        .string()
        .regex(/^\d*\.?\d*$/)
        .required(),
      mglt: joi
        .string()
        .regex(/^[0-9]+$/)
        .required(),
      clase: joi.string().required(),
      pilotos: joi.array().optional(),
      peliculas: joi.array().optional(),
    });
    const validInput = await schema.validateAsync(input, { abortEarly: false });

    return { isValid: true, result: validInput };
  } catch (error) {
    console.error(error);

    return { isValid: false, result: error.message };
  }
};

const createStarship = async (input, domain) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const createdAt = new Date().toISOString();
    const id = v4();

    const newStarship = {
      id,
      fecha_actualizacion: createdAt,
      fecha_de_creacion: createdAt,
      url: `https://${domain}/naves/${id}`,
      ...input,
    };

    await dynamodb
      .put({
        TableName: "Naves",
        Item: newStarship,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 200, result: newStarship }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 409,
      body: JSON.stringify({ status: 409, message: error.message }),
    };
  }
};

const addStarship = async ({ body, headers }) => {
  const { isValid, result } = await validateRequest(body);
  if (!isValid) {
    return {
      statusCode: 400,
      body: JSON.stringify({ status: 400, message: result }),
    };
  }

  const response = await createStarship(result, headers.host);

  return response;
};

module.exports = {
  addStarship: middy(addStarship).use(jsonBodyParser()),
  validateRequest,
  createStarship,
};
