import axios from "axios";

const BACK_URL = "http://localhost:3001";

export function getPokemons() {
    return async function (dispatch) {
        try {
            const json = await axios.get(`${BACK_URL}/pokemons`);
            return dispatch({
                type: "GET_POKEMONS",
                payload: json.data,
            });
        } catch (e) {
            console.log(e)
        }
    }
}

export function getTypes(){
    return async function (dispatch) {
        try {
            const json = await axios.get(`${BACK_URL}/types`);
            return dispatch({
                type: "GET_TYPES",
                payload: json.data,
            });
        } catch (e) {
            console.log(e)
        }
    }
}

export function postPokemon(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.post(`${BACK_URL}/pokemon/` + payload);
            return dispatch({
                type: "POST_POKEMON",
                payload: json.data
            });
        } catch (e) {
            console.log(e)
        }
    }
}

export function getDetail(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`${BACK_URL}/pokemons?name=` + payload);
            return dispatch({
                type: "GET_NAME_POKEMONS",
                payload: json.data,
            });
        } catch (e) {
            alert("No encontramos ese nombre de pokemon");
            console.log(e);
        }
    };
}

export function getNamePokemons(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`${BACK_URL}/pokemons?name=` + payload);
            return dispatch({
                type: "GET_NAME_POKEMONS",
                payload: json.data,
            })
        } catch (error) {
            alert("El pokemon no fue encontrado");
            console.log(error)
        }
    };
}

export function filterByTypes(payload) {
    return {
        type: "FILTER_BY_TYPES",
        payload,
    };
}

export function filterCreated (payload) {
    return {
        type: "FILTER_CREATED",
        payload,
    };
}

export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload,
    };
}

export function orderByAttack(payload) {
    return {
        type: "ORDER_BY_ATTACK",
        payload,
    };
}

export function cleanDetail(){
    return {
        type: "CLEAN_DETAIL",
        payload: {},
    };
}

export function deletePokemon(id) {
    return async function (dispatch) {
        try {
            const json = await axios.delete(`${BACK_URL}/pokemons/delete/` + id);
            return dispatch({
                type: "DELETE_POKEMON",
                pyaload: json.data,
            });
        } catch (e) {
            console.log(e)
        }
    }
}