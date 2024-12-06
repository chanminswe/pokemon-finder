import React, { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [pokemon, setPokemon] = useState("");
  const [pokeapi, setPokeapi] = useState();
  const [pokemonStats, setPokemonStats] = useState([]);

  async function searchPokemon() {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokemon Not Found");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPokeapi(data);
        setPokemonStats(data.stats);
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
      <>
        {pokeapi && (
          <section className="image-section">
            <img
              className="pokemon-image"
              src={pokeapi.sprites.front_default}
              alt={pokeapi.name}
            />
            {pokeapi.types.length === 1 ? (
              <div>{pokeapi.types[0].type.name}</div>
            ) : (
              <section className="type-section">
                <div className="type-style">{pokeapi.types[0].type.name}</div>
                <div className="type-style">{pokeapi.types[1].type.name}</div>
              </section>
            )}
          </section>
        )}
      </>
      {pokemonStats.length > 0 && (
        <section className="stats-section">
          {pokemonStats.map((stats, index) => (
            <>
              <div className="stats-container" key={index}>
                <div className="stats-name-container">
                  <p>{stats.stat.name}</p>
                  <p>{stats.base_stat}</p>
                </div>
                <progress value={stats.base_stat} max={255}></progress>
              </div>
            </>
          ))}
        </section>
      )}
    </div>
  );
};

export default App;
