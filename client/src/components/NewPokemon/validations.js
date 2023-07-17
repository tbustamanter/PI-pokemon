const validations = ({ name, hp, attack, defense }) => {
  //console.log(errors);
  const errors = {
    name: "",
  };
  if (name === "") {
    errors.name = "Name cannot be empty";
  } else {
    if (name.length > 26) {
      errors.name = "Name cannot be longer than 25 characters";
    } else {
      errors.name = "";
    }
  }
  
  //hp validations
    if (hp === "") {
      errors.hp = "HP cannot be empty" 
    } else {
      hp = +hp;
      if (isNaN(hp) || hp < 0) {
        errors.hp = "HP must be a positive whole number";
      } else {
        errors.hp = "" ;
      }
    }
    //defense validations
    if (defense === "") {
      errors.defense = "Defense cannot be empty";
    } else {
      defense = +defense;
      if (isNaN(defense) || defense < 0) {
        errors.defense = "Defense must be a positive whole number";
      } else {
        errors.defense = "";
      }
    }
  //   //attack validations
    if (attack === "") {
      errors.attack = "Attack cannot be empty";
    } else {
      attack = +attack;
      if (isNaN(attack) || attack < 0) {
        errors.attack = "Attack must be a positive whole number";
      } else {
        errors.attack= "";
      }
  }
  return errors;
};

export default validations;
