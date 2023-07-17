const axios = require("axios");
const { Type } = require("../db");

const URL = "https://pokeapi.co/api/v2/type/";

const getTypes = async (req, res) => {
  try {
    let dbTypes = await Type.findAll();
    
    if(dbTypes.length === 0) {
        const typesNames = [];
        const { data } = await axios(URL);
        data.results.map(async (type) => {
            typesNames.push({name: type.name});
        });
        await Type.bulkCreate(typesNames);
        dbTypes = await Type.findAll();
    }
        
    return res.status(200).json(dbTypes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getTypes };
