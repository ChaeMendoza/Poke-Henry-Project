const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Types } = require("../db");
const db = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//probando
const apiInfo = async () => {
  let arrPokemons = []; //me traigo un array de objetos que tienen la url de cada pokemon
  let arrDataPoke = [];
  let urlApi = `https://pokeapi.co/api/v2/pokemon`;
  try {
    for (let i = 0; i < 2; i++) {
      const urlData = await axios.get(urlApi);
      urlData.data.results.map((e) => {
        arrPokemons.push({
          url: e.url,
        });
      });
      urlApi = urlData.data.next;
    }
    const arrData = arrPokemons.map(async (el) => await axios.get(el.url)); //las promesas me quedan pendientes
    //console.log(arrData);
    return await Promise.all(arrData).then((e) => {
      const pokes = e.map((e) => e.data);
      pokes.map((p) => {
        arrDataPoke.push({
          id: p.id,
          name: p.name,
          hp: p.stats[0].base_stat,
          attack: p.stats[1].base_stat,
          defense: p.stats[2].base_stat,
          speed: p.stats[5].base_stat,
          height: p.height,
          weight: p.weight,
          image: p.sprites.other.home.front_default,
          types:
            p.types.length < 2
              ? [p.types[0].type.name]
              : [p.types[0].type.name, p.types[1].type.name],
        });
      });
      return arrDataPoke;
    });
  } catch (error) {
    console.log(error);
  }
};

const dbInfo = async () => {
  const arrInfo = await Pokemon.findAll({
    include: {
      model: Types,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return arrInfo.map((d) => {
    return {
      id: d.id,
      name: d.name,
      hp: d.hp,
      attack: d.attack,
      defense: d.defense,
      speed: d.speed,
      height: d.height,
      weight: d.weight,
      image: d.image,
      types: d.types.map((el) => el.name),
      createdInDb: d.createdInDb,
    };
  });
};
const allPokemons = async () => {
  const apiPokes = await apiInfo();
  const dbPokes = await dbInfo();
  return apiPokes.concat(dbPokes);
};

const nameApi = async (name) => {
  try {
    const urlApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

    let urlData = await urlApi.data;
    urlData = [
      {
        id: urlData.id,
        name: urlData.name,
        types:
          urlData.types.length < 2
            ? [urlData.types[0].type.name]
            : [urlData.types[0].type.name, urlData.types[1].type.name],
        image: urlData.sprites.other.home.front_default,
        hp: urlData.stats[0].base_stat,
        attack: urlData.stats[1].base_stat,
        defense: urlData.stats[2].base_stat,
        speed: urlData.stats[5].base_stat,
        height: urlData.height,
        weight: urlData.weight,
      },
    ];
    return urlData;
  } catch (error) {
    console.log(error);
  }
};

const nameDb = async (name) => {
  try {
    const nombreDb = await Pokemon.findAll({
      where: {
        name: name,
      },
      include: {
        model: Types,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return nombreDb.map((p) => {
      return {
        id: p.id,
        name: p.name,
        types: p.types.map((e) => e.name),
        image: p.image,
        hp: p.hp,
        attack: p.attack,
        defense: p.defense,
        speed: p.speed,
        height: p.height,
        weight: p.weight,
        createdInDb: p.createdInDb,
      };
    });
  } catch (error) {
    console.log(error);
  }
};

router.get("/pokemons", async (req, res) => {
  const { name } = req.query;
  try {
    const infoTotal = await allPokemons();
    if (name) {
      const apiName = await nameApi(name);
      if (!apiName) {
        const dbName = await nameDb(name);
        if (!dbName) {
          res.status(404).send("This pokemon does not exist");
        } else {
          return res.send(dbName);
        }
      } else {
        return res.send(apiName);
      }
    }
    return res.status(200).send(infoTotal);
  } catch (error) {
    console.log(error);
  }
});
//ASYNC AWAIT
// const idApi = async (id) => {
//   try {
//     const apiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
//     const apiData = await apiId.data;
//     const detail = {
//       id: apiData.id,
//       name: apiData.name,
//       types:
//         apiData.types.length < 2
//           ? [apiData.types[0].type.name]
//           : [apiData.types[0].type.name, apiData.types[1].type.name],
//       image: apiData.sprites.other.home.front_default,
//       hp: apiData.stats[0].base_stat,
//       attack: apiData.stats[1].base_stat,
//       defense: apiData.stats[2].base_stat,
//       speed: apiData.stats[5].base_stat,
//       height: apiData.height,
//       weight: apiData.weight,
//     };
//     //console.log(detail);
//     return detail;
//   } catch (error) {
//     console.log(error);
//   }
// };

//PROMESAS
const getApiId = (id) => {
  try {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
      let info = res.data;
      return {
        id: info.id,
        name: info.name,
        types:
          info.types.length < 2
            ? [info.types[0].type.name]
            : [info.types[0].type.name, info.types[1].type.name],
        image: info.sprites.other.home.front_default,
        hp: info.stats[0].base_stat,
        attack: info.stats[1].base_stat,
        defense: info.stats[2].base_stat,
        speed: info.stats[5].base_stat,
        height: info.height,
        weight: info.weight,
      };
    });
  } catch (error) {
    console.log(error);
  }
};

const idDb = async (id) => {
  try {
    const dbPoke = await Pokemon.findByPk(id, { include: Types });
    return {
      id: dbPoke.id,
      name: dbPoke.name,
      types: dbPoke.types.map((e) => e.name),
      image: dbPoke.image,
      hp: dbPoke.hp,
      attack: dbPoke.attack,
      defense: dbPoke.defense,
      speed: dbPoke.speed,
      height: dbPoke.height,
      weight: dbPoke.weight,
      createdInDb: dbPoke.createdInDb,
    };
  } catch (error) {
    console.log(error);
  }
};

const allId = async (id) => {
  const uuid = id.includes("-");
  if (uuid) {
    return await idDb(id);
  } else {
    return await getApiId(id);
  }
};

router.get("/pokemons/:id", async (req, res) => {
  const { id } = req.params;
  const detailApi = await allId(id);
  detailApi ? res.send(detailApi) : res.send("This pokemon was not found");
});

router.post("/pokemon", async (req, res) => {
  const {
    name,
    types,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    createdInDb,
  } = req.body;
  const crearPoke = await Pokemon.create({
    name,
    image:
      image || "https://pokemon-project.com/espadaescudo/img/pokemon/132.png",
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    createdInDb,
  });
  let dbTypes = await Types.findAll({
    where: {
      name: types,
    },
  });
  crearPoke.addTypes(dbTypes);
  res.send("Successfully created Pokemon");
});

const allTypes = async () => {
  try {
    const typesDb = await Types.findAll();
    console.log(typesDb)
    if (!typesDb.length) {
      const typesApi = await axios.get(`https://pokeapi.co/api/v2/type`);
      const dataTypes = await typesApi.data.results.map((e) => e.name);
      dataTypes.map(
        async (e) =>
          await Types.findOrCreate({
            where: {
              name: e,
            },
          })
      );
      return dataTypes
    } else {
      return typesDb.map((e) => e.name);
    }
  } catch (error) {
    console.log(error);
  }
};

router.get("/types", async (req, res) => {
  const typesAll = await allTypes();
  res.send(typesAll);
});

router.delete("/pokemons/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Pokemon.destroy({
      where: { id: id },
    });

    return res.send("Pokemon eliminado exitosamente");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;