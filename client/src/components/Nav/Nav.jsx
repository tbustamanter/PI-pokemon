import { Link } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = () => {
  return (
  <div className={style.container}>
    <Link to="/Home"><div className={style.home}>Home</div></Link>
    <div>
        <img
          className={style.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png"
          alt="Logo"
        />
      </div>
      <Link to="/NewPokemon"><div className={style.newPoke}>+ New Pokemon</div></Link>
  </div>
  )

};

export default Nav;
