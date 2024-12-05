import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [pokemon, setPokemon] = useState("");

  function searchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => console.log(response))
    .catch(error => console.error(error));
  }

  return (
    <div className="pokemon-main-container">
      <header className="search-pokemon-container">
        <input
          onChange={(event) => setPokemon(event.target.value)}
          className="search-input"
        />
        <FontAwesomeIcon
          onClick={searchPokemon}
          className="search-icon"
          icon={faMagnifyingGlass}
        />
      </header>
    </div>
  );
};

export default App;
