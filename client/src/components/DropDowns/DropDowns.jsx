import {
  setCurrentPage,
  filterByType,
  filterByOrigin,
  order,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import style from "./DropDowns.module.css";

const DropDowns = () => {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const handleTypeChange = (event) => {
    dispatch(filterByType(event.target.value));
    dispatch(setCurrentPage(1));
  };

  const handleOriginChange = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };
  const handleOrderChange = (event) => {
    dispatch(order(event.target.value));
    dispatch(setCurrentPage(1));
  };
  return (
    <div className={style.dropdowns}>
      <div className={style.filterOrigin}>
        <label>Display: </label>

        <select name="origin" onChange={(event) => handleOriginChange(event)}>
          <option value="">Choose one</option>
          <option value="ALL">All</option>
          <option value="API">API</option>
          <option value="DB">DB</option>
        </select>
      </div>
      <div className={style.filterType}>
        <label>Filter by type: </label>
        <select name="types" onChange={(event) => handleTypeChange(event)}>
          <option value="">Choose one</option>
          {types.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className={style.orders}>
        <label>Order by: </label>
        <select name="nombre" onChange={(event) => handleOrderChange(event)}>
          <option value="">Choose one</option>
          <option value="asc">A - Z</option>
          <option value="dsc">Z - A</option>
          <option value="attack-asc">Attack ↑</option>
          <option value="attack-dsc">Attack ↓</option>
        </select>
      </div>
    </div>
  );
};

export default DropDowns;
