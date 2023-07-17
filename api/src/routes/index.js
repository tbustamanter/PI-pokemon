const { Router } = require('express');
const { getPokemons } = require('../controllers/getPokemons');
const { getPokemonById } = require('../controllers/getPokemonById');
const { getPokemonByName } = require('../controllers/getPokemonByName');
const { getTypes} = require('../controllers/getTypes');
const { postPokemon} = require('../controllers/postPokemon');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers

router.get("/pokemons/", getPokemons);
router.get("/pokemons/name", getPokemonByName);
router.get("/pokemons/:idPokemon", getPokemonById);
router.get("/types/", getTypes);
router.post("/pokemons", postPokemon);

// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
