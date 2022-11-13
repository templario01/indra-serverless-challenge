const AWS = require("aws-sdk");
const { getData, SWAPI_URL } = require("../../shared/utils/utils.js");

const getStarshipFromSwapi = async (id) => {
  const { data } = await getData(`${SWAPI_URL}/starships/${id}`);
  const starship = {
    nombre: data.name,
    modelo: data.model,
    manufactura: data.manufacturer,
    costo_en_creditos: data.cost_in_credits,
    longitud: data.length,
    velocidad_atmosferica_maxima: data.max_atmosphering_speed,
    tripulacion: data.crew,
    pasajeros: data.passengers,
    capacidad_de_carga: data.cargo_capacity,
    consumibles: data.consumables,
    hiperimpulsor_calificacion: data.hyperdrive_rating,
    mglt: data.MGLT,
    clase: data.starship_class,
    pilotos: data.pilots,
    peliculas: data.films,
    fecha_actualizacion: data.edited,
    fecha_de_creacion: data.created,
    url: data.url,
  };

  return starship;
};

const getStarshipFromDatabase = async (id) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb
    .get({
      TableName: "Naves",
      Key: {
        id,
      },
    })
    .promise();
  const starship = result.Item;

  return starship;
};

const getStarship = async (event) => {
  try {
    let starship;
    const { id } = event.pathParameters;
    const idIsNumber = !!Number(id);

    if (idIsNumber) {
      starship = await getStarshipFromSwapi(id);
    } else {
      starship = await getStarshipFromDatabase(id);
    }

    if (starship) {
      return {
        statusCode: 200,
        body: JSON.stringify({ status: 200, result: starship }),
      };
    }
    return {
      statusCode: 404,
      body: JSON.stringify({ status: 404, message: "nave no encontrada" }),
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
  getStarship,
  getStarshipFromSwapi,
  getStarshipFromDatabase,
};
