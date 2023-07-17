const axios = require("axios");
const { Pokemon } = require("../db");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonByName = async (req, res) => {
  try {
    let { name } = req.query;
    name = name.toLowerCase();
    //Si no se encuentra en la API
    const pokemon = await Pokemon.findOne({ where: { name: name } });
    
    if(pokemon){
        return res.status(200).json(pokemon);
    }
    
    const { data } = await axios.get(URL + name);
    //Si se encuentra en la API
    
    if (data.name === name) {
      const pokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        types: data.types.map((type) => type.type.name),
      };
      return res.status(200).json(pokemon);
    }    

  } catch (error) {
    res.status(500).send('Pokemon not found');
  }
};

module.exports = { getPokemonByName };
