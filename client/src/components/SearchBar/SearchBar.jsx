import style from "./SearchBar.module.css";
import { filterByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const onSearch = () => {
    dispatch(filterByName(search));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };
  return (
    <div className={style.SearchBar}>
      <input name="search" type="text" onChange={handleChange}  onKeyDown={handleKeyDown}></input>
        <img
          alt="Search"
          onClick={onSearch}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/VisualEditor_-_Icon_-_Search-big_-_white.svg/1200px-VisualEditor_-_Icon_-_Search-big_-_white.svg.png"
        />
    </div>
  );
};

export default SearchBar;
