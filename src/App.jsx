import React, { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [pokemon, setPokemon] = useState("");
  const [pokeapi, setPokeapi] = useState();
  const [pokemonStats, setPokemonStats] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [pokemonMoves, setPokemonMoves] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        setPokemonMoves(data.moves);
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
      {pokeapi && (
        <section className="image-section">
          {windowSize.width <= 700 && (
            <img
              className="pokemon-image"
              src={pokeapi.sprites.front_default}
              alt={pokeapi.name}
            />
          )}
          {windowSize.width > 700 && (
            <>
              {" "}
              <img
                className="pokemon-image"
                src={pokeapi.sprites.front_default}
                alt={pokeapi.name}
              />
              <img
                className="pokemon-image"
                src={pokeapi.sprites.back_default}
                alt={pokeapi.name}
              />
              <img
                className="pokemon-image"
                src={pokeapi.sprites.front_shiny}
                alt={pokeapi.name}
              />
              <img
                className="pokemon-image"
                src={pokeapi.sprites.back_shiny}
                alt={pokeapi.name}
              />
            </>
          )}

          {pokeapi.types.length === 1 ? (
            <section className="type-section">
              <div className="type-style">{pokeapi.types[0].type.name}</div>
            </section>
          ) : (
            <section className="type-section">
              <div className="type-style">{pokeapi.types[0].type.name}</div>
              <div className="type-style">{pokeapi.types[1].type.name}</div>
            </section>
          )}
        </section>
      )}
      {pokemonStats.length > 0 && (
        <section className="stats-section">
          {pokemonStats.map((stats, index) => (
            <>
              <div className="stats-container" key={index}>
                <div key={index} className="stats-name-container">
                  <p className="stat-name">{stats.stat.name}</p>
                  <p className="base-stat">{stats.base_stat}</p>
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
