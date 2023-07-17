const axios = require("axios");
const { Pokemon, Type } = require("../db");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonById = async (req, res) => {
  try {
    const { idPokemon } = req.params;
    if (/^\d+$/.test(idPokemon)) {
      const { data } = await axios(URL + idPokemon);
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
    } else {
      const dbPokemon = await Pokemon.findOne({
        where: {
          id: idPokemon,
        },
        include: [
          {
            model: Type,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });
      const dbPokeTypes = dbPokemon.types.map((type) => type.name);
      const dbPokemonComplete = dbPokemon.get({ plain: true });
      dbPokemonComplete.types = dbPokeTypes;
      return res.status(200).json(dbPokemonComplete);
    }
  } catch (error) {
    res.status(500).send("Pokemon not found");
  }
};

module.exports = { getPokemonById };
