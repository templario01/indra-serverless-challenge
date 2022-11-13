const AWS = require("aws-sdk");
const { getData, SWAPI_URL } = require("../../shared/utils/utils.js");

const getSpecieFromSwapi = async (id) => {
  const { data } = await getData(`${SWAPI_URL}/species/${id}`);
  const specie = {
    nombre: data.name,
    clasificacion: data.classification,
    designacion: data.designation,
    altura: data.average_height,
    color_de_piel: data.skin_colors,
    color_de_cabello: data.hair_colors,
    color_de_ojos: data.eye_colors,
    esperanza_de_vida: data.average_lifespan,
    lugar_nacimiento: data.homeworld,
    lenguaje: data.languaje,
    personas: data.people,
    peliculas: data.films,
    fecha_actualizacion: data.edited,
    fecha_de_creacion: data.created,
    url: data.url,
  };

  return specie;
};

const getSpecieFromDatabase = async (id) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb
    .get({
      TableName: "Especies",
      Key: {
        id,
      },
    })
    .promise();
  const specie = result.Item;

  return specie;
};

const getSpecie = async (event) => {
  try {
    let specie;
    const { id } = event.pathParameters;
    const idIsNumber = !!Number(id);

    if (idIsNumber) {
      specie = await getSpecieFromSwapi(id);
    } else {
      specie = await getSpecieFromDatabase(id);
    }

    if (specie) {
      return {
        statusCode: 200,
        body: JSON.stringify({ status: 200, result: specie }),
      };
    }
    return {
      statusCode: 404,
      body: JSON.stringify({ status: 404, message: "Especie no encontrada" }),
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
  getSpecie,
  getSpecieFromSwapi,
  getSpecieFromDatabase,
};
