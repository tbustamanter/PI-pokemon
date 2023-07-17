import { useDispatch } from "react-redux";
import style from "./Home.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import Nav from "../Nav/Nav";
import { useEffect } from "react";
import { getPokemons, getTypes } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
    
  }, []);
  return (
    <div className={style.container}>
        
      <SearchBar />
      <Cards  />
    </div>
  );
};

export default Home;
