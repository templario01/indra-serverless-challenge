const { faker } = require("@faker-js/faker");

const swapiSpecie = {
  name: "Mon Calamari",
  classification: "amphibian",
  designation: "sentient",
  average_height: "160",
  skin_colors: "red, blue, brown, magenta",
  hair_colors: "none",
  eye_colors: "yellow",
  average_lifespan: "unknown",
  homeworld: "https://swapi.py4e.com/api/planets/31/",
  language: "Mon Calamarian",
  people: ["https://swapi.py4e.com/api/people/27/"],
  films: ["https://swapi.py4e.com/api/films/3/"],
  created: "2014-12-18T11:09:52.263000Z",
  edited: "2014-12-20T21:36:42.153000Z",
  url: "https://swapi.py4e.com/api/species/8/",
};

const specie = {
  nombre: faker.datatype.string(10),
  clasificacion: faker.datatype.string(10),
  designacion: faker.datatype.string(10),
  altura: faker.datatype.number({ max: 200 }).toString(),
  color_de_piel: faker.datatype.string(10),
  color_de_cabello: faker.datatype.string(10),
  color_de_ojos: faker.datatype.string(10),
  esperanza_de_vida: faker.datatype.string(10),
  lugar_nacimiento: faker.datatype.string(10),
  lenguaje: faker.datatype.string(10),
};

const specieResponse = {
  nombre: faker.datatype.string(10),
  clasificacion: faker.datatype.string(10),
  designacion: faker.datatype.string(10),
  altura: faker.datatype.number({ max: 200 }).toString(),
  color_de_piel: faker.datatype.string(10),
  color_de_cabello: faker.datatype.string(10),
  color_de_ojos: faker.datatype.string(10),
  esperanza_de_vida: faker.datatype.string(10),
  lugar_nacimiento: faker.datatype.string(10),
  lenguaje: faker.datatype.string(10),
  id: faker.random.alphaNumeric(15),
  fecha_actualizacion: faker.datatype.datetime().toISOString(),
  fecha_de_creacion: faker.datatype.datetime().toISOString(),
};

const allSpeciesResponse = [
  {
    nombre: faker.datatype.string(10),
    clasificacion: faker.datatype.string(10),
    designacion: faker.datatype.string(10),
    altura: faker.datatype.number({ max: 200 }).toString(),
    color_de_piel: faker.datatype.string(10),
    color_de_cabello: faker.datatype.string(10),
    color_de_ojos: faker.datatype.string(10),
    esperanza_de_vida: faker.datatype.string(10),
    lugar_nacimiento: faker.datatype.string(10),
    lenguaje: faker.datatype.string(10),
    id: faker.random.alphaNumeric(15),
    fecha_actualizacion: faker.datatype.datetime().toISOString(),
    fecha_de_creacion: faker.datatype.datetime().toISOString(),
  },
  {
    nombre: faker.datatype.string(10),
    clasificacion: faker.datatype.string(10),
    designacion: faker.datatype.string(10),
    altura: faker.datatype.number({ max: 200 }).toString(),
    color_de_piel: faker.datatype.string(10),
    color_de_cabello: faker.datatype.string(10),
    color_de_ojos: faker.datatype.string(10),
    esperanza_de_vida: faker.datatype.string(10),
    lugar_nacimiento: faker.datatype.string(10),
    lenguaje: faker.datatype.string(10),
    id: faker.random.alphaNumeric(15),
    fecha_actualizacion: faker.datatype.datetime().toISOString(),
    fecha_de_creacion: faker.datatype.datetime().toISOString(),
  },
];

const specieBadBody = {
  nombre: "",
  clasificacion: faker.datatype.string(10),
  designacion: faker.datatype.string(10),
  altura: faker.datatype.number({ max: 200 }).toString(),
  color_de_piel: faker.datatype.string(10),
  color_de_cabello: faker.datatype.string(10),
  color_de_ojos: faker.datatype.string(10),
  esperanza_de_vida: faker.datatype.string(10),
  lugar_nacimiento: faker.datatype.string(10),
  lenguaje: faker.datatype.string(10),
};

const specieIncompleteBody = {
  esperanza_de_vida: faker.datatype.string(10),
  lugar_nacimiento: faker.datatype.string(10),
  lenguaje: faker.datatype.string(10),
};

module.exports = {
  specie,
  specieBadBody,
  specieIncompleteBody,
  allSpeciesResponse,
  specieResponse,
  swapiSpecie,
};
