import style from "./Cards.module.css";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentPage,
  filterByType,
  filterByOrigin,
} from "../../redux/actions";

const Cards = () => {
  const { allPokemons, currentPage, itemsPerPage, types, filteredPokemons } =
    useSelector((state) => state);

  const dispatch = useDispatch();

  const handlePageClick = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleTypeChange = (event) => {
    dispatch(filterByType(event.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleOriginChange = (event) => {
    pokemonsToShow = dispatch(filterByOrigin(event.target.value));
  };
  const handleOrderChange = (event) => {
    switch (event.target.value) {
      case "asc":
        pokemonsToShow.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        dispatch(setCurrentPage(1));
        break;
      case "dsc":
        pokemonsToShow.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        dispatch(setCurrentPage(1));
        break;
      case "attack-asc":
        pokemonsToShow.sort((a, b) => {
          return parseInt(a.attack) - parseInt(b.attack);
        });
        dispatch(setCurrentPage(1));
        break;
      case "attack-dsc":
        pokemonsToShow.sort((a, b) => {
          return parseInt(b.attack) - parseInt(a.attack);
        });
        dispatch(setCurrentPage(1));
        break;
      default:
        break;
    }
  };
  let pokemonsToShow = [];
  filteredPokemons.length > 0
    ? (pokemonsToShow = filteredPokemons)
    : (pokemonsToShow = allPokemons);
  const paginationSize = Math.ceil(pokemonsToShow.length / 12);
  if (pokemonsToShow.length > 0) {
    return (
      <div className={style.container}>
        <div className={style.dropdowns}>
          <div className={style.filterType}>
            <label>Filter by type: </label>
            <select name="types" onChange={(event) => handleTypeChange(event)}>
              {types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className={style.filterOrigin}>
            <label>Filter by Origin: </label>
            <select
              name="origin"
              onChange={(event) => handleOriginChange(event)}
            >
              <option value="" disabled="disabled" selected>
                Choose one
              </option>
              <option value="all">All</option>
              <option value="API">API</option>
              <option value="DB">DB</option>
            </select>
          </div>
          <div className={style.orders}>
            <label>Order by: </label>
            <select
              name="nombre"
              onChange={(event) => handleOrderChange(event)}
            >
              <option value="" disabled="disabled" selected>
                Choose one
              </option>
              <option value="asc">A - Z</option>
              <option value="dsc">Z - A</option>
              <option value="attack-asc">Attack ↑</option>
              <option value="attack-dsc">Attack ↓</option>
            </select>
          </div>
        </div>

        <div className={style.pagination}>
          {Array.from({ length: paginationSize }).map((_, index) => (
            <div
              onClick={(event) => handlePageClick(index + 1, event)}
              className={currentPage === index + 1 ? style.actual : ""}
              key={index + 1}
              id={index + 1}
            >
              {index + 1}
            </div>
          ))}
        </div>
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
        <div className={style.pagination}>
          {Array.from({ length: paginationSize }).map((_, index) => (
            <div
              onClick={() => handlePageClick(index + 1)}
              className={currentPage === index + 1 ? style.actual : ""}
              key={index + 1}
              id={index + 1}
            >
              {index + 1}
            </div>
          ))}
        </div>
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
