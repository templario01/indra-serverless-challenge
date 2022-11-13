const { faker } = require("@faker-js/faker");

const swapiPeople = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  homeworld: "https://swapi.py4e.com/api/planets/1/",
  films: [
    "https://swapi.py4e.com/api/films/1/",
    "https://swapi.py4e.com/api/films/2/",
    "https://swapi.py4e.com/api/films/3/",
    "https://swapi.py4e.com/api/films/6/",
    "https://swapi.py4e.com/api/films/7/",
  ],
  species: ["https://swapi.py4e.com/api/species/1/"],
  vehicles: [
    "https://swapi.py4e.com/api/vehicles/14/",
    "https://swapi.py4e.com/api/vehicles/30/",
  ],
  starships: [
    "https://swapi.py4e.com/api/starships/12/",
    "https://swapi.py4e.com/api/starships/22/",
  ],
  created: "2014-12-09T13:50:51.644000Z",
  edited: "2014-12-20T21:17:56.891000Z",
  url: "https://swapi.py4e.com/api/people/1/",
};

const people = {
  nombre: faker.random.alphaNumeric(15),
  altura: faker.datatype.number().toString(),
  masa: faker.datatype.number().toString(),
  color_cabello: faker.random.alphaNumeric(15),
  color_piel: faker.random.alphaNumeric(15),
  color_ojos: faker.random.alphaNumeric(15),
  nacimiento: faker.random.alphaNumeric(15),
  genero: "femenino",
  lugar_nacimiento: faker.internet.domainName(),
};

const peopleResponse = {
  nombre: faker.random.alphaNumeric(15),
  altura: faker.datatype.number().toString(),
  masa: faker.datatype.number().toString(),
  color_cabello: faker.random.alphaNumeric(15),
  color_piel: faker.random.alphaNumeric(15),
  color_ojos: faker.random.alphaNumeric(15),
  nacimiento: faker.random.alphaNumeric(15),
  genero: "femenino",
  lugar_nacimiento: faker.internet.domainName(),
  id: faker.random.alphaNumeric(15),
  fecha_actualizacion: faker.datatype.datetime().toISOString(),
  fecha_de_creacion: faker.datatype.datetime().toISOString(),
};

const allPeopleResponse = [
  {
    nombre: faker.random.alphaNumeric(15),
    altura: faker.datatype.number().toString(),
    masa: faker.datatype.number().toString(),
    color_cabello: faker.random.alphaNumeric(15),
    color_piel: faker.random.alphaNumeric(15),
    color_ojos: faker.random.alphaNumeric(15),
    nacimiento: faker.random.alphaNumeric(15),
    genero: "femenino",
    lugar_nacimiento: faker.internet.domainName(),
    id: faker.random.alphaNumeric(15),
    fecha_actualizacion: faker.datatype.datetime().toISOString(),
    fecha_de_creacion: faker.datatype.datetime().toISOString(),
  },
  {
    nombre: faker.random.alphaNumeric(15),
    altura: faker.datatype.number().toString(),
    masa: faker.datatype.number().toString(),
    color_cabello: faker.random.alphaNumeric(15),
    color_piel: faker.random.alphaNumeric(15),
    color_ojos: faker.random.alphaNumeric(15),
    nacimiento: faker.random.alphaNumeric(15),
    genero: "femenino",
    lugar_nacimiento: faker.internet.domainName(),
    id: faker.random.alphaNumeric(15),
    fecha_actualizacion: faker.datatype.datetime().toISOString(),
    fecha_de_creacion: faker.datatype.datetime().toISOString(),
  },
  {
    nombre: faker.random.alphaNumeric(15),
    altura: faker.datatype.number().toString(),
    masa: faker.datatype.number().toString(),
    color_cabello: faker.random.alphaNumeric(15),
    color_piel: faker.random.alphaNumeric(15),
    color_ojos: faker.random.alphaNumeric(15),
    nacimiento: faker.random.alphaNumeric(15),
    genero: "femenino",
    lugar_nacimiento: faker.internet.domainName(),
    id: faker.random.alphaNumeric(15),
    fecha_actualizacion: faker.datatype.datetime().toISOString(),
    fecha_de_creacion: faker.datatype.datetime().toISOString(),
  },
];

const peopleBadBody = {
  nombre: faker.random.alphaNumeric(15),
  altura: "",
  masa: faker.datatype.number().toString(),
  color_cabello: faker.random.alphaNumeric(15),
  color_piel: faker.random.alphaNumeric(15),
  color_ojos: faker.random.alphaNumeric(15),
  nacimiento: faker.random.alphaNumeric(15),
  genero: "masuclino",
  lugar_nacimiento: faker.internet.domainName(),
};

const peopleIncompleteBody = {
  nombre: faker.random.alphaNumeric(15),
  color_piel: faker.random.alphaNumeric(15),
  color_ojos: faker.random.alphaNumeric(15),
  nacimiento: faker.random.alphaNumeric(15),
  genero: "masculino",
  lugar_nacimiento: faker.internet.domainName(),
};

module.exports = {
  people,
  peopleBadBody,
  peopleIncompleteBody,
  allPeopleResponse,
  peopleResponse,
  swapiPeople,
};
