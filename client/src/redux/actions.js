import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY = "GET_POKEMON_BY";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const ORDER_BY = "ORDER_BY";

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("http://localhost:3001/pokemons/");
      return dispatch({
        type: GET_POKEMONS,
        payload: data,
      });
    } catch (error) {
      return error.message;
    }
  };
};

export const getPokemonBy = (param) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/pokemons/${param}`);
      return dispatch({
        type: GET_POKEMON_BY,
        payload: data,
      });
    } catch (error) {
      return error.response.data;
    }
  };
};

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: currentPage,
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/types/`);
      return dispatch({
        type: GET_TYPES,
        payload: data,
      });
    } catch (error) {
      return error.response.data;
    }
  };
};

export const filterByType = (type) => {
  return {
    type: FILTER_BY_TYPE,
    payload: type,
  };
};
export const filterByName = (name) => {
  return {
    type: FILTER_BY_NAME,
    payload: name,
  };
};
export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
};

export const order = (order) => {
  return {
    type: ORDER_BY,
    payload: order,
  };
};
