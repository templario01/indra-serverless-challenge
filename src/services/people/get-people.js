const AWS = require("aws-sdk");
const SWAPI_PEOPLE_URL = "https://swapi.py4e.com/api/people";
const { getData } = require("../../shared/utils/utils.js");

const getPeopleFromSwapi = async (id) => {
  const { data } = await getData(`${SWAPI_PEOPLE_URL}/${id}`);
  const people = {
    nombre: data.name,
    altura: data.height,
    masa: data.mass,
    color_cabello: data.hair_color,
    color_piel: data.skin_color,
    color_ojos: data.eye_color,
    nacimiento: data.birth_year,
    genero: data.gender === "male" ? "masculino" : "femenino",
    lugar_nacimiento: data.homeworld,
    peliculas: data.films,
    especies: data.species,
    vehiculos: data.vehicles,
    naves: data.starships,
    fecha_actualizacion: data.edited,
    fecha_de_creacion: data.created,
    url: data.url,
  };

  return people;
};

const getPeopleFromDatabase = async (id) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb
    .get({
      TableName: "Personas",
      Key: {
        id,
      },
    })
    .promise();
  const people = result.Item;

  return people;
};

const getPeople = async (event) => {
  try {
    const { id } = event.pathParameters;
    const isNumber = !!Number(id);

    if (isNumber) {
      const swapiPeople = await getPeopleFromSwapi(id);

      return {
        statusCode: 200,
        body: JSON.stringify({ status: 200, people: swapiPeople }),
      };
    }
    const dbPeople = await getPeopleFromDatabase(id);

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 200, people: dbPeople }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 409,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports = {
  getPeople,
  getPeopleFromSwapi,
  getPeopleFromDatabase,
};
