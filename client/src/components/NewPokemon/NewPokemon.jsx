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
    const name = event.target.name;
    
    let newTypes = [];
    newTypes[index] = parseInt(value);

    if (index === 0 && newPokeData.typeId[1] !== undefined) {
      newTypes[1] = newPokeData.typeId[1];
    }

    if (index === 1 && newPokeData.typeId[0] !== undefined) {
      newTypes[0] = newPokeData.typeId[0]
    }

    setNewPokeData({ ...newPokeData, typeId: newTypes });
  };


  
  const clearData =()=> {
    document.querySelector("#addPokemon").reset();
    setNewPokeData({name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    typeId: [],
    image: "",})
    setSelectedTypes([]);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    
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
        clearData();  
        setSuccessMessage("Your Pokemon has been added successfully!");
      } catch (error) {
        window.alert(error);
      }
    }
  };

  return (
    <div className={style.container}>
      <h1>Create your own Pokemon here</h1>
      {successMessage && (
        <div className={style.successMessage}>{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} id="addPokemon" name="addPokemon">
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
            <option value="" >
              Choose one
            </option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {newType ? (
            <select
              name={`type1`}
              onChange={(event) => handleTypeChange(event, 1)}
            >
              <option value="">
                Choose one
              </option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
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
