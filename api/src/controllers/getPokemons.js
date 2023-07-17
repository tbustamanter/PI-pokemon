const axios = require("axios");
const { Pokemon, Type } = require('../db');

const URL = "https://pokeapi.co/api/v2/pokemon?limit=100";

const getPokemons = async (req, res) => {
  try {
    const { data } = await axios(URL);
    
    let apiPokemons = data.results.map(async pokemon=>{
        const pokemonURL = await axios(pokemon.url);
        
        return {
            id: pokemonURL.data.id,
            name: pokemonURL.data.name,
            image: pokemonURL.data.sprites.other.dream_world.front_default,
            hp: pokemonURL.data.stats[0].base_stat,
            attack: pokemonURL.data.stats[1].base_stat,
            defense: pokemonURL.data.stats[2].base_stat,
            speed: pokemonURL.data.stats[5].base_stat,
            height: pokemonURL.data.height,
            weight: pokemonURL.data.weight,
            types: pokemonURL.data.types.map(type=>type.type.name)
        
        }
        
    });
    apiPokemons = await Promise.all(apiPokemons);
    let dbPokemons = await Pokemon.findAll({
      include: [
        {
          model: Type,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });

    dbPokemons = dbPokemons.map((pokemon) => ({
      ...pokemon.toJSON(),
      types: pokemon.types.map((type) => type.name),
    }));

    //console.log(dbPokemons);
    return res.status(200).json(apiPokemons.concat(dbPokemons));

  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {getPokemons};