import React from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  return (
    <div className="pokemon-main-container">
      <header className="search-pokemon-container">
        <input className="search-input" />
        <FontAwesomeIcon  className="search-icon"icon={faMagnifyingGlass} />
      </header>
    </div>
  );
};

export default App;
