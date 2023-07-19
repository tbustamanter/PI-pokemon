import style from "./Cards.module.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import DropDowns from "../DropDowns/DropDowns";
import Pagination from "../Pagination/Pagination";

const Cards = () => {
  const allPokemons = useSelector(state => state.allPokemons);
  const currentPage = useSelector(state => state.currentPage);
  const itemsPerPage = useSelector(state => state.itemsPerPage);
  const filteredPokemons = useSelector(state => state.filteredPokemons);

  console.log(filteredPokemons);
  let pokemonsToShow = [];
  filteredPokemons.length > 0
    ? (pokemonsToShow = filteredPokemons)
    : (pokemonsToShow = allPokemons);
  const paginationSize = Math.ceil(pokemonsToShow.length / 12);
  if (pokemonsToShow.length > 0) {
    return (
      <div className={style.container}>
        <DropDowns />
        <Pagination paginationSize={paginationSize}/>
        
        <div className={style.cards}>
          {pokemonsToShow.map(({ id, name, image, types }, itemIndex) => {
            const lastIndex = itemsPerPage * currentPage - 1;
            const firstIndex = lastIndex - 11;

            if (itemIndex >= firstIndex && itemIndex <= lastIndex) {
              return (
                <Card
                  key={id}
                  id={id}
                  name={name}
                  image={image}
                  types={types}
                />
              );
            }
          })}
        </div>
        <Pagination paginationSize={paginationSize}/>
      </div>
    );
  } else {
    return (
      <div className={style.loading}>
        <h2>Loading...</h2>
      </div>
    );
  }
};

export default Cards;
