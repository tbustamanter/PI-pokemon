import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, image, types }) => {
  return (
    <Link to={`/Detail/${id}`}>
      <div className={style.card}>
        <img src={image} alt={name} />
        <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
        <h3>
          {types
            ? types.length === 2
              ? `${types[0]}, ${types[1]}`
              : types[0]
            : "Loading.."}
        </h3>
      </div>
    </Link>
  );
};

export default Card;
