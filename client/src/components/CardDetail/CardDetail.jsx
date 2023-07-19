import { useParams } from "react-router-dom";
import style from "./CardDetail.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPokemonBy } from "../../redux/actions";

const CardDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selPokemon = useSelector((state) => state.onePokemon);
  
  useEffect(() => {
    dispatch(getPokemonBy(id));
  }, [id]);
  
  if(selPokemon.id === id || selPokemon.id === +id){
  return (
    <div className={style.container}>

      <div>
        <img src={selPokemon.image?selPokemon.image:`Loading...` } alt={selPokemon.name} />
      </div>
      <div className={style.data}>
        <h2>
          {selPokemon.name
            ? selPokemon.name.charAt(0).toUpperCase() + selPokemon.name.slice(1)
            : `Loading...`}
        </h2>
        <h3>Id: {selPokemon.id}</h3>
        <h3>HP: {selPokemon.hp}</h3>
        <h3>Attack: {selPokemon.attack}</h3>
        <h3>Defense: {selPokemon.defense}</h3>
        <h3>Speed: {selPokemon.speed}</h3>
        <h3>Height: {selPokemon.height}</h3>
        <h3>Weight: {selPokemon.weight}</h3>
        <h3>
          {selPokemon.types
            ? selPokemon.types.length === 2
              ? `Types: ${selPokemon.types[0]}, ${selPokemon.types[1]}`
              : `Type: ${selPokemon.types[0]}`
            : `Loading...`}
        </h3>
      </div>
    </div>
  )}else{
    return(
        <h2 className={style.loading}>Loading...</h2>
    )
  }
};

export default CardDetail;
