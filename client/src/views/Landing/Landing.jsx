import { Link } from "react-router-dom";
import style from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img className={style.titulo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png"
          alt="Pokemon"
        />
      </div>
      <div className={style.bolaText}>
      <img className={style.bola}
          src="https://i.pinimg.com/originals/f8/33/5a/f8335abfc56c2a665ca700c0c24a68a5.png"
          alt="Pokebola"
        />
        <h1>
        <Link to="/Home">Inicio</Link>
      </h1>
      </div>
      
    </div>
  );
}
