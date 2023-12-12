import React from "react";
import { NavLink } from "react-router-dom";
const Data = () => {
  return (
    <div className="home__data extra">
      <h1 className="home__title">Medocs </h1>
      <p className="home__description">
        One Stop Solution for all your document needs
      </p>
      <NavLink to="/register">
        <button className="button">Get Started</button>
      </NavLink>
    </div>
  );
};

export default Data;
