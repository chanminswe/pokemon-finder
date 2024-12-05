import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);

  function searchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLocaleLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokemon Not Found");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPokemonData(data);
      })
      .catch((error) => {
        console.error(error);
      });
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
      <section className="information-section">
        <figure>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </figure>
      </section>
    </div>
  );
};

export default App;
