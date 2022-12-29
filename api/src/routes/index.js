const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Tipos } = require('../db');
const db = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const apiInfo = async () => {
    let arrPokemons = [];
    let arrDataPoke = [];
    let urlApi = `https://pokeapi.co/api/v2/pokemon`;
    try {
        for (let i = 0; i < 2; i++) {
            const urlData = await axios.get(urlApi);
            urlData.data.results.map((e) => {
                arrPokemons.push({
                    url: e.url
                });
            });
            urlApi = urlData.data.next;
        }

        const arrData = arrPokemons.map(async (el) => await axios.get(el.url));
        // console.log(arrData)
        let infoLista = await Promise.all(arrData).then((el) => {
            const pokes = el.map((el) => el.data);
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
                    image: p.srpites.other.home.front_default,
                    types:
                        p.types.length < 2
                            ? [p.types[0].type.name]
                            : [p.types[0].type.name, p.types[1].type.name]
                });
            });
            return arrDataPoke;
        });
        // console.log(infoLista)
        return infoLista;

    } catch (error) {
        console.log("Aquí el error: ", error)
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

    const arrLista = await arrInfo.map((el) => {
        return {
            id: el.id,
            name: el.name,
            hp: el.hp,
            attack: el.attack,
            defense: el.defense,
            speed: el.speed,
            height: el.height,
            weight: el.weight,
            image: el.image,
            types: el.types.map((e) => e.name),
            createInDb: el.createInDb,
        };
    });
    return arrLista
}

const allPokemons = async () => {
    const apiPokes = await apiInfo();
    const dbPokes = await dbInfo();
    const todosPokes = apiPokes.concat(dbPokes);
    return todosPokes;
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
                hp: urlData.stats[1].base_stat,
                attack: urlData.stats[2].base_stat,
                defense: urlData.stats[5].base_stat,
                height: urlData.height,
                weight: urlData.weight,
            },
        ];
        return urlData;
    } catch (error) {
        console.log("Aquí el error: ", error)
    }
};

const nameDb = async (name) => {
    try {
        const nameDb = await Pokemon.findAll({
            where: {
                name: name,
            },
            include: {
                model: Tipos,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });

        const pokemonDb = nameDb.map((p) => {
            return {
                id: p.id,
                name: p.name,
                types: p.types.map(e => e.name),
                image: p.image,
                hp: p.hp,
                attack: p.attack,
                defense: p.defense,
                speed: p.speed,
                height: p.height,
                weight: p.weight,
                createInDb: p.createInDb,
            };
        });
        return pokemonDb;
    } catch (error) {
        console.log(error)
    }
}

/* Routes */
/* GET  */
router.get("/pokemons", async (req, res) => {
    const { name } = req.query;

    try {
        const infoTotal = await allPokemons();

        if (name) {
            const apiName = await nameApi(name);
            if (!apiName) {
                const dbName = await nameDb(name);
                if (!dbName) {
                    res.status(404).send("El pokemon no exste!");
                } else {
                    return res.send(dbName);
                }
            } else {
                return res.send(apiName);
            }
        }
        return res.status(200).send(infoTotal);

    } catch (error) {
        console.log(error)
    }
});

// Promesas
const getApi = (id) => {
    try {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
            let info = res.data;
            const detail = {
                id: info.id,
                name: info.name,
                types:
                    info.types.length < 2
                        ? [info.types[0].type.name]
                        : [info.types[0].type.name, info.types[1].type.name],
                image: info.sprites.other.home.front_default,
                hp: info.stats[1].base_stat,
                defense: info.stats[2].base_stat,
                speed: info.stats[5].base_stat,
                height: info.height,
                weight: info.weight,
            };
            return detail;
        });
    } catch (error) {
        console.log(error)
    }
};

const idDb = async (id) => {
    try {
        const dbPoke = await Pokemon.findByPk(id, { include: Tipos });

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
            createInDb: dbPoke.createInDb,
        }
    } catch (error) {
        console.log(error)
    }
}

const allId = async (id) => {
    const uuid = id.includes("-");

    if (uuid) {
        const pokeDb = await idDb(id);
        return pokeDb
    } else {
        const pokeApi = await getApiId(id);
        return pokeApi;
    }
};

/* Routes */
/* Get by ID */
router.get("/pokemons/:id", async (req, res) => {
    const { id } = req.params;
    const detailApi = await allId(id);
    detailApi ? res.send(detailApi) : res.send("Estos pokemons no fueron encontrados");
});

/* POST */
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
        createInDb,
    } = req.body;

    const createPoke = await Pokemon.create({
        name,
        image:
            image || "https://pokemon-project.com/espadaescudo/img/pokemon/132.png",
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createInDb,
    });

    let dbtypes = await Tipos.FindAll({
        where: {
            name: types,
        },
    });

    createPoke.addTypes(dbtypes);
    res.send("Pokemon creado con éxito!");
});

const allTypes = async () => {
    try {
        const typesDb = await Tipos.findAll({
            attributes: {
                exclude: ["createAt", "ipdateAt"]
            },
        });
        if (!typesDb.length) {
            const typesApi = await axios.get(`https://pokeapi.co/api/v2/type`);
            const dataTypes = await typesApi.data.results.map((e) => e.name);
            dataTypes.map(
                async (e) =>
                    await Tipos.findOrCreate({
                        where: {
                            name: e,
                        },
                    })
            );
            return dataTypes;
        } else {
            return typesDb.map((e) => e.name)
        }
    } catch (error) {
        console.log(error)
    }
};

/* Routes */
/* GET by Tipos */
router.get("/types", async (req, res) => {
    const typesAll = await allTypes();
    res.send(typesAll);
});

/* Delete */
router.delete("/pokemons/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Pokemon.destroy({
            where: { id: id },
        });

        return res.send("Pokemon eliminado exitosamente!");
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;
