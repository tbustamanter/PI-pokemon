import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from "./NewPokemon.module.css";
import { getTypes } from "../../redux/actions";
import validations from "./validations";

const NewPokemon = () => {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const [newType, setNewType] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [newPokeData, setNewPokeData] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    typeId: [],
    image: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const property = event.target.name;
    const val = event.target.value;
    setNewPokeData({ ...newPokeData, [property]: val });
    const inputsValidated = validations(newPokeData);
    setErrors(inputsValidated);
    if (
      errors.name === "" &&
      errors.hp === "" &&
      errors.defense === "" &&
      errors.attack === ""
    ) {
      const button = document.querySelector("#submit");
      //console.log(button);
      button.disabled = false;
    }
  };

  useEffect(() => {
    if (types.length === 0) {
      dispatch(getTypes());
    }
  }, []);

  const addType = () => {
    if (!newType) setNewType(true);
    else setNewType(false);
  };

  const handleTypeChange = (event, index) => {
    const value = event.target.value;
    setSelectedTypes((prevTypes) => {
      const newTypes = [...prevTypes];
      newTypes[index] = value;
      return newTypes;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const typeId = await selectedTypes.map((typeName) => {
      const type = types.filter((typeBD) => typeBD.name === typeName);
      return type[0].id;
    });

    setNewPokeData({ ...newPokeData, typeId: typeId });

    if (
      errors.name === "" &&
      errors.hp === "" &&
      errors.defense === "" &&
      errors.attack === ""
    ) {
      try {
        const response = await fetch("http://localhost:3001/pokemons/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPokeData),
        });

        if (!response.ok) {
          throw new Error("Error al enviar los datos");
        }

        const data = await response.json();
        event.target.reset();
        setSuccessMessage("Your Pokemon has been added successfully!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={style.container}>
      <h1>Create your own Pokemon here</h1>
      {successMessage && (
        <div className={style.successMessage}>{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} name="addPokemon">
        <div className={style.name}>
          <label>* Name: </label>
          <input type="text" name="name" onChange={handleChange}></input>
          {errors.name && <label className={style.errors}>{errors.name}</label>}
        </div>
        <div className={style.hp}>
          <label>* HP: </label>
          <input onChange={handleChange} type="text" name="hp"></input>
          <label className={style.errors}>{errors.hp}</label>
        </div>
        <div className={style.attack}>
          <label>* Attack: </label>
          <input onChange={handleChange} type="text" name="attack"></input>
          <label className={style.errors}>{errors.attack}</label>
        </div>
        <div className={style.defense}>
          <label>* Defense: </label>
          <input onChange={handleChange} type="text" name="defense"></input>
          <label className={style.errors}>{errors.defense}</label>
        </div>
        <div className={style.speed}>
          <label>Speed: </label>
          <input onChange={handleChange} type="text" name="speed"></input>
        </div>
        <div className={style.height}>
          <label>Height: </label>
          <input onChange={handleChange} type="text" name="height"></input>
        </div>
        <div className={style.weight}>
          <label>Weight: </label>
          <input onChange={handleChange} type="text" name="weight"></input>
        </div>
        <div className={style.types}>
          <label>Type: </label>
          <select
            name={`type0`}
            onChange={(event) => handleTypeChange(event, 0)}
          >
            <option value="" disabled="disabled" selected>
              Choose one
            </option>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          {newType ? (
            <select
              name={`type1`}
              onChange={(event) => handleTypeChange(event, 1)}
            >
              <option value="" disabled="disabled" selected>
                Choose one
              </option>
              {types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          ) : null}
          <label onClick={addType}>
            {!newType ? "Add Type" : "Remove Type"}
          </label>
        </div>

        <div className={style.img}>
          <label>Image URL: </label>
          <input onChange={handleChange} type="text" name="image"></input>
        </div>

        <button type="submit" disabled={true} id="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewPokemon;
