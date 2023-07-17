import { FILTER_BY_TYPE, GET_POKEMONS, GET_POKEMON_BY, GET_TYPES, SET_CURRENT_PAGE, FILTER_BY_NAME, FILTER_BY_ORIGIN, ORDER_BY } from "./actions";

const initialState = {
    allPokemons: [],
    onePokemon: {},
    currentPage: 1,
    itemsPerPage: 12,
    types: [],
    filteredPokemons: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    const pokemonsCopy = state.filteredPokemons.length>0?state.filteredPokemons:state.allPokemons;
    switch (action.type) {
      case GET_POKEMONS: {
        return {
            ...state,
            allPokemons: action.payload,
        }
      }
      case GET_POKEMON_BY:{
        return{
            ...state,
            onePokemon: action.payload,
        }
      }
      case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
      case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
      case FILTER_BY_TYPE:
        const selectedPokes = state.allPokemons.filter(
          (pokemon) => pokemon.types.includes(action.payload)
        );
        if(selectedPokes.length > 0) {
          return {
            ...state,
            filteredPokemons: selectedPokes,
          };
        }else{
          window.alert(`No ${action.payload} type pokemons found`)
        };
      
      case FILTER_BY_NAME:
        const foundPokemon = state.allPokemons.filter(
          (pokemon) => pokemon.name === action.payload
        );
        if(foundPokemon.length === 1){
          return {
            ...state,
            filteredPokemons: foundPokemon
          };
        }else{
          window.alert("Pokemon not found");
        }     
      case FILTER_BY_ORIGIN:
        const filter = pokemonsCopy.filter(pokemon => {
          if(action.payload === "API"){
            return Number.isInteger(pokemon.id);
          }
          if(action.payload === "DB"){
            
            return !Number.isInteger(pokemon.id);
          }
          if(action.payload === "All"){
            return pokemon;
          }
        });
      return {
        ...state,
        filteredPokemons: filter,
      };
      case ORDER_BY: 
      let ordering =[];
      
        switch (action.payload) {
          case "asc":
            ordering = pokemonsCopy.sort((a, b) => {
              return a.name.localeCompare(b.name);
            });
            
            break;
          case "dsc":
            ordering = pokemonsCopy.sort((a, b) => {
              return b.name.localeCompare(a.name);
            });
            
            break;
          case "attack-asc":
            ordering = pokemonsCopy.sort((a, b) => {
              return parseInt(a.attack) - parseInt(b.attack);
            });
            
            break;
          case "attack-dsc":
            ordering = pokemonsCopy.sort((a, b) => {
              return parseInt(b.attack) - parseInt(a.attack);
            });
           
            break;
          default:
            break;

        }
        console.log(ordering);
        return {
          ...state,
          filteredPokemons: [...ordering],
        };
      
        default:
        return { ...state };
    }
  };
  
  export default rootReducer;
  