const { Pokemon } = require("../db");

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
      speed: speed ? speed : null,
      height: height ? height : null,
      weight: weight ? weight : null,
    });

    if (typeId.length === 2) {
      await newPokemon.addType(typeId[0]);
      await newPokemon.addType(typeId[1]);
    } else {
      console.log(typeId);
      await newPokemon.addType(typeId[0]);
    }

    const types = await newPokemon.getTypes();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postPokemon };
