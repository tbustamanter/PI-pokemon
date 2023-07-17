const { Pokemon, Type, pokemonsTypes } = require("../db");

const postPokemon = async (req, res) => {
  try {
    const { name, image, hp, attack, defense, speed, height, weight, typeId } =
      req.body;
    const newPokemon = await Pokemon.create({
      name: name.toLowerCase(),
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });
   
    if (typeId.length === 2) {
      await newPokemon.addType(typeId[0]);
      await newPokemon.addType(typeId[1]);
    }else{
        await newPokemon.addType(typeId[0]);
    }

    const types = await newPokemon.getTypes();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postPokemon };
