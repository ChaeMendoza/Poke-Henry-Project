const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: [],
    Loading: true,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                Loading: action.loading,
            };

        case "GET_TYPES":
            return {
                ...state,
                types: action.payload,
            };

        case "FILTER_BY_TYPES":
            const allPokemonsTypes = state.allPokemons;
            const typesFilter =
                action.payload === "ALL"
                    ? allPokemonsTypes
                    : allPokemonsTypes.filter((e) => e.types?.includes(action.payload));
            return {
                ...state,
                pokemons: typesFilter,
            };

        case "GET_NAME_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
            };

        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload,
            };

        case "CLEAN_DETAIL":
            return {
                ...state,
                detail: {},
            };

        case "FILTER_CREATED":
            const allPokemonsOrigen = state.allPokemons;
            const createdFilter =
                action.payload === "createInDb"
                    ? allPokemonsOrigen.filter((e) => e.createInDb)
                    : allPokemonsOrigen.filter((e) => !e.createInDb);
            return {
                ...state,
                pokemons: createdFilter,
            };

        case "ORDER_BY_NAME":
            const sortArr =
                action.payload === "All"
                    ? state.allPokemons
                    : action.payload === "asc"
                    ? state.pokemons.sort((a, b) => a.name.localeCompare(b.name))
                    : state.pokemons.sort((a, b) => b.name.localeCompare(a.name));
            return {
                ...state,
                pokemons: sortArr,
            };

        case "ORDER_BY_ATTACK":
            const arrSort =
                action.paylaod === "All"
                    ? state.allPokemons
                    : action.payload === "max"
                    ? state.pokemons.sort((a, b) => a.attack - b.attack)
                    : state.pokemons.sort((a, b) => b.attack - a.attack);
            return  {
                ...state,
                pokemos: arrSort,
            };

        case "DELETE_POKEMON":
            return {
                ...state,
            };

        default:
            return state;
    }
}

export default rootReducer