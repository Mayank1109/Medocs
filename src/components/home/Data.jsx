import React from "react";
import { NavLink } from "react-router-dom";

const Data = () => {
  return (
    <div className="home__data">
      <h1 className="home__title">Medical Healthcare Solutions </h1>
      <p className="home__description">
        Health is the condition of wisdom and the sign is cheerfullness.
      </p>
      <ul className="price">
        <li>
          <NavLink to="/signup">
            <button className="button change">Get Started</button>
          </NavLink>
        </li>
        <li>
          <button
            className="button dist"
            style={{ color: "var(--higlight-color)" }}
          >
            Join Us
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Data;
